import { ActionType } from "../action-types"
import { Dispatch } from "redux"
import { Action } from "../actions"
import { Person } from "../../types/types"

export const depositMoney = (amount:number) =>{
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:ActionType.DEPOSIT,
            payload:amount
        })
    }
}

export const withdrawMoney = (amount:number) =>{
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:ActionType.WITHDRAW,
            payload:amount
        })
    }
}

export const bnakrup = () =>{
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:ActionType.BANKRUPT            
        })
    }
}

export const toggle = (mode:boolean) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:ActionType.TOGGLE,
            payload:mode
        })
    }
}

export const toggleColumnas = (mode:boolean) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:ActionType.COLUMNASTOGGLE,
            payload:mode
        })
    }
}

export const toggleSantuarios = (mode:boolean) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:ActionType.SANTUARIOSTOGGLE,
            payload:mode
        })
    }
}

export const toggleCeremonias = (mode:boolean) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:ActionType.CEREMONIASTOGGLE,
            payload:mode
        })
    }
}

export const ChangeonPersons = (mode:number) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:ActionType.CHANGEONPERSONS,
            payload:mode
        })
    }
}

export const GlobalPerson = (mode:number) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:ActionType.PERSONTOEDIT,
            payload:mode
        })
    }
}

export const ToggleSpinner = (mode:boolean) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:ActionType.TOGGLESPINNER,
            payload:mode
        })
    }
}

export const ToggleDibujos = (mode:boolean) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:ActionType.DIBUJOSTOGGLE,
            payload:mode
        })
    }
}

export const ToggleNotas = (mode:boolean) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:ActionType.NOTASTOGGLE,
            payload:mode
        })
    }
}

export const SetPersons = (mode:Array<Person>) => {
    return (dispatch:Dispatch<Action>) => {
        dispatch({
            type:ActionType.STORAGEPERSONAS,
            payload:mode
        })
    }
}


