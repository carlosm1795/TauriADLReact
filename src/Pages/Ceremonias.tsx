'use client';
import React, { useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { Button } from '@mantine/core';
import NewCeremonia from '../Components/Dialogs/NewCeremonia';
import TableExample from '../Components/TableExample';
import { Grid } from '@mantine/core';


const Ceremonias = () => {
  const [personas, setPersonas] = useState([])
  const getInformation = () => {
    console.log("Ejecutando");
    setPersonas([])
    invoke("get_information").then((information: any) => {
      setPersonas(information)
    }).catch(console.error)
  }
  const getFullName = () => {
    console.log("Ejecutando full name");
    setPersonas([])
    invoke("get_information_names").then((information: any) => {
      console.log(information)
    }).catch(console.error)
  }
  return (
    <div>Ceremonias asd asd asdas asd as
      <Button onClick={getFullName}>Get Information</Button>
      <NewCeremonia />
      {
        personas.map((persona: any) => (
          <li key={persona._id.$oid}>
            {persona.name}
          </li>
        ))
      }
      <Grid>
        <Grid.Col span={12}><TableExample /></Grid.Col>

      </Grid>
    </div>
  )
}

export default Ceremonias