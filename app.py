from flask import Flask, render_template
from flask_bootstrap import Bootstrap

app = Flask(__name__)
bootstrap = Bootstrap(app)

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')
@app.route('/tables')
def tables():
    return render_template("tables.html")
@app.route('/database')
def database():
    return render_template("database.html")

if __name__=='__main__':
    app.run()