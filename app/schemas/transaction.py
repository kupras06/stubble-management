from typing import Optional
from bson import ObjectId
from pydantic import BaseModel, Field, BaseConfig
import datetime

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


class TransactionBase(BaseModel):
    user_id : PyObjectId
    stubble_id : PyObjectId

class TransactionUpdate(BaseModel):
    user_id : PyObjectId
    stubble_id : PyObjectId

    
class TransactionIn(TransactionBase):
    order_date : datetime.datetime = datetime.datetime.now()
    transaction_amt : float
    
class TransactionModel(MongoBase,TransactionIn):
    pass
    
