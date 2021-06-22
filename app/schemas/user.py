from typing import Optional
from bson import ObjectId
from pydantic import BaseModel, EmailStr,Field, BaseConfig


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
        # print("IN CONST",self.id,pydict.get('_id'))

class UserModel(MongoBase):
    first_name : str 
    last_name : str 
    email: EmailStr
    address : Optional[str]
    city : Optional[str]
    pin_code : Optional[int]
    state  : Optional[str]
    country : Optional[str]
    phone_number : Optional[str]
    hashed_password : str 
    is_superuser : bool = False
    is_active : bool = True
    ROLE : str = 'Farmer'
    
    class Config :
        anystr_strip_whitespace = True  # strip whitespaces from strings

# Shared properties
class UserBase(MongoBase):
    first_name : str 
    last_name : str 
    email : EmailStr
    ROLE : str
    

class UserBaseIn(BaseModel):
    first_name : str 
    last_name : str 
    email : EmailStr
    ROLE : str

class UserSignUp(UserBaseIn):
    password : str 
    # class Config :
        # anystr_strip_whitespace = True  # strip whitespaces from strings

# Properties to receive via API on creation
class UserLogin (BaseModel):
    email: EmailStr
    password: str
    class Config :
        anystr_strip_whitespace = True  # strip whitespaces from strings


# Properties to receive via API on update
class UserUpdate(BaseModel):
    first_name : str 
    last_name : str 
    email: EmailStr
    address : Optional[str]
    city : Optional[str]
    pin_code : Optional[int]
    state  : Optional[str]
    country : Optional[str]
    phone_number : Optional[str]
   
class UserUpdatePassWord(BaseModel):
    old_password : str
    new_password : str
