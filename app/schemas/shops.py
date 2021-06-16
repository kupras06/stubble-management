from typing import List, Optional
from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field, BaseConfig

from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field, BaseConfig
from .styles import *

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class MongoBase(BaseModel):
    id: Optional[PyObjectId] = Field(alias='_id')

    class Config(BaseConfig):
        orm_mode = True
        allow_population_by_field_name = True
        json_encoders = {
            ObjectId: str
        }

    def __init__(self, **pydict):
        super().__init__(**pydict)
        self.id = pydict.get('_id')
        print("IN CONST", self.id, pydict.get('_id'))


class ShopBase(BaseModel):
    name: str
    email: EmailStr
    address: str
    city: str
    pin_code: str
    state: str
    country: Optional[str] = 'India'
    phone_number: str
    owner_id: PyObjectId
    # options : Optional[List[StyleModel]]

    class Config:
        anystr_strip_whitespace = True  # strip whitespaces from strings

class ShopModel(ShopBase, MongoBase):
    class Config:
        orm_mode = True


class ShopUpdate(ShopModel):
    pass
