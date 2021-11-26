# Python Servers (Week 18) - Learning Objectives

## Assessment Structure
- 3 hours, all VSCode
  - Tests run with `pytest` (`pipenv run pytest` if outside the shell)
- Looks very similar to practice, be comfortable with changes that could be made
  - Different form fields, data types stored on the model, etc.
- Available resources (will be listed in the assessment as well):
  * [The Alembic documentation](https://alembic.sqlalchemy.org/en/latest/)
  * [The Flask-Migrate
    documentation](https://flask-migrate.readthedocs.io/en/latest/)
  * [The Flask-SQLAlchemy
    documentation](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
  * [The Flask-WTF documentation](https://flask-wtf.readthedocs.io/en/stable/)
  * [The SQLAlchemy documentation](https://docs.sqlalchemy.org/en/13/)
  * [The WTForms documentation](https://wtforms.readthedocs.io/en/2.3.x/)
  * [The Python documentation](https://docs.python.org/3/index.html)
- Last assessment!


## Python Environment Management and Unit Testing (W18D1) - Learning Objectives

### Environment Management
1. Describe `pip`
2. Describe `virtualenv`
3. Demonstrate how to use `pipenv` to initialize a project and install
   dependencies
4. Demonstrate how to run a Python program using `pipenv` using its shell
5. Demonstrate how to run a Python program using `pipenv` using the `run`
   command
6. Describe how modules and packages are found and loaded from import statements
7. Describe the purpose of and when `__init__.py` runs
8. Describe the purpose of and when `__main__.py` runs

### Unit Testing
1. Use the built-in `unittest` package to write unit tests
2. Install and use the `pytest` package to write unit tests


## Decorators, Psycopg, and Flask (W18D2) - Learning Objectives

### Decorators
1. Be able to explain what a Python decorator is
2. Understand how callbacks and closures are connected to Python decorators
3. Know how to define custom decorator functions with and without syntactic
   sugar
4. Understand how to use `@property`, a built-in class decorator
5. Know how to use `*args` and `**kwargs` to manage decorator arguments
6. Recognize popular decorator libraries

### Psycopg
1. Connect to a PostgreSQL RDBMS using Psycopg
2. Open a "cursor" to perform data operations
3. Use results performed from executing a `SELECT` statement on existing
   database entities
4. Use parameterized SQL statements to insert, select, update, and delete data
5. Specify what type Psycopg will convert the following PostgreSQL types into:
    - NULL
    - bool
    - double
    - integer
    - varchar
    - text
    - date
6. Use the `with` keyword to clean up connections and database cursors

### Flask
#### Flask Intro
1. Setup a new Flask project
2. Run a simple Flask web application on your computer
3. Utilize basic configuration on a Flask project

#### Routing in Flask
1. Create a static route in Flask
2. Create a parameterized route in Flask
3. Use decorators run code before and after requests
4. Identify the "static" route

#### Jinja Templates
1. Use a Jinja template as return for a Flask route with `render_template`
2. Add variables to a Jinja template with `{{ }}`
3. Use `include` to share template content in Jinja

#### Using Forms with WTForms
1. Start a project with Flask, Jinja and Flask-WTF
2. Use the following basic field types in WTForms
    - BooleanField
    - DateField
    - DateTimeField
    - DecimalField
    - FileField
    - MultipleFileField
    - FloatField
    - IntegerField
    - PasswordField
    - RadioField
    - SelectField
    - SelectMultipleField
    - SubmitField
    - StringField
    - TextAreaField

#### Handling POSTs with WTForms
1. Use WTForms to define and render forms in Flask
2. Use WTForms to validate data in a POST with the built-in validators

#### Routing Blueprints in Flask
1. Create a Flask Blueprint
2. Register the Flask Blueprint with the Flask application
3. Use the Flask Blueprint to make routes

#### Flask Sessions
1. Configure and use sessions in Flask


## Class/Instance Variables in Python and SQLAlchemy (W18D3) - Learning Objectives

### Class and Instance Variables
1. Describe the difference between instance and class variables
2. Define a class variable
3. Describe how Python performs attribute name lookups
4. Understand the purpose of the `__slots__` class variable
5. Describe the difference between instance, class, and static methods
6. Use the `@classmethod` decorator to define a class method
7. Use the `@staticmethod` decorator to define a static method

### SQLAlchemy
#### Connection SQLAlchemy to PostgreSQL
1. Describe how to create an "engine" that you will use to connect to a
   PostgreSQL database instance
2. Describe how the `with engine.connect() as connection:` block establishes and
   cleans up a connection to the database
3. Describe how to create a database session from an engine

#### SQLAlchemy Mappings
1. Create a mapping for SQLAlchemy to use to tie together a class and a table in
   the database

#### Create, Update, and Delete with SQLAlchemy
1. Add data to the database, both single entities as well as related data
2. Update data in the database
3. Delete data from the database (including cascades!)
4. Know how to use and specify the "delete-orphan" cascading strategy

#### Querying Data with SQLAlchemy
1. Describe the purpose of a `Query` object
2. Use a `Session` object to query the database using a model
3. How to order your results
4. Use the `filter` method to find just what you want
5. Use instance methods on the `Query` object to return a list or single item
6. Use the `count` method to ... count

#### Querying Across Joins in SQLAlchemy
1. Query objects with criteria on dependant objects
2. Lazily load objects
3. Eagerly load objects

#### Using SQLAlchemy with Flask
1. Install the Flask-SQLAlchemy extension to use with Flask
2. Configure SQLAlchemy using `Flask-SQLAlchemy`
3. Use the convenience functions and objects `Flask-SQLAlchemy` provides you to
   use in your code.


## Alembic and Pug (W18D4) - Learning Objectives

### Migrations with Alembic
1. Install Alembic into your project
2. Configure Alembic to talk to your database and not have silly migration names
3. Control Alembic's ability to migrate your database
4. Reason about the way Alembic orders your migrations
5. Handle branching and merging concerns

### Using Alembic with Flask
1. Configuring a Flask application to use Alembic
2. Run commands to manage your database through the flask command
3. Autogenerate migrations from your models

### Using Pug with Flask
1. Install, configure, and use Pug with Flask