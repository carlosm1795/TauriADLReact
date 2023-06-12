use mongodb::{
    bson::{ doc, extjson::de::Error, oid::ObjectId, Document },
    results::{ InsertOneResult, UpdateResult, DeleteResult },
    sync::{ Client, Collection },
    options::{FindOptions}
};
use crate::models::user_model::{ User, LatestName, Personas, Ceremonias };
use rocket::tokio::stream;

pub struct MongoRepo {
    col: Collection<User>,
    per: Collection<Personas>,
    cer: Collection<Ceremonias>,
}

impl MongoRepo {
    pub fn init() -> Self {
        // let uri = String::from(
        //     "mongodb+srv://kusad:CsBy1mO9f70cc1Yc@cluster0.spbvxeh.mongodb.net/"
        // );                
        // let client = Client::with_uri_str(uri).unwrap();
        // let db = client.database("rustDB");
        // let col: Collection<User> = db.collection("User");
        // let per: Collection<Personas> = db.collection("Personas");

        let uri = String::from(
            "mongodb+srv://administrator:administrator@cluster0.knm4dm6.mongodb.net/"
        );
        let client = Client::with_uri_str(uri).unwrap();
        let db = client.database("testing");
        let col: Collection<User> = db.collection("User");
        let per: Collection<Personas> = db.collection("Personas");
        let cer: Collection<Ceremonias> = db.collection("Ceremonias");
        MongoRepo { col, per,cer }
    }

    pub fn create_user(&self, new_user: User) -> Result<InsertOneResult, Error> {
        let new_doc = User {
            id: None,
            name: new_user.name,
            location: new_user.location,
            title: new_user.title,
        };
        let user = self.col.insert_one(new_doc, None).ok().expect("Error creating user");

        Ok(user)
    }

    pub fn get_user(&self, id: &String) -> Result<User, Error> {
        let obj_id = ObjectId::parse_str(id).unwrap();
        let filter = doc! { "_id": obj_id };
        let user_detail = self.col
            .find_one(filter, None)
            .ok()
            .expect("Error getting user's detail");
        Ok(user_detail.unwrap())
    }

    pub fn update_user(&self, id: &String, new_user: User) -> Result<UpdateResult, Error> {
        let obj_id = ObjectId::parse_str(id).unwrap();
        let filter = doc! { "_id": obj_id };
        let new_doc =
            doc! {
            "$set":
                {
                    "id": new_user.id,
                    "name": new_user.name,
                    "location": new_user.location,
                    "title": new_user.title
                },
        };
        let updated_doc = self.col
            .update_one(filter, new_doc, None)
            .ok()
            .expect("Error updating user");
        Ok(updated_doc)
    }

    pub fn delete_user(&self, id: &String) -> Result<DeleteResult, Error> {
        let obj_id = ObjectId::parse_str(id).unwrap();
        let filter = doc! { "_id": obj_id };
        let user_detail = self.col.delete_one(filter, None).ok().expect("Error deleting user");

        Ok(user_detail)
    }

    pub fn get_all_users(&self) -> Result<Vec<User>, Error> {
        let cursors = self.col.find(None, None).ok().expect("Error getting list of users");
        let users = cursors.map(|doc| doc.unwrap()).collect();

        Ok(users)
    }   

    pub fn get_all_cer(&self) -> Result<Vec<Ceremonias>, Error> {
        let find_options = FindOptions::builder().sort(doc! { "_id": 1 }).build();
        let cursors = self.cer.find(None, find_options).ok().expect("Error getting list of users");
        let ceres = cursors.map(|doc| doc.unwrap()).collect();

        Ok(ceres)
    }   

    pub async fn get_all_name(&self) -> String{       
        let mut resultado: Vec<LatestName> = Vec::new(); 
        let pipeline = vec![doc!{
            "$unwind":      
              {
                "path": "$NombresEspeciales",
              },
        },
        
        doc! {
            "$match":
              {
                "NombresEspeciales.TipoDeNombre": 1,
              },
        },
        doc! {
                "$sort":      
              {
                "NombresEspeciales.FechaRecibido": -1,
              },
        },
        doc! {
            "$group":  
              {
                "_id": {
                  "id": "$_id",
                  "NombreTerrenal": "$NombreTerrenal",
                },
                "NombresEspeciales": {
                  "$push": "$NombresEspeciales",
                },
              },
        }];
                    
        let data = self.per.aggregate(pipeline,None).map_err(|e| println!("{}", e));
        match data {
            Ok(mut cursor) => {
                while let Some(doc) = cursor.next() {
                    println!("{:?}", doc);            
                }
            },
            Err(e) => println!("{:?}", e),
        }
        return "Hola".to_string();
    }
}

