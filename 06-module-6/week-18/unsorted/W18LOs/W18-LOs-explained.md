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
- Standard package management system for Python, used to install packages
  globally
- Similar to `npm --global` for JavaScript

2. Describe `virtualenv`
- Creates a virtual environment
- An isolated working copy of Python, allowing you to work on a specific project
  without affecting other projects
- Allows multiple side-by-side installations of Python, one for each project
- Keeps project environments isolated from each other

3. Demonstrate how to use `pipenv` to initialize a project and install
   dependencies
- Create your virtual environment
    - Using a specific python version:
        - pipenv install --python "$PYENV_ROOT/versions/3.8.3/bin/python"
    - Using the current active python version:
        - pipenv install --python "$PYENV_ROOT/shims/python"
- Activate the virtual environment
    - pipenv shell
- Install a dependency
    - pipenv install pytest
    - pipenv install "pytest<=5.3" (installs specifically version <=5.3)
- Uninstall a dependency
    - pipenv uninstall pytest
- Install a development-only package
    - pipenv install --dev pytest (adds as a development-only package)

4. Demonstrate how to run a Python program using `pipenv` using its shell
    - Open the shell
        - pipenv shell
    - Run the program as usual
        - python app.py (program)
        - python -m app (module)
        - pytest (executable)

5. Demonstrate how to run a Python program using `pipenv` using the `run`
   command
    - Using `run` will start the virtual environment, run the program, then exit
      the virtual environment
    - pipenv run pytest

6. Describe how modules and packages are found and loaded from import statements
- The `sys` module has an attribute called `path`, which represents the
  different locations to look for a module
- When we import a module, we check each of these locations in order until we
  find a matching module
- The current directory is at the top of this list, meaning a local module will
  take precedence over a module that we've installed
- We can add in another path to look for modules by using the `PYTHONPATH`
  environment variable. That path(s) that we specify will be added directly
  after the current directory in the list

7. Describe the purpose of and when `__init__.py` runs
- Initializes the directory module when it is imported or ran as a program.
- Importing nested modules will run all `__init__.py` from the top module down
  to each submodule.

8. Describe the purpose of and when `__main__.py` runs
- This file is only run when the module is invoked as a program
- `__main__.py` is run after every `__init__.py` file leading up to it is
  executed
- Without a `__main__.py` we wouldn't be able to execute the module directly,
  which is something that we may or may not wish to be able to do 

### Unit Testing
1. Use the built-in `unittest` package to write unit tests
- Running unittest tests:
    - python -m unittest
- Create a test directory to house our test files and make it a module. We can
  make it a module by creating a `__init__.py` file within the directory. The
  presence of this file is enough, it does not need any code.
- Each test file should import unittest and create a class that inherits from
  unittest.TestCase. We'll also want to import the module that we are testing:
```py
import unittest
from stack import Stack

class TestStack(unittest.TestCase):
    pass
```
- The methods of the test class are the unit tests. We create a new method
  starting with `test_` for each unit test we would like to make:
```py
def test_new_stack_has_zero_elements(self):
    pass
```
- We inherit many assertion methods from the `TestCase` class. We follow our
  standard Arrange, Act, Assert formula for creating our tests. If any of our
  assertions are not true, our test fails:
```py
def test_new_stack_has_zero_elements(self):
    # Arrange
    s = Stack()

    # Act
    result = len(s)

    # Assert
    self.assertEqual(result, 0)
```
- Some common assertion methods that we can use are:

| Method                    | Check that              |
|:------------------------- |:----------------------- |
| assertEqual(a, b)         | a == b                  |
| assertNotEqual(a, b)      | a != b                  |
| assertTrue(x)             | bool(x) is True         |
| assertFalse(x)            | bool(x) is False        |
| assertIs(a, b)            | a is b                  |
| assertIsNot(a, b)         | a is not b              |
| assertIsNone(x)           | x is None               |
| assertIsNotNone(x)        | x is not None           |
| assertIn(a, b)            | a in b                  |
| assertNotIn(a, b)         | a not in b              |
| assertIsInstance(a, b)    | isinstance(a, b)        |
| assertNotIsInstance(a, b) | not isinstance(a, b)    |

- Note that `assertEqual` is smart enough to check the content of lists,
  dictionaries, etc., doing a pairwise comparison, index by index, instead of
  checking if they are the same memory location.
- More advanced use cases can be found in the docs:
  https://docs.python.org/3/library/unittest.html#test-cases

2. Install and use the `pytest` package to write unit tests
- If you haven't yet, create a virtual environment and enter the shell:
    - pipenv install --python "$PYENV_ROOT/shims/python"
    - pipenv shell
    - (Make sure VSCode is using the pipenv environment by selecting it at the
      bottom left)
    - (Install a linter in the virtual environment if desired with `pipenv
      install --dev pylint`, or pycodestyle, etc.)
- Install `pytest` in your virtual environment
    - pipenv install --dev pytest
- Add a `test` directory and make it a module by adding in a `__init__.py` file,
  just like we did with `unittest`
- We can run our tests with the `pytest` command, since an executable was added
  to our environment's `bin` when we installed `pytest`
- Our test files will be placed in the `test` directory and must either begin or
  end with the `test` keyword, ie `test_*.py` or `*_test.py`. Following this
  naming convention allows pytest to understand that this file contains tests to
  run.
- Inside of our file, we can define functions directly (no need for classes)
  that represent our unit tests. Each function that begins with `test` will be
  treated as a unit test:
```py
def test_new_stack_has_zero_elements(self):
    pass
```
- We will still want to import the module that we are writing tests for, but we
  don't need to import pytest, unlike how we had to import unittest.
- Instead of having specific assertion methods like unittest, pytest uses the
  `assert` keyword. If all assertions are true, our unit test passes:
```py
def test_new_stack_has_zero_elements(self):
    # Arrange
    s = Stack()

    # Act
    result = len(s)

    # Assert
    assert result == 0

# Condensed version:
def test_new_stack_has_zero_elements(self):
    assert len(Stack()) == 0
```
- More advanced use cases can be found in the docs:
  https://docs.pytest.org/en/stable/contents.html#toc


## Decorators, Psycopg, and Flask (W18D2) - Learning Objectives

### Decorators
1. Be able to explain what a Python decorator is
- A function that takes in another function to extend its behavior and return a
  modified version of the inner function

2. Understand how callbacks and closures are connected to Python decorators
- With callbacks, we can pass around and return references to functions to be
  invoked at a later time. This concept holds with Python's decorators, where we
  are defining and returning a reference to a new function to be invoked later
  on.
- With closures, we have access to variables defined in outer scopes, allowing
  us to define inner functions that utilize variables passed in to outer
  functions. In decorators, our inner functions have access to the callbacks
  passed in as arguments to the outer decorator function.
```py
# message_decorator is our decorator function
# message_func is the callback, a function that we are decorating
# We are closing over this function, returning a reference to a new function (message_wrapper)
# This new function is able to invoke message_func because it was closed over, defined in the outer scope
def message_decorator(message_func):
  def message_wrapper(name):
    from_statement = 'This is a message from ' + name
    print(message_func() + from_statement)
  return message_wrapper
```

3. Know how to define custom decorator functions with and without syntactic
   sugar
- A decorator function takes in a function as an argument that we want to wrap,
  then returns a new function that performs whatever additional functionality we
  want the decorated function to do.
- To decorate a function and maintain the name, we can reassign its value after
  decorating:
```py
# decorator function
def message_decorator(message_func):
  def message_wrapper(name):
    from_statement = 'This is a message from ' + name
    print(message_func() + from_statement)
  return message_wrapper

# function to decorate
def say_hi():
    return 'Hi! '

# before decorating
say_hi() # returns 'Hi! '

# decorated function
say_hi = message_decorator(say_hi)

# say_hi now points to the wrapped function and will expect a 'name' argument
say_hi('Bryce') # prints 'Hi! This is a message from Bryce'
```
- We can also use the `@<<decorator_name>>` syntactic sugar to reassign a
  function at definition:
