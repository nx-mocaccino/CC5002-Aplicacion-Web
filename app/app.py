from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from database import db
import json
import os
from utils.validations import *
import hashlib 
import uuid

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'app/static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024

@app.route('/', methods=['GET'])
def index():
    return render_template('pages/index.html')

@app.route('/agregar_producto', methods=['GET', 'POST'])
def agregar_producto():
    data = list()
    if request.method == 'GET':
        regions = db.get_regions()
        for region in regions:
            data.append({
                "id": region[0],
                "name": region[1]
                })
        return render_template('pages/agregar-producto.html', data=data)
    
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        phone = request.form.get('phone')

        category = request.form.get('categoria-producto')
        products = request.form.getlist('tipo-producto')

        region = request.form.get('region')
        commune = request.form.get('comuna')
        description = request.form.get('user_description')

        files = request.files.getlist('archivo-producto')

        # username, email, phone, category, products, region, commune, description = 'marcos', 'marcos.huenchumil@ug.uchile.cl', '912345678', 'fruta', ['Avellana'], "3", "30102", ''
        validate_message = validate_request(username, email, phone, category, products, region, commune, description, files)

        print(validate_message)
        if validate_message[0]:
            print("[+] Request is valid, saving data in db...")
            idx_product = db.create_product(category, description, commune, username, email, phone) # product: producto
            idxs_cross = list()
            for product in products:
                idx_veg_fruit = db.get_vegetable_fruit_by_name(product)
                idx_cross = db.create_product_vegetable_fruit(idx_product, idx_veg_fruit)  # cross table: producto_verdura_fruta
                idxs_cross.append(idx_cross)
            print("[+] Data saved successfully") 
            for file in files:
                # generate randon filename
                _filename = hashlib.sha256(
                    secure_filename(file.filename).encode('utf-8')
                ).hexdigest()
                _extension = file.filename.rsplit('.', 1)[1].lower()
                img_filename = f"{_filename}_{str(uuid.uuid4())}.{_extension}"

                # save img as a file in server-side
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], img_filename))
                print("[+] File saved successfully")

                # save path_img in db
                db.insert_picture(app.config['UPLOAD_FOLDER'], img_filename, idx_product) # image: fotos
                print("[+] Path saved successfully")
            return redirect(url_for('index'))
        else:
            return render_template('pages/agregar-producto.html', error_message=validate_message[1])
    
@app.route('/fetch_communes/<key>', methods=['GET'])
def fetch_communes(key):
    communes = db.get_communes(key)
    data = list()
    for commune in communes:
        data.append({
            "id": commune[0],
            "name": commune[1]
        })
    return  jsonify(data)

@app.route('/fetch_products/<key>', methods=['GET'])
def fetch_products(key):
    with open('app/database/products.json', 'r') as querys:
        values = json.load(querys)[key]
    return jsonify(values)


@app.route('/agregar_pedido', methods=['GET'])
def agregar_pedido():
    return render_template('pages/agregar-pedido.html')

@app.route('/ver_pedido', methods=['GET'])
def ver_pedido():
    return render_template('pages/ver-pedido.html')

@app.route('/ver_producto/<key>', methods=['GET'])
def ver_producto(key=0):
    key = int(key)
    data = list()
    if request.method == 'GET':
        products = db.get_products(key)
        
        for product in products:
            vegt_fruit = db.get_product_vegetable_fruit_by_product(product[0])
            veg_list = list()
            for val in vegt_fruit:
                veg_list.append(val[0])
            print("veg_list", veg_list)
            fotos = db.get_picture_by_product(product[0])
            fotos_list = list()
            for foto in fotos:
                path = os.path.join(foto[0], foto[1])
                del_root_path = path.split('app')[1]
                print(del_root_path)
                fotos_list.append(del_root_path)
            print("fotos_list", fotos_list)
            commune = db.get_commune_by_id(product[3])[1]
            data.append({
                "id": product[0],
                "tipo": product[1],
                "fruto_verdura": veg_list,
                "descripcion": product[2],
                "comuna_id": product[3],
                "comuna": commune,
                "nombre_productor": product[4],
                "email_productor": product[5],
                "celular_productor": product[6],
                "foto": fotos_list[0]
            })
        return render_template('pages/ver-producto.html', data=data)

        
        return render_template('pages/ver-producto.html', data=data)


    return render_template('pages/ver-producto.html')

@app.route('/footer', methods=['GET'])
def footer():
    return render_template('includes/footer.html')

@app.route('/navigation', methods=['GET'])
def navigation():
    return render_template('includes/navigation.html')

if __name__ == '__main__':
    app.run(debug=True)


