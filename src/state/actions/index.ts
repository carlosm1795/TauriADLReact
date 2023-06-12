import { Person } from "../../types/types"
import {ActionType} from "../action-types"
interface DepositAction {
    type:ActionType.DEPOSIT
    payload:number
}

interface WithdrawAction {
    type:ActionType.WITHDRAW
    payload:number
}

interface BankruptAction {
    type:ActionType.BANKRUPT
}

interface ToggleDialog {
    type:ActionType.TOGGLE,
    payload:boolean
}

interface ColumnasDialog {
    type:ActionType.COLUMNASTOGGLE,
    payload:boolean
}

interface SantuarioDialog {
    type:ActionType.SANTUARIOSTOGGLE,
    payload:boolean
}

interface CeremoniasDialog {
    type:ActionType.CEREMONIASTOGGLE,
    payload:boolean
}

interface ChangeOnPersons  {
    type: ActionType.CHANGEONPERSONS,
    payload:number
}

interface PersonToEdit  {
    type: ActionType.PERSONTOEDIT,
    payload:number
}

interface PersonToSearch  {
    type: ActionType.PERSONTOEDIT,
    payload:number
}

interface ToogleSpiner {
    type: ActionType.TOGGLESPINNER,
    payload: boolean
}

interface ToogleDibujos {
    type: ActionType.DIBUJOSTOGGLE,
    payload:boolean
}

interface ToogleNotas {
    type: ActionType.NOTASTOGGLE,
    payload:boolean
}

interface SetPersons {
    type:ActionType.STORAGEPERSONAS,
    payload:Array<Person>
}
export type Action = SetPersons | ToogleNotas|ToogleDibujos|ToogleSpiner | PersonToSearch |PersonToEdit | ChangeOnPersons | DepositAction | WithdrawAction | BankruptAction | ToggleDialog | ColumnasDialog | SantuarioDialog | CeremoniasDialog 
