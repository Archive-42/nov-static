# Flask Practice Assessment Walkthrough

## 1. Install Dependencies

```
pipenv install Flask Flask-SQLAlchemy \
               SQLAlchemy python-dotenv \
               psycopg2-binary \
               WTForms Flask-WTF \
               alembic Flask-Migrate pytest
```
```
pipenv install --dev pylint pycodestyle rope
```
```
pipenv install --python 3.8.6
```

## 2. Activate Virtual Environment
```
pipenv shell
```

## 3. Create Database
```
CREATE USER pyweb_practice_user WITH SUPERUSER PASSWORD 'pyweb';
CREATE DATABASE pyweb_practice_db WITH OWNER pyweb_practice_user;
```

## 4. Create .env
```
SECRET_KEY=secret
DATABASE_URL=postgresql://pyweb_practice_user:pyweb@localhost/pyweb_practice_db
```

## 5. Modify .flaskenv
```
FLASK_APP=app
FLASK_ENV=development
```

## 6. Set Up Configuration Class
Note: inside app/config.py
```python
import os

class Configuration:
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
```

## 7. Create Flask Application
Note: inside app/\_\_init\_\_.py
```python
from flask import Flask
from flask_migrate import Migrate
from .routes import simple
from .config import Configuration
# Will not use the below imports till after model is created
from flask_migrate import Migrate
from app.models import db

app = Flask(__name__)
app.register_blueprint(simple.bp)
app.config.from_object(Configuration)
# Same for the below lines
migrate = Migrate(app, db)
db.init_app(app)
```

## 8. Create Blueprint/Root Endpoint
Note: inside app/routes/simple.py
```python
from flask import Blueprint, render_template, redirect


bp = Blueprint("simple", __name__, "")

@bp.route("/")
def main_page():
    return render_template("main_page.html")
```

## 9. Modify main_page.html
```html
<h1>Practice Assessment</h1>
```

## 10. Create SimpleForm
Note: inside app/forms.py
```python
from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired


class SimpleForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    age = IntegerField("Age")
    bio = TextAreaField("Biography")
    submit = SubmitField("Submit")
```

## 11. Create simple-form Endpoint
Note: inside app/routes/simple.py
```python
#import form
from ..forms import SimpleForm


@bp.route("/simple-form")
def simple_form():
    form = SimpleForm()
    return render_template("simple_form.html", form=form)
```

## 12. Modify simple_form.html
```html
<form method="post" action="/simple-form">
    <p>
        {{ form.csrf_token }}
    </p>
    <p>
        {{ form.name.label }}
        {{ form.name }}
    </p>
    <p>
        {{ form.age.label }}
        {{ form.age }}
    </p>
    <p>
        {{ form.bio.label }}
        {{ form.bio }}
    </p>
    <p>
        {{ form.submit }}
    </p>
</form>
```

## 13. Create SimplePerson Model
Note: inside app/models.py
```python
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class SimplePerson(db.Model):
    __tablename__ = "simple_people"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer)
    bio = db.Column(db.String(2000))
```

## 14. Migrate/Upgrade The Model
```
pipenv run flask db init
```
```
pipenv run flask db migrate -m "create simple people table"
```
```
pipenv run flask db upgrade
```

## 15. Create simple-form POST Endpoint
```python
from ..models import SimplePerson, db
# Import above line at top of file

@bp.route("/simple-form", methods=["POST"])
def simple_form_submit():
    form = SimpleForm()
    if form.validate_on_submit():
        person = SimplePerson()
        form.populate_obj(person)
        db.session.add(person)
        db.session.commit()
        return redirect("/")
    return "Bad Data"
```

## 16. Create simple-form-data Endpoint
```python
@bp.route("/simple-form-data")
def simple_form_data():
    people = SimplePerson.query.filter(SimplePerson.name.startswith("M")).all()
    return render_template("simple_form_data.html", people=people)
```

## 17. Modify simple_form_data.html
```html
{% for person in people %}
<div>{{ person.name }}</div>
<div>{{ person.age }}</div>
<div>{{ person.bio }}</div>
{% endfor %}
```

## 18. Test Application in Browser
```
flask run
```

## 19. Run Pytests
```
python -m pytest
```
