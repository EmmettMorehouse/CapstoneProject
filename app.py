from flask import Flask, request, render_template
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

# Commented out and removed due to not being able to implement 
# @app.route('/database')
# def database():
#     return render_template("database.html")


if __name__=='__main__':
    app.run()