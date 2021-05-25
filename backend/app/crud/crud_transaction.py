from app.schemas import transaction
from typing import Any, Dict, Optional, Union

from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase
from app.schemas.transaction import TransactionBase, TransactionModel, TransactionUpdate


class CRUDTransaction(CRUDBase[TransactionModel, TransactionBase, TransactionUpdate]):
   
    async def create(self, db: Any, *, obj_in: TransactionBase) -> TransactionModel:
        result = await db.insert_one(obj_in.dict())
        print(result.inserted_id)
        db_obj = await db.find_one({'_id': result.inserted_id})
        res = TransactionModel(**db_obj)
        print('ID', res.id)
        return res

    def update(
        self, db: Any, *, db_obj: TransactionModel, obj_in: Union[TransactionUpdate, Dict[str, Any]]
    ) -> TransactionBase:

        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        if update_data["password"]:
            hashed_password = get_password_hash(update_data["password"])
            del update_data["password"]
            update_data["hashed_password"] = hashed_password

        db.update_one({'_id': db_obj.id}, {'$set': {**update_data}})
        return super().get(db, db_obj.id)


transaction = CRUDTransaction(TransactionModel)
