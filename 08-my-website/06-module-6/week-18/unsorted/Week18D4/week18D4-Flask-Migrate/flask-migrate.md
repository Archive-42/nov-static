# Alembic With Flask

## Step 1:

for the demo the info below can be simple

1. create a user in psql with a password.
2. create a database and give the user you created ownership of this database
3. create a directory for the application

Install everything needed to build database driven app, __pipenv install__:

> __psycopg2-binary__: Allows SQLAlchemy to connect to your database

> __Flask-SQLAlchemy__: Integrates SQLAlchemy into your Flask application

> __alembic__: will Manage migrations

> __Flask-Migrate__: Integrates Alembic with Flask

> __Flask__: Web Server

> __python-dotenv__: Allows use of .env or .flaskenv files for Flask

copy & paste version:

```
pipenv install psycopg2-binary Flask-SQLAlchemy alembic Flask-Migrate Flask python-dotenv
```

## Step 2:

Add the following to your __flaskenv__:

> FLASK_APP=flask_migrate_test.py: This is so when we run flask it knows where the application is located

> FLASK_ENV=development: Sets the environment to either development or production

> DATABASE_URL=postgresql://flask_migrate_test:password@localhost/flask_migrate_test <-- DB URL and credentials

> __format recap__: postgresql://username-here:password-here@localhost/database-name-here

## Step 3:

Set up your directory tree by creating the following:

. <---- root directory of application

app

app/**init**.py

app/models.py

flask_migrate_test.py

## Step 4:

app/models.py will contain our mapping classes for SQLAlchemy.

  At the top of the file copy the following to import SQLAlchemy and
  set the db object which contains all the functions and helpers from sqlalchemy

  ```Python
  from flask_sqlalchemy import SQLAlchemy

  db = SQLAlchemy()
  ```

## Step 5:

app/**init**.py will initialize the Flask application. copy the following into this file:

```Python
    from app.models import db
    from flask import Flask
    from flask_migrate import Migrate
    import os

    # create an instance of the flask application
    app = Flask(__name__)
    # configure the SQLAlchemy object from models.py
    app.config.from_mapping({
    'SQLALCHEMY_DATABASE_URI': os.environ.get('DATABASE_URL'),
    'SQLALCHEMY_TRACK_MODIFICATIONS': False,  # code to turn off a deprecated feature warning
    })

    # initialize the db object from models.py
    db.init_app(app)

    # use the Migrate class passing in the application instance
    # and the Flask-SQLAlchemy database instance.
    Migrate(app, db)
```

## Step 6:

Add the import statement to the flask_migrate_test.py that runs our application.

```Python
from app import app
```

## Step 7:

Similar to initializing alembic with alembic init to initialize with flask run:

```pipenv run flask db init```

```flask db init (if already in your pipenv)```

A new directory named migrations should now be created holding all the Alembic files.

In models.py we can create the owners tables but adding the following code:

```Python
class Owner(db.Model):
    __tablename__ = "owners"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False)
```

Now run: ```pipenv run flask db migrate -m "create owners table"```

Similar to Alembic, this creates the new file in the migration/versions directory

Lastly to to apply the migrations to the database we would run: ```pipenv run flask db upgrade```

To downgrade we would run: ```pipenv run flask db downgrade```
