import db
#n = 0 
# n+=5 + -=5
if __name__ == "__main__":

    result = db.get_products(5)
    for product in result:
        print(product)