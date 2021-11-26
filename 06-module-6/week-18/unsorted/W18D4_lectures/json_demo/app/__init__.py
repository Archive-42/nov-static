from flask import Flask
import app.routes as routes
import app.api_routes as api_routes
from .config import Configuration
from .models import db

app = Flask(__name__)
app.config.from_object(Configuration)
app.register_blueprint(routes.bp)
app.register_blueprint(api_routes.bp)
db.init_app(app)
