use mongodb::{ Client, IndexModel };
use mongodb::bson::{ doc, Document };
use mongodb::bson::oid::ObjectId;
use mongodb::options::{ CreateCollectionOptions, ValidationAction, ValidationLevel, FindOptions };
use rocket::futures::TryStreamExt;

use crate::models::user_model::{ User, LatestName, Personas, Ceremonias };

pub struct MongoTesting {
    col: String,
}

impl MongoTesting {
    pub async fn get_all_users() -> Vec<LatestName> {
        println!("Executing function");
        let client = Client::with_uri_str(
            "mongodb+srv://administrator:administrator@cluster0.knm4dm6.mongodb.net/"
        ).await.expect("Unable to connect to MongoDB");
        let db = client.database("testing");
        let col = db.collection::<Personas>("Personas");

        let pipeline = vec![
            doc! {
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
        }
        ];
        let post_by_tags: Vec<LatestName> = col
            .aggregate(pipeline, None).await
            .expect("Unable to aggregate posts")
            .with_type()
            .try_collect().await
            .expect("Unable to collect items from Cursor");
        return post_by_tags;
    }
}