```py
# decorator function
def message_decorator(message_func):
  def message_wrapper(name):
    from_statement = 'This is a message from ' + name
    print(message_func() + from_statement)
  return message_wrapper

# immediately decorated function
@message_decorator
def say_hi():
    return 'Hi! '

# say_hi will immediately expect a name argument
say_hi('Bakari') # prints 'Hi! This is a message from Bakari'

# decorators are especially useful when we decorate multiple functions
@message_decorator
def say_bye():
    return 'Bye! '

say_hi('Alvin') # prints 'Bye! This is a message from Alvin'
say_bye('Alvin') # prints 'Hi! This is a message from Alvin'
```

4. Understand how to use `@property`, a built-in class decorator
- We've already used this decorator when we learned about classes.
- It provides the name of the function that we are decorating as an attribute on
  our class, returning the value of the instance variable we are returning.
- We can use the `@<<attribute_name>>.setter` decorator to allow our attribute
  to also be assigned new values.
- The decorator `@<<attribute_name>>.deleter` decorator allows us to `del` the
  attribute, completely removing the instance variable. Trying to reference the
  variable either directly or through a getter will result in an AttributeError
  if the deleter has been invoked. A setter could still recreate the instance
  variable.
```py
class Ring:
  def __init__(self):
    self._nickname = "Shiny ring"

  @property
  def nickname(self):
    return self._nickname

  @nickname.setter
  def nickname(self, value):
    self._nickname = value

  @nickname.deleter
  def nickname(self):
    del self._nickname
    print('Oh no! The ring is gone!')

ring = Ring()
print(ring.nickname)                  # Shiny ring
ring.nickname = "Gollum's precious"
print(ring.nickname)                  # Gollum's precious
del ring.nickname                     # Oh no! The ring is gone!

print(ring._nickname)                 # AttributeError: 'Ring' object has no attribute '_nickname'
print(ring.nickname)                  # AttributeError: 'Ring' object has no attribute '_nickn
# (1995, 'Mitsubishi', 'Eclipse', 2)
# (1994, 'Acura', 'Integra', 3)

# (Assuming the previous two lines weren't run and we didn't error out)
ring.nickname = "Shiny ring"
print(ring.nickname)                  # Shiny ring
```

5. Know how to use `*args` and `**kwargs` to manage decorator arguments
- We can use `*args` and `**kwargs` in our wrapped function just like any other
  function definition in order to capture any arguments passed in to our
  decorated function.
```py
def message_decorator(message_func):
  def message_wrapper(*args, **kwargs):
    repeats = args[0]
    message = message_func(kwargs['name'])
    author = kwargs['author']
    for i in range(repeats):
        print(f'{message}! This is a message from {author}.')
  return message_wrapper

@message_decorator
def say_hi(name):
  return f'Hi, {name}'

# say_hi points to the wrapper function, so the aqrguments are passed directly to that function definition
# (2) is passed to *args and { name: 'Julia', author: 'Ryan' } is passed to **kwargs
say_hi(2, name='Julia', author='Ryan')  # Prints 'Hi, Julia! This is a message from Ryan.' twice.
```

6. Recognize popular decorator libraries
- Many decorator libraries exist that define decorators that you may find
  useful. Two examples are:
    - functools: https://docs.python.org/3/library/functools.html
    - PythonDecoratorLibrary:
      https://wiki.python.org/moin/PythonDecoratorLibrary 


### Psycopg
1. Connect to a PostgreSQL RDBMS using Psycopg
- Add `psycopg2-binary` to your pipenv
  - `pipenv install psycopg2-binary`
  - If you are creating the virtualenv instead of adding to an existing one, you
    can also specify which version of Python you want the environment to use:
    - `pipenv --python 3.8.2 install psycopg2-binary`
- Import the `psycopg2` package into your module
  - `import psycopg2`
- Set up your connection parameters in a dictionary, including `dbname`, `user`,
  and `password`:
```py
CONNECTION_PARAMETERS = {
                          'dbname': 'psycopg_test_db',
                          'user': 'psycopg_test_user',
                          'password': 'password',
}
```
- Using `with` (discussed below), open a connection to the database. We can use
  the `connect` method on `psycopg2` and spread our connection parameters:
```py
with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
  # Do something with our connection (probably open a cursor first)
```

2. Open a "cursor" to perform data operations
- After we've made our connection to the database, use the `cursor` method on
  the connection:
```py
with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
    with conn.cursor() as curs:
      # Do something with our cursor
```
- With our cursor, we can use the `execute` method to run a SQL command:
```py
with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
    with conn.cursor() as curs:
        curs.execute('DROP TABLE cars;')
```

3. Use results performed from executing a `SELECT` statement on existing
   database entities
- After executing a command, we can fetch the results using the `fetchone` or
  `fetchall` methods on the cursor.
- `fetchone` will return a tuple of the first matched record
- `fetchall` will return a list of tuples of all matching records
```py
# Fetching one record (find owner info by email):
with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
    with conn.cursor() as curs:
        curs.execute("""
                      SELECT first_name, last_name, email
                      FROM owners
                      WHERE email = %(email)s
                      """,
                      {'email': email})
        results = curs.fetchone()
        return results

# Fetching many records (find cars by owner_id):
with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
    with conn.cursor() as curs:
        curs.execute("""
                      SELECT manu_year, make, model, owner_id
                      FROM cars
                      WHERE owner_id = %(owner_id)s
                      """,
                      {'owner_id': owner_id})
        results = curs.fetchall()
        return results
```

4. Use parameterized SQL statements to insert, select, update, and delete data
- We can interpolate data into our SQL query strings in order to make them more
  dynamic. This allows us to create functions for our repeated actions:
```py
# Inserting a new record
def add_new_car(manu_year, make, model, owner_id):
  """
  Add the given car to the database
  :param manu_year: <int> the year the car was made
  :param make: <string> the manufacturer of the car
  :param model: <string> the model of the car
  :param owner_id: <int> the id number of the owner
  """
  with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
    with conn.cursor() as curs:
      # curs.execute(f'INSERT INTO {table}{columns} VALUES{values};')
      curs.execute("""
                    INSERT INTO cars (manu_year, make, model, owner_id)
                    VALUES (%(manu_year)s, %(make)s, %(model)s, %(owner_id)s)
                    """,
                    {'manu_year': manu_year,
                    'make': make,
                    'model': model,
                    'owner_id': owner_id})


# Updating an existing record
def change_car_owner(car_id, new_owner_id):
  """
  Update the owner of a car, both by record id
  :param car_id: <int> the id of the car to change
  :param new_owner_id: <int> the owner_id to give ownership to
  """
  with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
    with conn.cursor() as curs:
      curs.execute("""
                    UPDATE cars SET owner_id = %(new_owner_id)s
                    WHERE id = %(car_id)s
                    """,
                    {'car_id': car_id,
                    'new_owner_id': new_owner_id})


# Deleting a record
def delete_car(car_id):
  """
  Delete the record for a car given an id for that car
  :param car_id: <int> the id of the car record to remove
  """
  with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
    with conn.cursor() as curs:
      curs.execute("""
                    DELETE FROM cars WHERE id = %(car_id)s
                    """,
                    {'car_id': car_id})


# Selecting records
def get_owners_cars(owner_id):
  """
  Fetch and return all cars in the cars table
  :param owner_id: <int> the id of the owner who's cars to return
  :return: <list> the results of the query
  """
  with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
    with conn.cursor() as curs:
      curs.execute("""
                    SELECT manu_year, make, model, owner_id 
                    FROM cars
                    WHERE owner_id = %(owner_id)s
                    """,
                    {'owner_id': owner_id})
      results = curs.fetchall()
      return results
```

