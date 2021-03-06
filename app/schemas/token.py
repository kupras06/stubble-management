from typing import Optional
from bson import ObjectId
from pydantic import BaseModel,Field,BaseConfig

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
        print("IN CONST",self.id,pydict.get('_id'))


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenPayload(BaseModel):
    sub:  Optional[PyObjectId] = Field(default_factory=PyObjectId )
