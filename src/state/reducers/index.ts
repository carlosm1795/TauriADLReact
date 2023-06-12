import {combineReducers} from "redux"
import bankReducer from "./bankReducer"
import dialogReducer from "./dialogReducer"
import columnaReducer from "./columnaDialogReducer"
import santuarioReducer from "./santuarioDialogReducer"
import ceremoniasReducer from './ceremoniasReducer'
import changeOnUserReducer from "./changeOnUserReducer";
import globalPersonReducer from "./globalPerson.Reducer"
import toggleSpiner from "./toogleSpiner"
import toogleDibujos from "./dibujosReducer"
import toogleNotas from "./notasDialogReducer"
import setPersons from "./setPersonReducer"
const reducers = combineReducers({
    bank:bankReducer,
    dialog:dialogReducer,
    columnaDialog:columnaReducer,
    santuarioDialgo:santuarioReducer,
    ceremoniasDialog:ceremoniasReducer,
    changeOnUser:changeOnUserReducer,
    globalPerson:globalPersonReducer,
    toggleSpiner:toggleSpiner,
    toggleDibujos:toogleDibujos,
    toggleNotas:toogleNotas,
    setPersons:setPersons
})

export default reducers;

export type State = ReturnType<typeof reducers>