5. Specify what type Psycopg will convert the following PostgreSQL types into:

| PostgreSQL type | Python type               |
|:--------------- |:------------------------- |
| NULL            | None                      |
| bool            | bool                      |
| double          | float                     |
| integer         | int (long in Python 2)    |
| varchar         | str                       |
| text            | str (unicode in Python 2) |
| date            | date                      |

6. Use the `with` keyword to clean up connections and database cursors
- `with` is a convenient way to make sure we close out our database connection
  after we are done performing our operation
- When the block of code completes, the `__exit__` function that is written for
  us on the connection or cursor runs, closing out said connection. The
  `__exit__` function is also run when errors are encountered.
- If we didn't use `with` we ould have to create `try`/`except`/`finally` blocks
  to establish our connection, perform our operations, commit any changes, then
  make sure our connection was closed.

### Flask
#### Flask Intro
1. Setup a new Flask project
- Install Flask into an environment
  - `pipenv install Flask~=1.1`
- Import flask into your app
  - `from flask import Flask`
- Create an instance of Flask, typically done with the `__name__` to use the
  name of the file
  - `app = Flask(__name__)`

2. Run a simple Flask web application on your computer
- Create a basic route on your app. We use the
  `@<<app-name>>.route('/<<route>>')` decorator before a function that returns
  whatever the route should return:
```py
@app.route('/')
def hello():
  return '<h1>Hello, world!</h1>'
```
- In order to run, we need to have a `FLASK_APP` environment variable to specify
  the file to use. We'll do this in a more advanced way below, but here we're
  simply adding the variable in the terminal:
  - `export FLASK_APP=app-name.py`
- We use the `run` command on `flask` in order to start our application. We can
  do this from outside our shell:
  - `pipenv run flask run`
- Or we can enter our shell first:
  - `pipenv shell`
  - `flask run`

3. Utilize basic configuration on a Flask project
- We can use the `-p` flag to indicate a port to run on
  - `pipenv run flask run -p 8080`
- We have two major environment variables that affect our app:
  - FLASK_APP: sets the file to run when we call `flask run`
  - FLASK_ENV: setting to `development` overrides the default `production`
    environment and allows debugging
- Besides setting the environment variables in the terminal, we can also use a
  `.flaskenv` file.
  - Create the file at the root of your app and add in environment variables as
    the content:
  ```
  FLASK_APP=simple.py
  FLASK_ENV=development
  ```
  - Install `python-dotenv` in order to pull in 
    - `pipenv install python-dotenv~=0.13`
  - Running flask will now pull in the variables from the file instead of having
    to set them in the terminal
- We can also utilize the Flask instance's `config` dictionary to use set up
  configuration variables. A good design pattern is to create a `Config` class
  that houses these key/value pairs
  - Create a `config.py` file to house your class.
  - In this file, import the `os` package in order to interact with environment
    variables.
  - Have the `Config` class inherit from `object` for easy importing into the
    config dictionary
  - Set the variables that you'd like to define directly in the class. You can
    pull in environment variables or hardcode them:
  ```py
  import os

  class Config(object):
      GREETING = 'Salutations, superior students!'
      # If a SECRET_KEY environment variable exists, use it, otherwise use the hardcoded value
      SECRET_KEY = os.environ.get('SECRET_KEY') or 'default-key-for-devs'
  ```
  - In your app, import your `Config` class, then add in the class variables
    that you created into the `config` dictionary using the `from_object`
    method.
  - From there, you can utilize your configuration variables anywhere that you
    have access to your app:
  ```py
  from flask import Flask
  # Load configuration class
  from config import Config

  app = Flask(__name__)
  # Apply configuration from class
  app.config.from_object(Config)
  # Test value of variable that may or may not come from the environment
  print("SECRET KEY IS: ", app.config["SECRET_KEY"])


  @app.route('/')
  def hello():
      # Use configuration variable
      return f'<h1>{app.config["GREETING"]}</h1>'
  ```


#### Routing in Flask
1. Create a static route in Flask
- Use the `@app.route('/<<route-name>>)` decorator to create a static route (one
  without wildcards)
- Using multiple route decorators for the same function means each of those
  routes will use the same function, returning the same content:
```py
from flask import Flask
app = Flask(__name__)


@app.route('/')
@app.route('/home')
def home():
    return '<h1>Home</h1>'


@app.route('/about')
def about():
    return '<h1>About</h1>'
```

2. Create a parameterized route in Flask
- We can capture wildcards in our routes by surrounding them with
  `<wildcard-name>`
- The wildcard is then passed specified as a parameter to the function that we
  are decorating.
- We can also specify data type that we require for a wildcard by using
  `<type:wildcard-name>`, such as `<int:id>`. Only routes matching that type
  will use the function. If a different type is used, Flask will generate a
  standard 404.
```py
@app.route('/item/<int:id>')
def item(id):
    return f'<h1>Item ID: {id}</h1>'

@app.route('/item/<name>')
def item(name):
    return f'<h1>Item Name: {name}</h1>'
```

3. Use decorators to run code before and after requests
- Special decorators can be used to run methods before each request, such as
  loading the logged-in user from the session, after each request, such as
  closing a database connection, or before the first request is handled, such as
  initializing your application:
```py
@app.before_request
def before_request_function():
    print("before_request is running")

# after_request takes in and returns the response
# This allows us to do any manipulation to the response if needed
# Even if we don't, we need to return it to the client
@app.after_request
def after_request_function(res):
    print("after_request is running")
    return res

@app.before_first_request
def before_first_function():
    print("before_first_request happens once")
```

4. Identify the "static" route
- Flask will automatically respond to requests to `/static/<<resource-name>>` by
  returning a file that matches the name housed in a `static` directory.
  - A request to `http://localhost:5000/static/images/puppy.png` will return the
    `puppy.png` image file housed inside of our app's `static/images/`
    directory.
- This is useful for returning assets such as images or css files that we are
  storing on our server.


#### Jinja Templates
1. Use a Jinja template as return for a Flask route with `render_template`
- Jinja is a similar concept to serving pug file from our Express servers.
- Add the Jinja package to your application
  - `pipenv install Jinja2~=2.11`
- Create a `templates` folder within your application to house your templates.
- In `templates`, create html files that you would like your routes to return.
- In your app, import `render_template` from `flask`. Instead of returning HTML
  strings directly, invoke `render_template` with the name of the html file you
  would like to return:
```py
from flask import (Flask, render_template)

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
```

2. Add variables to a Jinja template with `{{ }}`
- The real benefit of Jinja comes from being able to generate html more
  dynamically.
- We can use `{{ variable-name }}` in our html files to fill in values that were
  passed in as kwargs to `render_template`
```py
# app.py
from flask import (Flask, render_template)

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html', sitename='My Sample', page="Home")
```
```html
<!-- templates/index.html -->
<!doctype html>
<html>

<head>
    <title>{{ page }} - {{ sitename }}</title>
</head>

<body>
    <h1>{{ sitename }}</h1>
    <h2>{{ page }}</h2>
    <p>Coming soon to a browser near you...</p>
</body>

</html>
```
- We can also utilize `{% %}` to evaluate conditionals or loops in our html. We
  use `{% endif %}` and `{% endfor %}` to close those blocks:
```html
<!-- logged_in is a variable passed to the template -->
{% if not logged_in %}
  <a href="/login">Log in</a>
{% endif %}

<ul>
  <!-- navigation is an iterable passed to the template -->
  {% for item in navigation %}
    <li>
      <a href="{{ item.href }}">{{ item.caption }}</a>
    </li>
  {% endfor %}
</ul>
```

3. Use `include` to share template content in Jinja
- We can reuse small templates within larger templates with the `include`
  keyword, followed by the name of the template we are including.
