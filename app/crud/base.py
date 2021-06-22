from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union
from bson import ObjectId
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from app import schemas
from app.core.messages import message

ModelType = TypeVar("ModelType", bound=schemas.user.MongoBase)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        """
        CRUD object with default methods to Create, Read, Update, Delete (CRUD).
        **Parameters**

        * `model`: A SQLAlchemy model class
        * `schema`: A Pydantic model (schema) class
        """
        self.model = model

    async def get(self, db: Any, document:Dict):
        print('IN GET')
        result =  await db.find_one(document)
        # message.Json(result,f'Get {db.name} By {document} Result')
        return result

    async def get_multi(
        self, db: Any, doc : Any = None, skip: int = 0, limit: int = 100
    ) -> List[ModelType]:
        response = None
        print(doc)
        if doc:
            response = db.find(doc).limit(limit).skip(skip)
        else:
            response = db.find().limit(limit).skip(skip) 
        res = []

        print(response)
    
        async for user in response:
            res.append(self.model(**user))
        print('RES : ',res)
        return res

    def create(self, db: Any, *, obj_in: CreateSchemaType) -> ModelType:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data) 
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Any,
        *,
        db_obj: ModelType,
        obj_in: Union[UpdateSchemaType, Dict[str, Any]]
    ) -> ModelType:
        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Any, document:Dict) -> ModelType:
        
        obj = db.delete_one(document)
        return obj
