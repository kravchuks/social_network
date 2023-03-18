import { getAuthUserData } from "./auth-reducer"
import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from './redux-store';

let initialState = {
    initialized: false
};

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true, 
            }
        default:
            return state;
    } 
}

export const actions = {
    initializedSuccess: () => ({ type: 'APP/INITIALIZED_SUCCESS' } as const)
}
 
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const initialiezeApp = (): ThunkType => async (dispatch) => {
   let promise = dispatch(getAuthUserData());
   Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        });
}

export default appReducer;