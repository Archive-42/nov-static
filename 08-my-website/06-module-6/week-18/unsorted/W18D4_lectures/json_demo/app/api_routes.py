from flask import Blueprint, request
from .models import db, Owner, Pet

bp = Blueprint("api", __name__, url_prefix="/api")


@bp.route("/pets")
def get_pets():
    pets = Pet.query.order_by(Pet.name).all()
    data = [pet.to_dict() for pet in pets]
    return {"data": data}


@bp.route("/pets", methods=["POST"])
def create_pet():
    data = request.json
    data["owners"] = Owner.query.filter(Owner.id.in_(data["owner_ids"])).all()
    data.pop("owner_ids")
    pet = Pet(**data)
    db.session.add(pet)
    db.session.commit()
    return pet.to_dict()
