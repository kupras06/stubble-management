from bson import ObjectId

class MongoHelper:
    def str_to_bson(self,text:str) -> ObjectId :
        return ObjectId(text)

mongo_helper = MongoHelper()