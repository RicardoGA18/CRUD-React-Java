from flask import Flask, render_template, request, url_for, redirect, flash
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

@app.route('/')
def Index():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM pokemons')
    data = cur.fetchall()
    return render_template('index.html', pokemons = data)

@app.route('/add', methods=['POST'])
def add_pokemon():
    if request.method == 'POST':
        name = request.form['name']
        tipo = request.form['type']
        ability = request.form['ability']
        h_ability = request.form['h_ability']
        habitat = request.form['habitat']
        img = request.form['img']
        cur = mysql.connection.cursor()
        cur.execute('INSERT INTO pokemons (name, type, ability, h_ability, habitat, img) VALUES (%s, %s, %s, %s, %s, %s)', (name, tipo, ability, h_ability, habitat, img))
        mysql.connection.commit()
        flash('Pokemon Added Successfully')
        return redirect(url_for('Index'))

@app.route('/edit/<id>')
def get_pokemon(id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM pokemons WHERE id = %s', (id))
    data = cur.fetchall()
    return render_template('edit.html', pokemon = data[0])

@app.route('/update/<id>', methods = ['POST'])
def update_pokemon(id):
    if request.method == 'POST':
        name = request.form['name']
        tipo = request.form['type']
        ability = request.form['ability']
        h_ability = request.form['h_ability']
        habitat = request.form['habitat']
        img = request.form['img']
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
        flash('Pokemon Updated Successfully')
        return redirect(url_for('Index'))

@app.route('/delete/<string:id>')
def delete_pokemon(id):
    cur = mysql.connection.cursor()
    cur.execute('DELETE FROM pokemons WHERE id = {0}'.format(id))
    mysql.connection.commit()
    flash('Pokemon Removed Successfully')
    return redirect(url_for('Index'))

if __name__ == '__main__':
    app.run(port = 8080, debug = True)