import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {tasksReducer} from "../reducers/tasksReducer";


// const rootReducer = combineReducers({
//     tasks: tasksReducer,
// })



export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    }
})






export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector