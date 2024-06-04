import re
import json
from werkzeug.utils import secure_filename
import database.db as db

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def is_valid_username(name):
    trimmed_input = name.strip()
    message = ""
    check = 1

    if len(trimmed_input) < 3 or len(trimmed_input) > 80:
        message = "El nombre debe tener entre 3 y 80 caracteres."
        check = 0

    elif not re.match("^[a-zA-Z\s]*$", trimmed_input):
        message = "Solo se debe contener caracteres alfabéticos."
        check = 0
    return {"valid": check, "message": message}
    
def is_valid_phone(phone):
    check = 1
    message = ""
    if not re.match(r"^\d{9}$", phone):
        message = "El teléfono debe tener 9 dígitos."
        check = 0
    return {"valid": check, "message": message}

def is_valid_email(email):
    check = 1
    message = ""
    trimmed_input = email.strip()
    re_pattern = r'^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
    if len(trimmed_input) > 30:
        message = "El email no puede tener más de 30 caracteres."
        check = 0
    if not re.match(re_pattern, email.strip()):
        message = "El email no tiene un formato valido."
        check = 0
    return {"valid": check, "message": message}

def is_valid_phone(phone):
    message = ""
    valid = 1
    trimmed_input = phone.strip().replace(" ", "")
    if len(trimmed_input) == 0:
        valid = 0
        message = "El teléfono no puede estar vacío."
    re_pattern = r'^9\d{8}$'
    if not re.match(re_pattern, trimmed_input):
        valid = 0
        message = "El teléfono debe tener 9 dígitos y comenzar con 9."
    return {"valid": valid, "message": message}

def is_valid_type_product(category):
    trimmed_input = category.strip()
    if trimmed_input == "" or trimmed_input not in ["fruta", "verdura"]:
        return {"valid": 0, "message": "Categoría no válida."}
    return {"valid": 1, "message": ""}

def is_valid_product(category, products: list[str]):
    if len(products) > 5:
        return {"valid": 0, "message": "No se pueden agregar más de 5 productos."}

    for product in products:
        trd_input = product.strip()
        with open('app/database/products.json', 'r') as querys:
            values = json.load(querys)[category]
        if trd_input not in values:
            return {"valid": 0, "message": "Producto no válido."}
    return {"valid": 1, "message": ""}

def is_valid_description(description):
    re_pattern = r'^[a-zA-Z0-9\s.,!?]*$'
    if re.match(re_pattern, description.strip()):
        return {"valid": 1, "message": ""}
    return {"valid": 0, "message": "Descripción no válida."}

def is_valid_region(region_id):
    trimmed_input = region_id.strip()
    if not trimmed_input.isdigit():
        return {"valid": 0, "message": "ID region no valido"}

    regions = db.get_regions()
    for region in regions:
        if trimmed_input == str(region[0]):
            return {"valid": 1, "message": ""}
    return {"valid": 0, "message": "ID no existe en la base de datos"}
    
def is_valid_comuna(region, comuna):
    region_value = region.strip()
    comuna_value = comuna.strip()
    if not comuna_value.isdigit():
        return {"valid": 0, "message": "ID comuna no valido"}
    
    communes = db.get_communes(region_value)
    for commune in communes:
        if comuna_value == str(commune[0]):
            return {"valid": 1, "message": ""}
    return {"valid": 0, "message": "ID no existe en la base de datos"}

def is_valid_file(file):
    files = file.files
    if len(files) > 3 or len(files) < 1:
        return {"valid": 0, "message": "Debe subir al menos una imagen y menos de 3."}
    return {"valid": 1, "message": ""}

def is_valid_files(files):
    def validate_file(file):
        filename = secure_filename(file.filename)
        return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    for file in files:
            if not validate_file(file):
                return {'valid': 0, 'message': 'El archivo no es válido.'}
    return {'valid': 1, 'message': ""}

def validate_request(username, email, phone, category, products, region, commune, description, files):
    message = ""

    # print("VALORESD DE ENTRADA",
    #     "username: ", username,
    #       "email: ", email,
    #       "phone: ", phone,
    #       "category: ", category,
    #       "products: ", products,
    #       "region: ", region,
    #       "commune: ", commune,
    #       "description: ", description)
    
    _username = is_valid_username(username)
    _mail = is_valid_email(email)
    _phone = is_valid_phone(phone)
    _category = is_valid_type_product(category)
    _product = is_valid_product(category, products)
    _region = is_valid_region(region)
    _communa = is_valid_comuna(region, commune)
    _description = is_valid_description(description)
    _files = is_valid_files(files)

    if not _username["valid"]:
        message = _username["message"]

    elif not _mail["valid"]:
        message = _mail["message"]

    elif not _phone["valid"]:
        message = _phone["message"]

    elif not _category['valid']:
        message = _category["message"]

    elif not _product["valid"]:
        message = _product["message"]

    elif not _region["valid"]:
        message = _region["message"]

    elif not _communa["valid"]:
        message = _communa["message"]

    elif not _description["valid"]:
        message = _description["message"]

    elif not _files["valid"]:
        message = _files["message"]

    if message != "":
        return [False, message]
    return True, "Valid request"
        
