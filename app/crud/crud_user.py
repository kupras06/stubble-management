from app.core import messages
from typing import Any, Dict, Optional, Union

from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase
from app.schemas.user import UserBase,UserModel,UserSignUp,UserUpdate

# [UserBase, UserSignUp, UserUpdate]
class CRUDUser(CRUDBase[UserBase, UserSignUp, UserUpdate]):
    async def get_by_email(self, db: Any, *, email: str) -> Optional[UserBase]:
        print(email)
        user  =  await super().get(db,document={'email':email})
        if user:
            return UserModel(**user)
        return user

    async def create(self, db: Any, *, obj_in: UserSignUp) -> UserBase:
        db_obj = UserModel(
            email=obj_in.email,
            hashed_password=get_password_hash(obj_in.password),
            first_name=obj_in.first_name,
            last_name=obj_in.last_name,
        )
        result = await  db.insert_one(db_obj.dict())
        print(result.inserted_id)
        db_obj = await super().get(db,{'_id':result.inserted_id})
        res = UserModel(**db_obj)
        print('ID',res.id)
        return res


    def update(
        self, db: Any, *, db_obj: UserModel, obj_in: Union[UserUpdate, Dict[str, Any]]
    ) -> UserBase:
        
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        if update_data.get('old_password',None):
            hashed_password = get_password_hash(update_data["new_password"])
            del update_data["password"]
            update_data["hashed_password"] = hashed_password
        
        db.update_one({'_id':db_obj.id},{'$set' : {**update_data}})
        return super().get(db,{'_id':db_obj.id})

    async def authenticate(self, db: Any, *, email: str, password: str) -> Optional[UserBase]:
        user = await self.get_by_email(db, email=email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    def is_active(self, user: UserModel) -> bool:
        messages.message.Json(user)
        return user.is_active

    def is_superuser(self, user: UserModel) -> bool:
        return user.is_superuser
       

user = CRUDUser(UserModel)