- We use the same `{% %}` syntax to evaluate our code within the html:
```html
<!-- nav.html -->
<a href="/">Home</a>
<a href="/about">About</a>

<!-- copyright.html -->
&copy; 2020 Me, myself, and I. All rights reserved.

<!-- index.html -->
<!doctype html>
<html>

  <head>
      <title>{{ page }} - {{ sitename }}</title>
  </head>

  <body>
      <h1>{{ sitename }}</h1>
      <h2>{{ page }}</h2>
      {% include 'nav.html' %}
      <p>Coming soon to a browser near you...</p>
      {% include 'copyright.html' %}
  </body>

</html>
```
4. Reference to Jinja docs:
   https://jinja.palletsprojects.com/en/2.11.x/templates/


#### Using Forms with WTForms
1. Start a project with Flask, Jinja and Flask-WTF
- Creating a new project folder.
- Install packages with pipenv
```bash
pipenv install Flask~=1.1
pipenv install Jinja2~=2.11
pipenv install python-dotenv~=0.13
pipenv install Flask-WTF~=0.14
```
- Create a subfolder named `app`, a subfolder of `app` named `templates` and
  create five files.
  - Flask environment file in the project folder: `.flaskenv`
  ```
  FLASK_APP=app
  FLASK_ENV=development
  SECRET_KEY=super-secret-stuff
  ```

  - Application file in the app subfolder: `__init__.py`
  ```py
  from flask import (Flask, render_template)
  # import config class
  from app.config import Config
  # import form class
  from app.sample_form import SampleForm

  app = Flask(__name__)
  # populate Flask config dictionary from config class
  app.config.from_object(Config)

  @app.route('/')
  def index():
      # keep sample simple with just a link to the form
      return '<h1>Simple App</h1><a href="/form">Form</a>'

  @app.route('/form')
  def form():
      # instantiate form
      form = SampleForm()
      # send form into Jinja template (with form=form)
      return render_template('form.html', form=form)
  ```

  - Configuration module in the app subfolder: `config.py`
  ```py
  import os

  class Config(object):
      # Property used by multiple Flask add-ons for security
      SECRET_KEY = os.environ.get('SECRET_KEY') or 'default-key-for-devs'
  ```

  - Jinja template in the app/templates subfolder: `form.html`
  ```html
  <!doctype html>
  <html>

    <head>
        <title>Sample Form</title>
    </head>

    <body>
        <h1>Sample Form</h1>
        <!-- form starts here -->
        <form action="" method="post" novalidate>
            {{ form.csrf_token }}
            <p>
                {{ form.name.label }}
                {{ form.name(size=32) }}
            </p>
            <p>{{ form.submit() }}</p>
        </form>
        <!-- form ends above -->
    </body>

  </html>
  ```

  - Sample form file in the app subfolder to utilize flask_wtf: `sample_form.py`
  ```py
  from flask_wtf import FlaskForm
  from wtforms import StringField, SubmitField


  class SampleForm(FlaskForm):
      name = StringField('Name')
      submit = SubmitField('Save')
  ```


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
  - Be comfortable with using the `wtforms` docs for basic syntax of these other
    fields you may use in a form.
    https://wtforms.readthedocs.io/en/2.3.x/fields/#basic-fields

#### Handling POSTs with WTForms
1. Use WTForms to define and render forms in Flask
- We can allow a route to respond to different HTTP methods by providing the
  list of accepted methods to the `route` decorator. `GET` is the only default:
```py
@app.route('/form', methods=['GET', 'POST'])
```
- Having both a `GET` and `POST` method listed allows us to both post to this
  route from our form and also serve up the form if a get request is made. This
  is especially helpful when we want to be able to keep the user on the same
  page when validation errors occur, allowing us to show error messages.

2. Use WTForms to validate data in a POST with the built-in validators
- We can import validators into our form from `wtforms.validators` such as
  DataRequired to indicate we want some sort of data in the field or Length to
  specify a min or max length of input.
- We invoke these functions in a `validators` list on the form field, passing in
  any necessary arguments:
```py
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class SampleForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=4, max=12)])
    submit = SubmitField('Save')
```
- In our app, we can handle requests based on whether it is a `GET` request for
  the form, a `POST` with valid data, or a `POST` with invalid data.
- Invoking `validate_on_submit` on our form instance will return `True` if the
  `POST` did not have any validation errors. From there we can use the
  `form.data` dictionary to do something with what the user submitted. We can
  also `redirect` as long as we import it from `flask`
- If the form was submitted with errors, `validate_on_submit` will populate a
  `form.errors` dictionary, which can be used in the templates to display errors
  to the user
```py
from flask import (Flask, render_template, redirect)
# import config class
from app.config import Config
# import form class
from app.sample_form import SampleForm

app = Flask(__name__)
# populate Flask config dictionary from config class
app.config.from_object(Config)

@app.route('/')
def index():
    # keep sample simple with just a link to the form
    return '<h1>Simple App</h1><a href="/form">Form</a>'

@app.route('/form', methods=['GET', 'POST'])
def form():
    # instantiate form
    form = SampleForm()
    if form.validate_on_submit():
      print(form.data)
      return redirect('/')

    # send form into Jinja template (with form=form and errors=form.errors)
    return render_template('form.html', form=form, errors=form.errors)
```

#### Routing Blueprints in Flask
1. Create a Flask Blueprint
- Blueprints allow us to organize our code by breaking our routes out to
  individual modules, much like Routers did for us in Express.
- We create a Blueprint by importing it from `flask`, then invoking it with a
  name, a file name to indicate where it's defined (just like when we defined
  our Flask app), and a url_prefix, which will prepend all routes to this
  Blueprint.
```py
from flask import Blueprint

bp = Blueprint('admin', __name__, url_prefix='/admin')
```

2. Register the Flask Blueprint with the Flask application
- To connect our Blueprint to our app, we import the module that it is defined
  in, then invoke the app's `register_blueprint` method with a reference to the
  Blueprint instance as an argument.
```py
from flask import Flask
import routes # assuming we have routes module in this directory

app = Flask()
# (other flask app configuration)

# The routes module has an admin submodule, which we are referencing the bp from
app.register_blueprint(routes.admin.bp)
```

3. Use the Flask Blueprint to make routes
- Where we defined the Blueprint, we can use the `@<<blueprint-name>>.route`
  decorator exactly like we would use it on the app in our main file
```py
# In the routes/admin.py
from flask import Blueprint

bp = Blueprint('admin', __name__, url_prefix='/admin')

# This route is now /admin/dashboard because it uses the
# url_prefix="/admin" from the Blueprint registration as
# the beginning of the route and, then, adding the route
# registered, /dashboard, to it.
@bp.route('/dashboard', methods=('GET', 'POST'))
def admin_dashboard():
    # Do stuff to show the dashboard
```

#### Flask Sessions
1. Configure and use sessions in Flask
- We can use sessions to track data for a specific user across request/response
  cycles.
- We must have a `SECRET_KEY` set up to use sessions
- Import `session` from the `flask` packages, then we can utilize the session
  object to read, write, and delete data.
- We can use `in` to check if a key exists.
- We can assign a value by using `session['key-name'] = ***`
- We can get a value currently in a key with `session.get('key-name')`
- We can delete a value at a key with `session.pop('key-name', None)`
```py
from flask import Flask, session # More things, if you need them

app = Flask()

# other configuration of the Flask application object

@app.route('/visits-counter/')
def visits():
    if 'visits' in session:
        # reading and updating session data
        session['visits'] = session.get('visits') + 1
    else:
        # setting session data
        session['visits'] = 1
    return "Total visits: {}".format(session.get('visits'))

@app.route('/delete-visits/', methods=["POST"])
def delete_visits():
    session.pop('visits', None) # delete visits
    return 'Visits deleted'
```


## Class/Instance Variables in Python and SQLAlchemy (W18D3) - Learning Objectives

