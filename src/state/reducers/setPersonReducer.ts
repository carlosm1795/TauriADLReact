import { Person } from "../../types/types";
import { ActionType } from "../action-types";
import { Action } from "../actions";
const initialState:Array<Person> = [];

const reducer = (state:Array<Person> = initialState,action:Action) => {
    switch(action.type){
        case ActionType.STORAGEPERSONAS:
            return action.payload        
        default:
            return state
    }
}

export default reducer