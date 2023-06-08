'use client';
import React,{useState} from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { Button } from '@mantine/core';

const Ceremonias = () => {
    const [personas, setPersonas] = useState([])
    const getInformation = () => {
        console.log("Ejecutando");
        setPersonas([])
        invoke("get_information").then((information: any) => {
          setPersonas(information)
        }).catch(console.error)
      }
  return (
    <div>Ceremonias asd asd asdas asd as
        <Button onClick={getInformation}>Get Information</Button>
        {
          personas.map((persona:any) => (
            <li key={persona._id.$oid}>
                {persona.name}
            </li>
          ))
        }
    </div>
  )
}

export default Ceremonias