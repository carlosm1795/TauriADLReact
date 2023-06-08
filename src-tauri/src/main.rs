// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod repository;
mod models;

use repository::mongodb_repo::MongoRepo;
use models::user_model::User;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,get_information])
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