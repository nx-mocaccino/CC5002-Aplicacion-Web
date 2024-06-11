import os 


# recuperar ruta relativa
print(os.path.abspath(__file__))
print(os.path.dirname(os.path.abspath(__file__)))

#ruta relativa ./app/static
print(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app/static'))

