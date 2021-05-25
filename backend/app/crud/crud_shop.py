# from typing import Any, Dict, Optional, Union

# from app.core.security import get_password_hash, verify_password
# from app.crud.base import CRUDBase
# from app.schemas.shops import ShopBase, ShopModel, ShopUpdate


# class CRUDShop(CRUDBase[ShopModel, ShopBase, ShopUpdate]):
#     async def get_by_email(self, db: Any, *, email: str) -> Optional[ShopBase]:
#         print(email)
#         user = await db.find_one({'email': email})
#         if user:
#             return ShopModel(**user)
#         return user

#     async def create(self, db: Any, *, obj_in: ShopBase) -> ShopModel:
#         result = await db.insert_one(obj_in.dict())
#         print(result.inserted_id)
#         db_obj = await db.find_one({'_id': result.inserted_id})
#         res = ShopModel(**db_obj)
#         print('ID', res.id)
#         return res

#     def update(
#         self, db: Any, *, db_obj: ShopModel, obj_in: Union[ShopUpdate, Dict[str, Any]]
#     ) -> ShopBase:

#         if isinstance(obj_in, dict):
#             update_data = obj_in
#         else:
#             update_data = obj_in.dict(exclude_unset=True)
#         if update_data["password"]:
#             hashed_password = get_password_hash(update_data["password"])
#             del update_data["password"]
#             update_data["hashed_password"] = hashed_password

#         db.update_one({'_id': db_obj.id}, {'$set': {**update_data}})
#         return super().get(db, db_obj.id)


# shop = CRUDShop(ShopModel)
