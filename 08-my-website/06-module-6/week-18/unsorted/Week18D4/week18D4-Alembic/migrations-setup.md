# Migrations with Alembic


## Step 1:
1. create a user in psql with a password
2. create a database and assign the new user as an owner

  Which of the three can you use to set up a database with alembic?
  > a) use alembic.createdb

  > b) db = alembic()

  > c) psql

### Answer:
> psql: remember, alembic cannot create databases with any command so one
  must be created manually.



## Step 2:
1. Set up a local directory to work
2. pipenv shell to enter your virtual environment
3. pipenv install alembic
4. pipenv install psycopg2-binary (we can also combine step
   and 4 like so: pipenv install alembic psycopg2-binary)
   note: we install psycopg2-binary because it does not install
   a compiler or external libraries not needed in development

## Step 3:
  How do we initialize alembic?
  > a) pipenv run alembic <directory-name>

  > b) pipenv alembic start <directory-name>

  > c) pipenv run alembic init <directory-name>

### Answer:
  >pipenv run alembic init <directory-name>: this will initialize a
  directory within your project root directory called alembic by convention
  
   ```Python
  .                       # root project directory we made in step 2
  ├── .venv               # .venv directory from creating a virtual environment
  ├── alembic/            # alembic directory
  │   ├── README          # not needed can be removed
  │   ├── env.py          # where we configure the environment
  │   ├── script.py.mako  # template Alembic uses to generate migrations
  │   └── versions/       # migrations created stored here
  └── alembic.ini         # where script location is stored and where we
                           #can make the revision number readable
  ```

## Step 4:

Two or so lines after script location there is a commented out file_template variable commented out. This is where we format how the migration reads

uncomment it and change it to:

```Python 
file_template = %%(year)d%%(month).2d%%(day).2d*%%(hour).2d%%(minute).2d%%(second).2d\_%%(slug)s
```

More on this found in the Migrations With Alembic homework for Thursday (W18)

## Step 5:

Round line 38 in alembic.ini we can set the url to our database in development but since our production database url is way more than likely going to be different we will change that in the env.py file

## Step 6:

1. To conditionally set the database environment (production vs
   deployment) import os at the top of env.py
2. Right around line 28 in env.py we can add config.set_main_option("sqlalchemy.url", os.environ.get("DATABASE_URL")) which will set the database url based on what we define later in an env file.

How do we set environment variables in the terminal?

> a) env[DATABASE_URL]=postgresql://
alembic_test:alembic_test@localhost/alembic_test

>  b) set env to postgresql://alembic_test:alembic_test@localhost/
  alembic_test

>  c) export DATABASE_URL=postgresql://
  alembic_test:alembic_test@localhost/alembic_test

### Answer:
  > export DATABASE_URL=postgresql://
  alembic_test:alembic_test@localhost/alembic_test

What are migrations in alemic called?

>  a) migrations

>  b) revisions

>  c) alembic files

## Step 7:

Now we can run a "migration" using: pipenv run alembic revision -m "the message about the revision". If our table is owners table we would run: pipenv run alembic revision -m "create the owners table". This populated in the versions directory within the alembic directory

## Step 8:

In the migration created in 'versions' you will see upgrade and downgrade methods.

What does the upgrade method do?

### Answer
> runs when we apply the migrations: This will create the owners table

What does the downgrade method do?

### Answer
>  runs when we undo the migrations: This will drop the owners table

- notice the revision numbers in the migrations. The previous files revision number is the next files down revision number. This is how alembic keeps track of what is going on!

## Step 9:

Finally to apply the revisions we can run:
pipenv run alembic upgrade head for all revisions

You can also run pipenv run alembic upgrade +n for n number of revisions or simply enter the revision number like pipenv run alembic upgrade <revision number>

similarly with downgrades we can run:
pipenv run alembic downgrade base for all revisions
pipenv run alembic downgrade -n for n number of revisions
pipenv run alembic downgrade <revision number>
