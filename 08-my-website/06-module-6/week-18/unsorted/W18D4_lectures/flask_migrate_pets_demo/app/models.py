from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Dog(db.Model):
    __tablename__ = 'dogs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    color = db.Column(db.String(20), nullable=False)


class Cat(db.Model):
    __tablename__ = 'cats'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    color = db.Column(db.String(20), nullable=False)
    is_mean = db.Column(db.Boolean, default=True, nullable=False)
