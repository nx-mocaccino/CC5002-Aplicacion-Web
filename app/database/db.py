import pymysql
import json

DB_NAME = "tarea2"
DB_USERNAME = "root"
DB_PASSWORD = "programacionweb"
DB_PORT = 3306
DB_CHARSET = "utf8"
DB_HOST = "localhost"

with open('app/database/queries.json', 'r') as querys:
	QUERY_DICT = json.load(querys)['queries']

def get_conn():
    conn = pymysql.connect(
        db=DB_NAME,
        user=DB_USERNAME,
        passwd=DB_PASSWORD,
        port=DB_PORT,
        host=DB_HOST,
        charset=DB_CHARSET)
    return conn

def get_regions():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_regions"])
	results = cursor.fetchall()
	return results

def get_communes(region_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_communes_by_id"], (region_id,))
    results = cursor.fetchall()
    return results

def create_product(type_product, description, commune_id, productor_name, productor_email, productor_phone):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["insert_product"], (type_product, description, commune_id, productor_name, productor_email, productor_phone,))
    conn.commit()
    return cursor.lastrowid

def create_product_vegetable_fruit(producto_id, tipo_verdura_fruta_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["insert_product_vegatable_fruit"], (producto_id, tipo_verdura_fruta_id,))
    conn.commit()
    return cursor.lastrowid

def get_vegetable_fruit_by_name(name):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_vegetable_fruit_by_name"], (name,))
    results = cursor.fetchone() # fetchone() returns a tuple the first element
    return results[0]

def get_commune_by_name_and_region(commune_name, region_name):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_commune_by_name_and_region"], (commune_name, region_name,))
    results = cursor.fetchone()
    return results

def insert_picture(path, filename,  product_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["insert_picture"], (path, filename, product_id,))
    conn.commit()
    return cursor.lastrowid

if __name__ == "__main__":
    print(get_regions())