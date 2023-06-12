'use client';
import { useState,useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Ceremonias from "./Pages/Ceremonias";
import Iniciaciones from "./Pages/Iniciaciones";
import { bindActionCreators } from "redux";
import { SelectOptions } from "./types/types";
import Select from "react-select";
import { actionCreators,State } from "./state";
import { useDispatch, useSelector } from "react-redux";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';

function App() {
  const state = useSelector((state: State) => state);
  const dispatch = useDispatch();
  const { SetPersons } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [personToSearch, setPersonToSearch] = useState<Array<SelectOptions>>([]);
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if(personToSearch.length === 0){
      invoke("get_information_names").then((information: any) => {
        console.log(information)
        let aux:Array<SelectOptions> = [];
        information.forEach((element:any) => {
          if(element.NombresEspeciales.length > 0){

            aux.push({value:element._id.id,label:`${element._id.NombreTerrenal}-${element.NombresEspeciales[0].NombreEspecial}`})
          }else{
            aux.push({value:element._id.id,label:`${element._id.NombreTerrenal}-NA`})
          }
        });
        setPersonToSearch(aux)
        SetPersons(information)
      }).catch(console.error)
    }
  },[])
  return (

    <Router>
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <Text>Application navbar</Text>
            <Select
                className="basic-single"
                options={personToSearch}
                classNamePrefix="select"
                placeholder="Seleccione una persona"
                
              />
            <div>
              <ul>
                <li>
                  <Link to="/">Ceremonias</Link>
                </li>
                <li>
                  <Link to="/Iniciaciones">Iniciaciones</Link>
                </li>
              </ul>
            </div>
          </Navbar>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Select
                className="basic-single"
                options={personToSearch}
                classNamePrefix="select"
                placeholder="Seleccione una persona"
                
              />
            </div>
          </Header>
        }
      >
        <div>


          {/* <div>
            <ul>
              <li>
                <Link to="/">Ceremonias</Link>
              </li>
              <li>
                <Link to="/Iniciaciones">Iniciaciones</Link>
              </li>
            </ul>
          </div> */}
          <Routes>
            <Route path='/' element={<Ceremonias />} />
            <Route path='/Iniciaciones' element={<Iniciaciones />} />
          </Routes>

        </div>
      </AppShell>
    </Router>
    // 
  );
}

export default App;