### Class and Instance Variables
1. Describe the difference between instance and class variables
- Instance variables are specific to each instance of the class.
- Class variables are shared across instances. Each instance points to the same
  class variables, so updating the value means each instance points to the same
  updated value.

2. Define a class variable
- A class variable is defined by assigning it at the top level of the class
```py
class Book:
  loan_duration = 14 # This is a class variable

  def __init__(self, title, series, author):
    # These are all instance variables
    self._title = title
    self._series = series
    self._author = author
    self._checked_out_on = None
```

3. Describe how Python performs attribute name lookups
- Python first looks for the instance variable with the name that we are
  referencing.
- If it is not found on the instance, it looks for a class variable with the
  name.
- If it is still not found, it throws an AttributeError
- Doing an assignment that uses a class variable name on an instance instead of
  the class will instead create an instance variable with the name. This means
  that the class variable will not be updated and future references to that name
  on the instance will point to the instance variable
```py
sorcerers_stone = Book("Harry Potter and the Sorcerer's Stone", "Harry Potter", "J.K. Rowling")

print(Book.loan_duration)             # 14
print(sorcerers_stone.loan_duration)  # 14

sorcerers_stone.loan_duration = 7
print(Book.loan_duration)             # 14
print(sorcerers_stone.loan_duration)  # 7
```

4. Understand the purpose of the `__slots__` class variable
- Adding a `__slots__` class variable does a couple of things for us:
    - It optimizes the creation of class instances by pre-allocating space in
      memory for each instance variable with a name listed in the `__slots__`
      list.
    - It also restricts us from creating any other instance variables that were
      not passed in to this list. This can be useful for preventing us from
      accidentally creating an instance variable when we meant to interact with
      a class variable of the same name.

```py
# Trying to add variable not listed in __slots__
class Person:
    __slots__ = ["name", "age"]
    def __init__(self, name, age):
        self.name = name
        self.age = age
p1 = Person("Bob Smith", 44)
p1.favorite_color = "red"  # AttributeError: 'Person' object has no attribute 'favorite_color'


# Adding a variable listed in __slots__ later on
class Person:
    __slots__ = ["name", "age", "favorite_color"]
    def __init__(self, name, age):
        self.name = name
        self.age = age
p1 = Person("Bob Smith", 44)
p1.favorite_color = "red"  # No error


# Adding a variable listed in __slots__ later on
class Person:
    __slots__ = ["name", "age"]
    favorite_color = "blue"
    def __init__(self, name, age):
        self.name = name
        self.age = age
p1 = Person("Bob Smith", 44)
print(Person.favorite_color)  # blue
print(p1.favorite_color)  # blue
p1.favorite_color = "red"  # AttributeError: 'Person' object attribute 'favorite_color' is read-only
Person.favorite_color = "red"  # No error
```

5. Describe the difference between instance, class, and static methods
- An instance method is invoked on an instance of a class. It takes in a
  reference to the instance implicitly (conventionally called `self` in the
  method definition).
- A class method is invoked on the class itself (can be invoked on an instance,
  but is not needed). It takes in a reference to the class implicitly
  (conventionally called `cls` in the method definition). It cannot reference
  instance methods or variables unless they are being called on an instance that
  was passed explicitly as an argument.
- A static method are similar to class methods, but they do not take in a
  reference to the class implicitly. They are typically used to perform some
  function on a collection of instances that are passed in as arguments (filter
  them in some way, invoke some method on them all, etc.)

6. Use the `@classmethod` decorator to define a class method
- The `@classmethod` decorator is used before the method definition inside the
  class, with `cls` being passed in as the first argument of the method:
```py
@classmethod
def create_series(cls, series, author, *args):
    """
    Factory class method for creating a series of books.
    """
    return [cls(title, series, author) for title in args]
```

7. Use the `@staticmethod` decorator to define a static method
- The `@staticmethod` decorator is used before the method definition inside the
  class. No implicit arguments need to be captured.
```py
@staticmethod
def get_titles(*args):
    """
    Static method that accepts a variable number
    of Book instances and returns a list of their titles.
    """
    return [book._title for book in args]
```

### SQLAlchemy
#### Connection SQLAlchemy to PostgreSQL
1. Describe how to create an "engine" that you will use to connect to a
   PostgreSQL database instance
- Import `create_engine` from `sqlalchemy`
  - `from sqlalchemy import create_engine`
- Construct the database url
  - `postgresql://<<username>>:<<password>>@<<server>>/<<database>>`
  - e.g. `db_url =
    postgresql://sqlalchemy_test:password@localhost/sqlalchemy_test`
- Invoke `create_engine` with your url:
  - `engine = create_engine(db_url)`
- You should only make one engine for each database that you want to connect to

2. Describe how the `with engine.connect() as connection:` block establishes and
   cleans up a connection to the database
- Once we have our engine we can use `with engine.connect() as connection:` to
  set up a connection to our database.
- We can use `connection` within the block in order to execute SQL queries
- When we exit the block or an error occurs, the `with` keyword indicates that
  our context manager should run its `__exit__()` function, which in this case
  will close out our connection to the database.
- This block lets us avoid having to set up many `try`/`except`/`finally` blocks
  to make sure our connections are closed

3. Describe how to create a database session from an engine
- Import `sessionmaker` from `sqlalchemy.orm`
- Create a session factory by invoking the `sessionmaker` function with a `bind`
  kwarg set to your engine
- Create a session by invoking the session factory
```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

db_url = "postgresql://sqlalchemy_test:password@localhost/sqlalchemy_test"
engine = create_engine(db_url)

SessionFactory = sessionmaker(bind=engine)

session = SessionFactory()

# Do stuff with the session

engine.dispose()
```


#### SQLAlchemy Mappings
1. Create a mapping for SQLAlchemy to use to tie together a class and a table in
   the database
- Import the `declarative_base` function from `sqlalchemy.ext.declarative` and
  use it to create a `Base` class to base all of your other classes off of.
- Create a class with the name of the model we are trying to create that
  inherits from `Base`
- Create a class variable `__tablename__` equal to the name of the table in the
  database
- Import `Column` and `ForeignKey` from `sqlalchemy.schema` and any data types
  that you need for those columns from `sqlalchemy.types`
- Create class variables with the name of each column, setting them equal to the
  invocation of the `Column` function. Pass in to this function the data type.
  If the column is a primary key, pass in the kwarg `primary_key=True`. If the
  column is a foreign key, pass in `ForeignKey` invoked with the
  `<<table>>.<<column>>` that it links to.
- If your table has no associations, your model is complete and may look
  something like this:
```py
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String

Base = declarative_base()


class Owner(Base):
    __tablename__ = "owners"

    id = Column(Integer, primary_key=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    email = Column(String(255))
```
- To create a many-to-one relationship to another table, import `relationship`
  from `sqlalchemy.orm`
- Create a class variable with the name of the relationship you are creating.
  Set the variable equal to `relationship()` invoked with the name of class that
  it is being associated to as well as a `back_populates` kwarg with the name of
  the relationship from the opposite end. `back_populates` ensures that if we
  affect one side of the association, the other side is also affected.
```py
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String

Base = declarative_base()


class Owner(Base):
    __tablename__ = "owners"

    id = Column(Integer, primary_key=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    email = Column(String(255))

    ponies = relationship("Pony", back_populates="owner")


class Pony(Base):
    __tablename__ = "ponies"

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    birth_year = Column(Integer)
    breed = Column(String(255))
    owner_id = Column(Integer, ForeignKey("owners.id"))

    owner = relationship("Owner", back_populates="ponies")
```
- To create a many-to-many relationship, add `Table` to your imports from
  `sqlalchemy.schema`. This will be used to tell SQLAlchemy about the join table
  that our database is using to connect our two models. We don't need to create
  a model just for the join, since it doesn't actually represent anything of
  substance that we need to interact with directly.
