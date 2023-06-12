import { ActionType } from "../action-types";
import { Action } from "../actions";

const initialState = 0;

const reducer = (state:number = initialState,action:Action) => {
    switch(action.type){
        case ActionType.PERSONTOEDIT:
            return action.payload        
        default:
            return state
    }
}

export default reducer