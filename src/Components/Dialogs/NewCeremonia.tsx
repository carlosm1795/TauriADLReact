'use client';
import { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Switch, Input, Textarea } from '@mantine/core';
import { Grid } from '@mantine/core';
import Select from "react-select";
import { State } from '../../state';
import { useSelector } from "react-redux";
import { DateTimePicker } from '@mantine/dates';
import { invoke } from "@tauri-apps/api/tauri";
import {
  CeremoniaIniciatica,
  Person,
  PersonsForSelect,
  RegistroCeremonias,
  Santuarios,
  SelectOptions,
  Vela
} from "../../types/types"

const NewCeremonia = () => {
  const [velasOption, setVelasOption] = useState<Array<SelectOptions>>([]);
  const [santuariosOption, setSantuariosOption] = useState<Array<SelectOptions>>([]);
  const [personasOption, setPersonasOption] = useState<Array<SelectOptions>>([]);
  const [ceremoniasOption, setCeremoniasOtion] = useState<Array<SelectOptions>>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const state = useSelector((state: State) => state);
  const [selectVela, setSelectVela] = useState<Array<SelectOptions>>([]);
  const [registroCeremoniaForm, setRegistroCeremoniaForm] =
    useState<RegistroCeremonias>({
      _id: 0,
      IdCeremonia: 0,
      FechaRecibido: new Date(),
      EstadoCeremonia: 0,
      Hora: "",
      Iniciador: [],
      Recibe: 0,
      PadMad: [],
      Acompanantes: [],
      RecibidoEnSantuario: false,
      Lugar: "",
      Santuario: 0,
      TipoDeVela: selectVela[0]?.value,
      Comentarios: "",
      ModificadoPor: { NombreTerrenal: "" },
      UltimaModificacion: new Date(),
    });

  const ShowInformation = () => {
    console.log(registroCeremoniaForm)
  }

  const HandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRegistroCeremoniaForm((state) => ({
      ...state,
      [e.target.id]: e.target.value,
    }));
  };

  const HandleChangeSelect = (data: any, id: string) => {
    setRegistroCeremoniaForm((state) => ({
      ...state,
      [id]: data,
    }));
  };

  const HandleChangeDate = (inputDate: Date | null) => {
    if (inputDate) {
      setRegistroCeremoniaForm((state) => ({
        ...state,
        FechaRecibido: inputDate,
      }));
    }
  };

  const HandleChangeSwitch = (e: any) => {
    console.log(e)
    setRegistroCeremoniaForm((state) => ({
      ...state,
      [e.target.id]: e.target.checked,
    }));
  };

  useEffect(() => {
    if (santuariosOption.length === 0) {
      invoke("get_santuarios").then((information: any) => {
        let aux: Array<SelectOptions> = [];
        console.log(information)
        information.forEach((element: any) => {
          aux.push({ value: element.id, label: element.Nombre })
        });
        setSantuariosOption(aux)
      }).catch(console.error)
    }

  }, [])

  useEffect(() => {
    if (velasOption.length === 0) {
      invoke("get_velas").then((information: any) => {
        let aux: Array<SelectOptions> = [];
        console.log(information)
        information.forEach((element: any) => {
          aux.push({ value: element.id, label: element.Nombre })
        });
        setVelasOption(aux)
      }).catch(console.error)
    }

  }, [])

  useEffect(() => {
    if (ceremoniasOption.length === 0) {
      invoke("get_Ceremonias").then((information: any) => {
        let aux: Array<SelectOptions> = [];
        information.forEach((element: any) => {
          aux.push({ value: element._id, label: element.NombreCeremonia })
        });
        setCeremoniasOtion(aux)
      }).catch(console.error)
    }

  }, [])
  useEffect(() => {
    if (personasOption.length === 0) {
      let aux: Array<SelectOptions> = [];
      state.setPersons.forEach((element: any) => {
        if (element.NombresEspeciales.length > 0) {

          aux.push({ value: element._id.id, label: `${element._id.NombreTerrenal}-${element.NombresEspeciales[0].NombreEspecial}` })
        } else {
          aux.push({ value: element._id.id, label: `${element._id.NombreTerrenal}-NA` })
        }
      });
      setPersonasOption(aux)
    }
  }, [state.setPersons])
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Registro de ceremonia"
        fullScreen
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <Grid>
          <Grid.Col span={12}>
            <label>Iniciacion</label>
            <Select
              className="basic-single"
              options={ceremoniasOption}
              classNamePrefix="select"
              isMulti
              onChange={(e) =>
                HandleChangeSelect(
                  e.map((row) => row.value),
                  "IdCeremonia"
                )
              }
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DateTimePicker
              label="Fecha de Ceremonia"
              placeholder="Seleccione una fecha"
              value={registroCeremoniaForm.FechaRecibido}
              clearable
              onChange={(e) => HandleChangeDate(e)}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <label>Estado Ceremonia</label>
            <Select
              className="basic-single"
              options={[]}
              classNamePrefix="select"
              isMulti
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <label>Iniciador</label>
            <Select
              className="basic-single"
              options={personasOption}
              classNamePrefix="select"
              isMulti
              onChange={(e) =>
                HandleChangeSelect(
                  e.map((row) => row.value),
                  "Iniciador"
                )
              }
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <label>Padrino/Madrina</label>
            <Select
              className="basic-single"
              options={personasOption}
              classNamePrefix="select"
              isMulti
              onChange={(e) =>
                HandleChangeSelect(
                  e.map((row) => row.value),
                  "PadMad"
                )
              }
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <label>Acompanantes</label>
            <Select
              className="basic-single"
              options={personasOption}
              classNamePrefix="select"
              isMulti
              onChange={(e) =>
                HandleChangeSelect(
                  e.map((row) => row.value),
                  "Acompanantes"
                )
              }
            />
          </Grid.Col>
          <Grid.Col span={6}>

            <Switch
              label="Recibido en Santuario"
              id="RecibidoEnSantuario"
              checked={registroCeremoniaForm.RecibidoEnSantuario}
              onChange={HandleChangeSwitch} />
          </Grid.Col>


          {
            registroCeremoniaForm.RecibidoEnSantuario ? (
              <Grid.Col span={12}>
                <label>Santuario</label>
                <Select
                  className="basic-single"
                  options={santuariosOption}
                  classNamePrefix="select"
                  isMulti
                  onChange={(e) => HandleChangeSelect(e?.values, "Santuario")}
                />
              </Grid.Col>
            ) : (<Grid.Col span={12}>
              <Input.Wrapper
                id="input-demo"
                label="Lugar de la ceremonia"
              >
                <Input
                  onChange={(e) => HandleChange(e)}
                  autoComplete='off'
                  id="Lugar"
                  placeholder="Lugar"
                  value={registroCeremoniaForm.Lugar}
                />
              </Input.Wrapper>
            </Grid.Col>)
          }

          <Grid.Col span={12}>
            <label>Vela</label>
            <Select
              className="basic-single"
              options={velasOption}
              classNamePrefix="select"
              isMulti
              placeholder="Seleccione una Vela"
              onChange={(e) => HandleChangeSelect(e?.values, "TipoDeVela")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              placeholder="Comentarios"
              label="Comentarios"
              id="Comentarios"
              onChange={(e) => HandleChange(e)}
              value={registroCeremoniaForm.Comentarios}
              
            />
          </Grid.Col>

        </Grid>
        <hr></hr>
        <Group position="center">
          <Button fullWidth onClick={ShowInformation}>Registrar</Button>
        </Group>
      </Modal>

      <Group position="center">
        <Button onClick={open} fullWidth>Open Modal</Button>
      </Group>
    </>
  )
}

export default NewCeremonia