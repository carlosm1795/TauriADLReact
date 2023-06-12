import { ObjectId } from "mongodb";
export interface Person2 {
    _id: {
        $oid:string
    },
    name: string,
    location: string,
    title:string
}

export interface Person {
    _id: {
        id:number,
        NombreTerrenal:string,
    },
    NombresEspeciales:Array<Persona>|[]
}
export interface Columna {    
    Nombre:string,
    _id:number,
    Protector?:string,
    Pais?:string,
    Simbolo?:string,
    Comentarios?:string,
    Encargados?:Array<Persona>|[]
}

export interface Persona {
    NombreTerrenal:string,
    Cedula?:string,
    Email?:string,
    Direccion?:string,
    Telefono?:string,
    EstadoDePersona?:number,
    FechaDeNacimiento?:Date
}

export interface Santuarios {
    _id:number,
    Nombre:string,
    Comentarios?:string
}

export interface Vela {
    _id:number|string|undefined,
    Nombre:string,
    Comentarios?:string
}
export interface Vestidura {
    IdVestidura:number,
    Nombre:string,
    Comentarios?:string
}
export interface RegistroCeremonias {
    _id:number,
    IdCeremonia:number|Array<number>|Array<string>|string,
    FechaRecibido?:Date,
    EstadoCeremonia:number,
    Hora?:string,
    Recibe?:number,
    Iniciador:Array<string>,
    PadMad:Array<string>,
    Acompanantes:Array<string>,
    RecibidoEnSantuario?:boolean,
    Santuario?:number|string,
    Lugar?:string,
    Comentarios?:string,
    TipoDeVela?:number|string|undefined
    ModificadoPor:Persona,
    UltimaModificacion?:Date
}

export interface CeremoniaIniciatica {
    _id:number,
    NombreCeremonia:string,
    Comentarios?:string
}

export interface RegistroDibujo {
    _id?:number,
    Persona:number,
    Descripccion:string,
    Estado:string,
    TipoDibujo:number,
    FechaAnunciado?:Date
}

export interface TipoDibujo {
    _id:string,
    TipoDeDibujo:string
}

export interface NombreEspecial {
    _id:ObjectId
    TipoDeNombre:number,
    NombreEspecial:string,
    FechaRecibido:Date
}

export interface TableConfig {
    data:Array<any>,
    columns:Array<any>,
    title:string
}

export interface TableInput {
    config:TableConfig
}

export interface ConfigAxios {
    config:{
        url?:string,
        method?:string,
        headers?:object,
        data?:object,
        params?:object
    }
    shouldFire:boolean
}

export interface SelectOptions {
    value:string|number|undefined,
    label:string
}

export interface PersonsForSelect {
    _id:string|number,
    NombreTerrenal?:string,
    LatestName?:string
}

export interface RegistroNotas {
    _id:string,
    Comentario:string,
    Fecha:Date
}

export interface Vestidura {
    k:string,
    v:boolean,
    comentario:string
}
