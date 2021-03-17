from flask import Flask,request,jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#MySQL Connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'flaskpokemon'

mysql = MySQL(app)

#settings
app.secret_key = 'mysecretkey'

@app.route('/api/pokemon', methods = ['POST','GET'])
def manage_pokemons():
    if request.method == 'POST':
        body = request.json
        name = body['name']
        tipo = body['type']
        ability = body['ability']
        h_ability = body['h_ability']
        habitat = body['habitat']
        img = body['img']
        cur = mysql.connection.cursor()
        cur.execute('INSERT INTO pokemons (name, type, ability, h_ability, habitat, img) VALUES (%s, %s, %s, %s, %s, %s)', (name, tipo, ability, h_ability, habitat, img))
        mysql.connection.commit()
        return jsonify({'name': body['name']})
    elif request.method == 'GET':
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM pokemons')
        result_list = cur.fetchall()
        field_list = cur.description
        column_list = []
        for i in field_list:
            column_list.append(i[0])
        jsonData_list = []
        for row in result_list:
            data_dict = {}
            for i in range(len(column_list)):
                data_dict[column_list[i]] = row[i]
            jsonData_list.append(data_dict)
        return jsonify(jsonData_list)

@app.route('/api/pokemon/<id>', methods = ['DELETE', 'GET', 'PUT'])
def delete_pokemon(id):
    if request.method == 'DELETE':
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM pokemons WHERE id = {0}'.format(id))
        mysql.connection.commit()
        return jsonify({'id': id})
    elif request.method == 'GET':
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM pokemons WHERE id = {0}'.format(id))
        result = cur.fetchall()
        field = cur.description
        column = []
        for i in field:
            column.append(i[0])
        data_poke = {}
        for row in result:
            for i in range(len(column)):
                data_poke[column[i]] = row[i]
        return jsonify(data_poke)
    elif request.method == 'PUT':
        body = request.json
        name = body['name']
        tipo = body['type']
        ability = body['ability']
        h_ability = body['h_ability']
        habitat = body['habitat']
        img = body['img']
        cur = mysql.connection.cursor()
        cur.execute("""
            UPDATE pokemons
            SET name = %s,
                type = %s,
                ability = %s,
                h_ability = %s,
                habitat = %s,
                img = %s
            WHERE id = %s
        """, (name, tipo, ability, h_ability, habitat, img, id))
        mysql.connection.commit()
        return jsonify({'name': body['name']})

if __name__ == '__main__':
    app.run(port = 8080, debug = True)