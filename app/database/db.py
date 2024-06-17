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

def get_region_by_id(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_region_by_id"], (id,))
    results = cursor.fetchone()
    return results

def get_products(id): #id actual
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_products"], (id,))
    products = cursor.fetchall()
    return products

def get_pedidos(id): #id actual
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_pedidos"], (id,))
    pedidos = cursor.fetchall()
    return pedidos

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

def create_pedido(type_product, description, commune_id, productor_name, productor_email, productor_phone):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["insert_pedido"], (type_product, description, commune_id, productor_name, productor_email, productor_phone,))
    conn.commit()
    return cursor.lastrowid

def insert_product_vegetable_fruit(producto_id, tipo_verdura_fruta_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["insert_product_vegatable_fruit"], (producto_id, tipo_verdura_fruta_id,))
    conn.commit()
    return cursor.lastrowid

def insert_pedido_vegetable_fruit(pedido_id, tipo_verdura_fruta_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["insert_pedido_vegatable_fruit"], (pedido_id, tipo_verdura_fruta_id,))
    conn.commit()
    return cursor.lastrowid

def get_picture_by_product(product_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["fotos_informadas_para_producto"], (product_id,))
    results = cursor.fetchall()
    return results

def get_product_vegetable_fruit_by_product(product_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["tipos_verdura_fruta_asociados_a_producto"], (product_id,))
    results = cursor.fetchall()
    return results

def get_pedido_vegetable_fruit_by_pedido(pedido_id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["tipos_verdura_fruta_asociados_a_pedido"], (pedido_id,))
    results = cursor.fetchall()
    return results

def get_commune_by_id(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_commune_by_id"], (id,))
    results = cursor.fetchone()
    return results

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

def get_stats_pedidos_by_commune():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_stats_pedidos_by_commune"])
    results = cursor.fetchall()
    return results

def get_stats_total_frutas_verduras():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_stats_total_frutas_verduras"])
    results = cursor.fetchall()
    return results

if __name__ == "__main__":
    print(get_regions())