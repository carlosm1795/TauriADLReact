// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod repository;
mod models;

use repository::mongodb_repo::MongoRepo;
use repository::MongoTest::MongoTesting;
use models::user_model::{User,LatestName, Ceremonias};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,get_information,get_information_names,get_Ceremonias])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn get_information() -> Vec<User> {
    let db = MongoRepo::init();
    let users = db.get_all_users();
    println!("Me ejecute");
    println!("{:?}", users);
    let mut resultado: Vec<User> = Vec::new();

    match users {
        Ok(v) => {
            for item in v.iter() {
                println!("This is the name: {}", item.name);
                let aux = User {
                    id: item.id,
                    name: item.name.to_owned(),
                    location: item.location.to_owned(),
                    title: item.title.to_owned(),
                };
                resultado.push(aux);
            }
        }
        Err(e) => println!("error parsing header: {e:?}"),
    }

    return resultado;
}

#[tauri::command]
async fn get_Ceremonias() -> Vec<Ceremonias> {
    let db = MongoRepo::init();
    let ceres = db.get_all_cer();
    let mut resultado: Vec<Ceremonias> = Vec::new();
    match ceres {
        Ok(value) =>{
            for item in value.iter() {
                let aux = Ceremonias{
                    _id: item._id,
                    Comentarios: item.Comentarios.to_owned(),
                    NombreCeremonia: item.NombreCeremonia.to_owned()
                };
                resultado.push(aux);
            }
        }
        Err(e) => println!("error parsing header: {e:?}"),
    }
    return resultado;
}

#[tauri::command]
async fn get_information_names()-> Vec<LatestName>{
    println!("Ejecutandomoe desde get infomrmation");
    let db = MongoTesting::get_all_users().await;    
    return db;
    // let db2 = MongoRepo::init();
    // let data = db2.get_all_name().await;
}