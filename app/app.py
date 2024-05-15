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
        
        if validate_files(files) and validate_request(username, email, phone, category, products, region, commune, description):
            idx_product = db.create_product(category, description, commune, username, email, phone)
            idxs_cross = list()
            for product in products:
                idx_veg_fruit = db.get_vegetable_fruit_by_name(product)
                idx_cross = db.create_product_vegetable_fruit(idx_product, idx_veg_fruit)
                idxs_cross.append(idx_cross)
            
            for file in files:
                # generate randon filename
                _filename = hashlib.sha256(
                    secure_filename(file.filename).encode('utf-8')
                ).hexdigest()
                _extension = file.filename.rsplit('.', 1)[1].lower()
                img_filename = f"{_filename}_{str(uuid.uuid4())}.{_extension}"

                # save img as a file
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], img_filename))
                print("File saved successfully")

                # save path_img in db
                db.insert_picture(app.config['UPLOAD_FOLDER'], img_filename, idx_product)
            return redirect(url_for('index'))
        else:
            print("Error en la validación")
            return redirect(url_for('agregar_producto'))
    
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
    print(os.getcwd())
    with open('app/database/products.json', 'r') as querys:
        values = json.load(querys)[key]
    return jsonify(values)


@app.route('/agregar_pedido', methods=['GET'])
def agregar_pedido():
    return render_template('pages/agregar-pedido.html')

@app.route('/ver_pedido', methods=['GET'])
def ver_pedido():
    return render_template('pages/ver-pedido.html')

@app.route('/ver_producto', methods=['GET'])
def ver_producto():
    return render_template('pages/ver-producto.html')

@app.route('/footer', methods=['GET'])
def footer():
    return render_template('includes/footer.html')

@app.route('/navigation', methods=['GET'])
def navigation():
    return render_template('includes/navigation.html')

if __name__ == '__main__':
    app.run(debug=True)


