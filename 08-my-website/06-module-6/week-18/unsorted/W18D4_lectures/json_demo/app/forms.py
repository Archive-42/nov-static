from flask_wtf import FlaskForm
from wtforms import (
    BooleanField, IntegerField, SelectMultipleField, SelectField, StringField
)
from wtforms.validators import DataRequired, Email


class PetForm(FlaskForm):
    age = IntegerField("Age", [DataRequired()])
    has_microchip = BooleanField("Has microchip?")
    name = StringField("Name", [DataRequired()])
    pet_type_id = SelectField("Pet type", [DataRequired()], coerce=int)
    owner_ids = SelectMultipleField("Owners", [DataRequired()], coerce=int)


class OwnerForm(FlaskForm):
    first_name = StringField("First name", [DataRequired()])
    last_name = StringField("Last name", [DataRequired()])
    email = StringField("Email", [DataRequired(), Email()])
