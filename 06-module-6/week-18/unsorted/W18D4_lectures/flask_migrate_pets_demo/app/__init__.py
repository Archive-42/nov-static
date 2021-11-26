from flask import Flask, render_template
from flask_migrate import Migrate
from app.models import db, Dog
import os

app = Flask(__name__)

app.config.from_mapping({
    'SQLALCHEMY_DATABASE_URI': os.environ.get('DATABASE_URL'),
    'SQLALCHEMY_TRACK_MODIFICATIONS': False,
})
app.jinja_env.add_extension('pypugjs.ext.jinja.PyPugJSExtension')


@app.route('/dogs')
def show_all_dogs():
    dogs = Dog.query.all()
    return render_template('dogs.pug', title='All the pups!', dogs=dogs)
    # return dogs[0].name


@app.route('/dogs/<int:id>')
def show_dog(id):
    dog = Dog.query.get_or_404(id)
    return dog.name


db.init_app(app)
Migrate(app, db)
