use mongodb::bson::{oid::ObjectId,DateTime};
use serde::{Serialize, Deserialize};
use std::u32;

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub name: String,
    pub location: String,
    pub title: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Personas {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<u32>,
    pub NombreTerrenal: String,
    pub FechaNacimiento: DateTime,
    pub NombresEspeciales: Vec<NombreEspecial>
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NombreEspecial {
    pub TipoDeNombre:u32,
    pub NombreEspecial: String,
    pub FechaRecibido: DateTime,
    pub Notas: String
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CustomId {
    pub id:u32,
    pub NombreTerrenal:String
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LatestName {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<CustomId>,
    pub NombresEspeciales:Vec<NombreEspecial>
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Ceremonias {
    pub _id:u32,
    pub NombreCeremonia:String,
    pub Comentarios:String
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Velas {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id:Option<String>,
    pub Nombre:String
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Santuarios {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id:Option<u32>,
    pub Nombre:String,
    pub Comentarios:String
}