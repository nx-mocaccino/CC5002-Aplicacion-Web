import re
import filetype
from werkzeug.utils import secure_filename
import os 

ALLOWED_EXTENSIONS = {'txt', 'png', 'jpg', 'jpeg', 'gif'}

def validate_username(value):
    return value and len(value)>4

def validate_email(value):
    return re.match(r"[^@]+@[^@]+\.[^@]+", value.strip())

def validate_phone(value):
    return re.match(r"\d{9}", value.strip())

def validate_file(file):
    filename = secure_filename(file.filename)
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_files(files):
    for file in files:
            if not validate_file(file):
                return False
    return True

def validate_request(username, email, phone, category, products, region, commune, description):
    flag = True
    if not validate_username(username):
        flag = False
    if not validate_email(email):
        flag = False
    if not validate_phone(phone):
        flag = False
    return flag