- Create an instance of the `Table` class with the name of the join table. Pass
  in to the constructor of this instance the name of the join table, the
  `Base.metadata` from the `Base` that we are using as a parent for all of our
  models, and the columns for each foreign key on the join table.
- To utilize this join table in our relationships, we use the same
  `relationship` function that we used for our many-to-one associations, but we
  add in another kwarg, `secondary`, that points to the `Table` instance we just
  created
```py
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

Base = declarative_base()

pony_handlers = Table(
    "pony_handlers",
    Base.metadata,
    Column("pony_id", ForeignKey("ponies.id"), primary_key=True),
    Column("handler_id", ForeignKey("handlers.id"), primary_key=True))

# Owner declaration...

class Pony(Base):
    __tablename__ = "ponies"

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    birth_year = Column(Integer)
    breed = Column(String(255))
    owner_id = Column(Integer, ForeignKey("owners.id"))

    owner = relationship("Owner", back_populates="ponies")
    handlers = relationship("Handler",
                            secondary=pony_handlers,
                            back_populates="ponies")


class Handler(Base):
    __tablename__ = "handlers"

    id = Column(Integer, primary_key=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    employee_id = Column(String(12))

    ponies = relationship("Pony",
                          secondary=pony_handlers,
                          back_populates="handlers")
```

#### Create, Update, and Delete with SQLAlchemy
1. Add data to the database, both single entities as well as related data
- To create a new record in the database, we first create a new instance of the
  model class. If the model has associated entities we can pass the related
  entity directly as the relationship instead of having to pass a foreign key.
```py
you = Owner(first_name="your first name",
            last_name="your last name",
            email="your email")

your_pony = Pony(name="your pony's name",
                 birth_year=2020,
                 breed="whatever you want",
                 owner=you)
```
- In order to save the records to the database, we add the instances to the
  session, then commit our additions.
```py
session.add(you)      # Connects you and your_pony objects
session.commit()      # Saves data to the database
```
- We only had to add `you` to the session because our relationships by default
  are added in to be updated on save (part of the default values for `cascade`,
  discussed below).

2. Update data in the database
- When we have a reference to an instance of a model, we can change the values
  of its attributes, then commit out changes.
```py
print(your_pony.birth_year)    # > 2020
your_pony.birth_year = 2019
print(your_pony.birth_year)    # > 2019
session.commit()
```

3. Delete data from the database (including cascades!)
- We can delete a record by passing a reference to the model instance to the
  `delete` method of the session, then committing our changes
```py
session.delete(you)
session.commit()
```
- If the record that we are trying to delete is associated with another record,
  one of two things will occur:
  - If the foreign key is allowed to be null in the associated table, our record
    will be deleted and the associated foreign key will be set to null.
  - If the foreign key is required in the associated table, SQLAlchemy will
    raise an IntegrityError
- In order for use to automatically delete an associated record that depended on
  us as a foreign key, we need to specify this functionality in the `cascade`
  kwarg of our relationship, discussed below.

4. Know how to use and specify the "delete-orphan" cascading strategy
- To allow for deleting a record triggering the deletion of associated records
  that depended on it instead of raising IntegrityErrors, we can provide a new
  value to the `cascade` kwarg while defining our relationship.
- By specifying `cascade="all, delete-orphan"` as an argument to our
  `relationship`, we tell SQLAlchemy to delete the associated record when we
  delete this one:
```py
class Owner(Base):
    __tablename__ = 'owners'

    id = Column(Integer, primary_key=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    email = Column(String(255))

    # When we delete this owner, we also delete the associated ponies that were owned
    ponies = relationship("Pony",
                          back_populates="owner",
                          cascade="all, delete-orphan")
```

5. One helpful thing to note is that we can `rollback` changes to our records to
   our previous commit, or to what it is in the database if no previous commit
   exists:
```py
print(your_pony.birth_year)    # > 2020
your_pony.birth_year = 2019

session.commit()

print(your_pony.birth_year)    # > 2019

your_pony.name = "Mr. Fancy Pants"
your_pony.birth_year = 1896
print(your_pony.name)          # > Mr. Fancy Pants
print(your_pony.birth_year)    # > 1896

session.rollback()
print(your_pony.name)          # > your pony's original name
print(your_pony.birth_year)    # > 2019
```

#### Querying Data with SQLAlchemy
1. Describe the purpose of a `Query` object
- The query object allows us to build up a SQL query by applying filters at
  runtime.
