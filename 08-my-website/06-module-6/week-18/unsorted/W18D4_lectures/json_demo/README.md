# JSON Lecture

You'll need a database, user, and password, and a .env file.

Here's what my .env file looked like.

```
FLASK_ENV=development
SECRET_KEY=p023jrpq834jrp8q934q09832rp8aerf
DATABASE_URL=postgresql://vet_app:password@localhost/petrack
```

Once you have the database created, you can run `python database.py`
to create the tables and populate them with seed data.

