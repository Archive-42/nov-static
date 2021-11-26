from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length


class LoginForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired(), Length(min=6)])
    password = PasswordField("Password", validators=[DataRequired()])
    submit = SubmitField("Sign In")