- The query object that we create simply specifies the `SELECT` and `FROM`
  clauses of a SQL query. The query is not executed until we invoke a method to
  receive the results, such as `all()`, `first()`, `one()`, or `one_or_none()`,
  discussed below (#5)

2. Use a `Session` object to query the database using a model
- Using the `query` function on our `session`, we can pass in a reference to our
  model in order to set up the base of a query that retrieves all fields from
  the table:
```py
pony_query = session.query(Pony)

print(pony_query)
# Prints the associated SQL query:
# SELECT ponies.id AS ponies_id,
#        ponies.name AS ponies_name,
#        ponies.birth_year AS ponies_birth_year,
#        ponies.breed AS ponies_breed,
#        ponies.owner_id AS ponies_owner_id
# FROM ponies
```
- If we do not want all of our attributes returned, we can specify what exactly
  we want in our query arguments:
```py
owner_query = session.query(Owner.first_name, Owner.last_name)
print(owner_query)
# Prints the associated SQL query:
# SELECT owners.first_name AS owners_first_name,
#        owners.last_name AS owners_last_name
# FROM owners
```
- We can get a reference to a record in our database by primary key using the
  `get` method on our query, passing in the primary key
```py
pony_id_3_query = session.query(Pony).get(3)
print(pony_id_3_query.breed) # Hirzai
```

3. How to order your results
- To order our results, we can tack on an `order_by(<<attribute>>)` to our query
```py
# Default ascending ordering
owner_query = session.query(Owner.first_name, Owner.last_name)
                     .order_by(Owner.last_name)
# OR descending
owner_query = session.query(Owner.first_name, Owner.last_name)
                     .order_by(Owner.last_name.desc())
```

4. Use the `filter` method to find just what you want
- We can add a `filter(<<attribute>> <<filter operation>> <<value>>)` on to our
  query to filter the results.
- Common operations include:

| Comparison | Description                  | Example                                                 |
|:---------- |:---------------------------- |:------------------------------------------------------- |
| `==`       | Equal to                     | `.filter(Pony.name == "Lucky Loser")`                   |
| `!=`       | Not equal to                 | `.filter(Pony.name != "Lucky Loser")`                   |
| `>`, `>=`  | Greater than (or equal to)   | `.filter(Pony.birth_year < 2019`                        |
| `<`, `<=`  | Less than (or equal to)      | `.filter(Pony.birth_year > 2010`                        |
| `.like`    | Like                         | `.filter(Pony.name.like("Lucky%"))`                     |
| `.ilike`   | Case-insensitive like        | `.filter(Pony.name.like("lucky%"))`                     |
| `.in_`     | Value in a list              | `.filter(Pony.age.in_([2018, 2019, 2020]))`             |
| `.notin_`  | Value not in a list          | `.filter(Pony.age.notin_([2018, 2019, 2020]))`          |
| `.is_`     | Comparison for `IS NULL`     | `.filter(Pony.name.is_(None))`                          |
| `.isnot_`  | Comparison for `IS NOT NULL` | `.filter(Pony.name.isnot_(None))`                       |
| `.or_`     | `OR` together filters        | `.filter(or_(Pony.name == "Bob", Pony.name == "Blob"))` |

- For example:
```py
pony_query = session.query(Pony)
                    .filter(Pony.name.ilike("%u%"))
                    .filter(Pony.birth_year < 2015)
```

5. Use instance methods on the `Query` object to return a list or single item
- The four most common methods we use to execute a query and return records are
  - all: returns a list of all records that match the query
  - first: returns the first record that matches the query as an instance of the
    model
  - one: returns the single record that matches the query as an instance of the
    model. If zero or more than one record matches, an exception is raised
  - one_or_none: returns the single record that matches the query as an instance
    of the model, or None if there were no matches. If more than one record
    matches, an exception is raised
- For example:
```py
ponies = pony_query.all()
for pony in ponies:
    print(pony.name)

# Using the query as an iterator will automatically trigger all() as well
for pony in pony_query:  # Implicit call to .all()
    print(pony.name)
```

6. Use the `count` method to ... count
- We can invoke `count()` on a query to return the number of matching records
  instead of records themselves
```py
pony_query = session.query(Pony).filter(Pony.name.ilike("%u%"))
print(pony_query.count())
```

#### Querying Across Joins in SQLAlchemy
1. Query objects with criteria on dependant objects
- In order to filter a query based on related data, we can join the relation on
  the query before filtering
```py
# Returns all Owner records that own a Pony with breed 'Hirzai'
hirzai_owners = session.query(Owner) \
                       .join(Pony)  \
                       .filter(Pony.breed == "Hirzai")                      
```

2. Lazily load objects
- When we have an instance of a model, we can get the associated records' data
  as well by accessing its attributes.
- We generate a new query to get the extra data each time we try to access an
  associated record
```py
for owner in session.query(Owner):
    print(owner.first_name, owner.last_name)
    for pony in owner.ponies:
        print("\t", pony.name)
# Four queries are executed:
#   - getting the owners
#   - for each of the three owners returned, getting the associated ponies
```

3. Eagerly load objects
- To combine our queries, we can use the `joinedload` function from the
  `sqlalchemy.orm` module.
- We create a new query that joins the two tables by invoking
  `options(joinedload(<<model>>.<<association>>))` on our query:
```py
from sqlalchemy.orm import joinedload

owners_and_ponies = session.query(Owner).options(joinedload(Owner.ponies))
for owner in owners_and_ponies:
    print(owner.first_name, owner.last_name)
    for pony in owner.ponies:
        print("\t", pony.name)
```

#### Using SQLAlchemy with Flask
1. Install the Flask-SQLAlchemy extension to use with Flask
- Use `pipenv` to install `Flask-SQLAlchemy`
```bash
# Adding to existing project
pipenv install Flask-SQLAlchemy

# Starting a new project
pipenv install Flask psycopg2-binary SQLAlchemy \
               Flask-SQLAlchemy \
               --python "$PYENV_ROOT/versions/«version»/bin/python"
```

2. Configure SQLAlchemy using `Flask-SQLAlchemy`
- To configure SQLAlchemy with `Flask-SQLAlchemy`, we add the key
  `SQLALCHEMY_DATABASE_URI` to our `app.config` dictionary.
- This key uses the standard database connection url we are used to:
  - `postgresql://<<username>>:<<password>>@<<server>>/<<database>>`
- If we are following our standard configuration steps, we can simply add this
  key in to our `Configuration` class:
```py
# config.py
class Configuration():
    SECRET_KEY = 'asdf'
    SQLALCHEMY_DATABASE_URI = 'postgresql://sqlalchemy_test:password@localhost/sqlalchemy_test'


# app's __init__.py, or wherever our Flask app is made
from .config import Configuration
app = Flask(__name__)
app.config.from_object(Configuration)
```

3. Use the convenience functions and objects `Flask-SQLAlchemy` provides you to
   use in your code.
- We no longer need to make an engine, instead creating a SQLAlchemy object,
  passing in our Flask app:
```py
from config import Config
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
```
- Instead of creating a `Base` class, we can use the `db.Model` attribute, which
  wraps up a generated instance for us. All of our data types and the `Column`,
  `relationship`, `ForeignKey`, etc., functions are also added to `db` for our
  convenience in model mapping, saving us from having to import them. Using
  `db.Model` as the base will also automatically try to convert our class name
  into a `__tablename__` for us, but we can still specify it if we'd like:
```py
# With our convenience attributes from using Flask-SQLAlchemy
from app import db

class Owner(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Columndb.(String(255))
    last_name = db.Column(db.String(255))
    email = db.Column(db.String(255))

    ponies = db.relationship("Pony", back_populate="owner")


# Without these convenience attributes
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer, String

Base = declarative_base()

class Owner(Base):
    __tablename__ = 'owners'

    id = Column(Integer, primary_key=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    email = Column(String(255))

    ponies = relationship("Pony", back_populates="owner")
```
- Flask-SQLAlchemy adds a `query` method directly to the model instead of having
  to interact with a session:
  - `pony = Pony.query.get(4)`
- When using these queries in a route, we can easily return a 404 if our data
  was not found by using either `get_or_404` or `first_or_404` methods on the
  query:
```py
@app.route("/pony/<int:id>", method=["GET"])
def show_pony(id):
    pony = Pony.query.get_or_404(id)
    return jsonify(pony)
```
- Flask-SQLAlchemy automatically makes a `Session` instance for us on each
  request. We can access this session in order to add, delete, and/or commit by
  keying in to `db.session`:
```py
@app.route("/pony/<int:id>", method=["PUT"])
def update_pony(id):
    pony = Pony.query.get(id)
    for key, value in request.form:
        setattr(pony, key, value)
    db.session.commit()


@app.route("/pony/<int:id>", method=["DELETE"])
def delete_pony(id):
    pony = Pony.query.get(id)
    db.session.delete(pony)
    db.session.commit()
```


## Alembic and Pug (W18D4) Learning Objectives

### Migrations with Alembic
1. Install Alembic into your project
- Alembic is a Python package, so we install it in the same way as usual with
  pipenv
- We must also have a database package to work with. While psycopg is not the
  only one, it is what we've been using and will continue to use, so it's
  included here as well:
- `pipenv install alembic psycopg2-binary`

2. Configure Alembic to talk to your database and not have silly migration names
- The alembic command line tool as a function that will generate many necessary
  files automatically for you:
```bash
pipenv run alembic init <directory-name-to-add-config-and-migration-files>
#  Many developers will just use 'alembic' as the directory name, so it becomes
pipenv run alembic init alembic
#  or if you are inside your pipenv shell
alembic init alembic
```
- One configuration setting that you will want to change is how alembic names
  its migration files.
  - In `alembic.ini`, the `file_template` variable (default commented out) shows
    how the files will be named.
  - Replace that line with something more meaningful, such as the following,
    which adds a timestamp before the name of the migration:
    - `file_template =
      %%(year)d%%(month).2d%%(day).2d_%%(hour).2d%%(minute).2d%%(second).2d_%%(slug)s`
  - After making this change, you'll easily be able to see the order that
    migrations will run in.
- Another configuration that we need to take care of is making sure alembic
  pulls in our database url from an environment variable instead of trying to
  use a hardcoded value (which would generally be a bad idea since (1) it will
  be checked in to version control and (2) it will probably change based on our
  environment (ie development vs production))
  - In `env.py`, import os so that we can access the environment variables:
    - `import os`
  - Before the declaration of `run_migrations_offline`, set up our config option
    to read `DATABASE_URL` for our `sqlalchemy.url` value:
    - `config.set_main_option("sqlalchemy.url", os.environ.get("DATABASE_URL"))`
  - Be sure to use the DATABASE_URL environment variable with the appropriate
    url (most likely adding it to a `.env` file)
    - example:
      `DATABASE_URL=postgresql://alembic_test:alembic_test@localhost/alembic_test`

3. Control Alembic's ability to migrate your database
  - Alembic uses the term `revision` for what we know of as migrations
  - To generate a revision, use the `revision` command from `alembic`, adding on
    a message about the revision with the `-m` flag:
    - `(pipenv run) alembic revision -m"create the owners table"` (pipenv run)
      is needed if we aren't inside the shell
  - A file is generated in the `versions` folder for this new revision. We can
    add in whatever code we want to run on migration to the `upgrade` function,
    typically creating a table and defining the columns:
  ```py
  def upgrade():
      op.create_table(
          "owners",
          sa.Column("id", sa.Integer, primary_key=True),
          sa.Column("first_name", sa.String(50), nullable=False),
          sa.Column("last_name", sa.String(50), nullable=False),
          sa.Column("email", sa.String(255), nullable=False),
      )
  ```
  - We can also specify what to do when we undo a migration by filling out the
    `downgrade` function, typically dropping the table:
  ```py
  def downgrade():
      op.drop_table("owners")
  ```
  - With our migrations created, we can tell alembic that we want to run them
    with the `alembic upgrade <revision>` command, where `<revision>` is one of
    the following:
    - `head`: run all revisions that haven't been applied yet
    - `+n`: run n number of revisions from the currently applied one (eg
      `alembic upgrade +1` to apply just the next revision)
    - `<revision number>`: run all of the revisions up to the specified revision
      number
  - We can see the history of our migrations with `alembic run history`. The
    output is similar to a git log, showing where we currently are (head) and
    the revision numbers and messages for each revision in the history.
  - Similar to upgrade for applying migrations, we can downgrade to rollback
    migrations. We use `alembic downgrade <revision>` with very similar options:
    - `base`: roll back all revisions
    - `-n`: roll back n number of revisions from the currently applied one
    - `<revision number>`: roll back all revisions back to the specified
      revision number

4. Reason about the way Alembic orders your migrations
- Alembic orders migrations through a linked list system.
- When we create a new migration (revision) we keep a reference to the previous
  one in the `down_revision` attribute.
- In order to undo a migration, Alembic runs its `downgrade`, then continues
  along the chain to the previous migration.

5. Handle branching and merging concerns
- If two different revisions are made separately (such as from different
  branches on a team project), the linked list nature of revisions gets
  interrupted. Each of the new revisions has a `down_revision` that points the
  same previous revision before branching. This means our histor looks like a
  tree instead of a linked list. Running an upgrade command to head will fail
  because there are two heads at this point.
- To fix this branching issue, we can tell alembic to merge our revision
  history.
- The command `alembic merge -m "<message>" <revision-number-1>
  <revision-number-2>` will tell alembic to make a new revision after the
  branching that combines the heads into one. The `down_revision` of this new
  revision that was created ends up being a tuple that points us to either
  branch.
- This process is best visualized:
```
                     -- ae1027a6acf (Team A's most recent)
                    /
<-- 1975ea83b712 <--
                    \
                     -- 27c6a30d7c24 (Team B's most recent)
```
```bash
pipenv run alembic merge -m "merge contracts and devices" ae1027 27c6a
```
```
                     -- ae1027a6acf <--
                    /                  \
<-- 1975ea83b712 <--                    -- 53fffde5ad5
                    \                  /
                     -- 27c6a30d7c24 <-
```
- After this merge process we can use our standard `alembic upgrade head` to add
  in both revisions that were previously branched.

### Using Alembic with Flask
1. Configuring a Flask application to use Alembic
- To use Alembic with our Flask app, we add in two packages, `alembic` itself,
  and `Flask-Migrate`, which integrates Alembic with Flask:
  - `pipenv install alembic Flask-Migrate`
- Make sure that Flask has all of its standard environment variables set up,
  including `FLASK_APP`, `FLASK_ENV`, and `DATABASE_URL` (we generally use this
  name for compatibility with other platforms, then pull it in to our Flask app
  as `SQLALCHEMY_DATABASE_URI`). Having an additional variable
  `SQLALCHEMY_TRACK_MODIFICATIONS` pointing to False will remove some warnings
  about the deprecated feature for you.
- We can create our models like usual with `SQLAlchemy`:
```py
# app/models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
```
- In our main application file, set up our Flask app and add in our config keys
  (this can be done multiple ways, as we saw previously). We can initialize our
  database with our app and then use `Migrate` from `flask_migrate` to configure
  our application to use Alembic:
```py
# app/__init__.py
from app.models import db
from flask import Flask
from flask_migrate import Migrate
import os

app = Flask(__name__)
# We could use a from_object and pass in a config class
# This is a simple way to add in the values directly in this file
app.config.from_mapping({
  'SQLALCHEMY_DATABASE_URI': os.environ.get('DATABASE_URL'),
  'SQLALCHEMY_TRACK_MODIFICATIONS': False,
})
# This is allowing us to create our db in another location, then initialize the app here
# It's an alternative to passing in the app to SQLAlchemy(), since we are invoking that function in our models file
db.init_app(app)
Migrate(app, db)  # Connects our app to be able to generate alembic migrations
```

2. Run commands to manage your database through the flask command
- Many commands that we could run working with alembic directly (as opposed to
  within a flask application) can be run with the `db` command added to `flask`
  from the `Flask-Migrate` extension. We can run our `init` command to create
  the configuration files that alembic uses.
  - `flask db init`
- This command creates a `migrations` directory at the top level of our
  application (similar to how we specified an `alembic` directory when
  previously working with it directly). This directory houses our configuration
  files and ultimately our revisions that will be generated.
- Since our database url will already be taken in by our Flask app, the only
  change that we still should make to these configuration files is changing the
  naming convention of our revision files.
  - In `alembic.ini` change the `file_template` (commented out by default) to
    something more useful, such as timestamping the file:
    - `file_template =
      %%(year)d%%(month).2d%%(day).2d_%%(hour).2d%%(minute).2d%%(second).2d_%%(slug)s`

3. Autogenerate migrations from your models
- With our configuration complete, we can create a new model as usual. For
  example:
```py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Owner(db.Model):
    __tablename__ = "owners"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False)
```
- With this model created, we can run the `migrate` command in order to
  automatically create a revision that has all of these column names/types,
  primary key indicator, etc., as well as a drop_table statement in our
  downgrade, no direct interaction with alembic or revisions at all!
  - `flask db migrate -m "create owners table` automatically generates a
    revision file with the functions completely filled out for you:
  ```py
  def upgrade():
      # ### commands auto generated by Alembic - please adjust! ###
      op.create_table('owners',
      sa.Column('id', sa.Integer(), nullable=False),
      sa.Column('first_name', sa.String(length=50), nullable=False),
      sa.Column('last_name', sa.String(length=50), nullable=False),
      sa.Column('email', sa.String(length=255), nullable=False),
      sa.PrimaryKeyConstraint('id')
      )
      # ### end Alembic commands ###


  def downgrade():
      # ### commands auto generated by Alembic - please adjust! ###
      op.drop_table('owners')
      # ### end Alembic commands ###
  ```
- With a revision created for us, we can invoke `upgrade` to apply those changes
  to our database:
  - ` flask db upgrade`
  - Note that this command automatically upgrades to the lates revision (head)

4. Why use Alembic instead of just creating a model and running our
   `db.drop_all()` and `db.create_all()`?
- Alembic lets us build up changes to our database over time. We can roll back
  to a specific revision to interact with a previous version of our database
  schema.
- Modifying tables is extremely simple. Since we can only drop all and create
  all with the SQLAlchemy `db`, we have to completely rebuild our database with
  each change. If we want to preserve data, we would have to pull it out,
  implement our change, then insert the old data back in (potentially having to
  modify each record to accomodate the changes).

### Using Pug with Flask
1. Install, configure, and use Pug with Flask
- We can use many template engines with Flask, not just the standard Jinja!
- To use Pug, we just need to install `pypugjs` into our application, then add
  it as an extension to our app:
  - `pipenv install pypugjs`
```py
# app/__init__.py (wherever our Flask app is defined)
app = Flask(__name__)
app.jinja_env.add_extension('pypugjs.ext.jinja.PyPugJSExtension')
```
- In our routes, we can use the same `render_template` function, pointing to the
  pug file that we want to render from our `templates` directory:
```py
@app.route("/")
def index():
    return render_template("index.pug", title="Hello, Pug")
```
