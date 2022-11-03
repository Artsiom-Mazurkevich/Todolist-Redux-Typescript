import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';


type TaskType = {
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed';


type InitialStateType = {
    tasks: { [key: string]: TaskType }
    filterType: FilterValuesType
}


const initialState: InitialStateType = {
    tasks: {},
    filterType: 'all',
}

const tasksSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<{ title: string, isDone: boolean }>) {
            const id = uuidv4();
            localStorage.setItem(id, JSON.stringify({title: action.payload.title, isDone: action.payload.isDone}))
            state.tasks[id] = action.payload;
        },
        deleteTask(state, action: PayloadAction<{ id: string }>) {
            delete state.tasks[action.payload.id]
            localStorage.removeItem(action.payload.id)
        },
        changeTaskTitle (state, action: PayloadAction<{id: string, newTitle: string}>) {
            state.tasks[action.payload.id].title = action.payload.newTitle
            localStorage.setItem(action.payload.id, JSON.stringify(state.tasks[action.payload.id]))
        },
        changeStatusTask(state, action: PayloadAction<{ id: string, newStatus: boolean }>) {
            state.tasks[action.payload.id].isDone = action.payload.newStatus
            localStorage.setItem(action.payload.id, JSON.stringify(state.tasks[action.payload.id]))
        },
        filterTask(state, action: PayloadAction<{ filterType: FilterValuesType }>) {
            switch (action.payload.filterType) {
                case "completed":
                    const completedTasks: { [key: string]: TaskType } = {};
                    for (let i = 0; i < localStorage.length; i++) {
                        let key = localStorage.key(i);
                        if (key && JSON.parse(localStorage[key]).isDone) {
                            completedTasks[key] = JSON.parse(localStorage[key])
                        }
                    }
                    return {...state, tasks: completedTasks, filterType: 'completed'}
                case "active":
                    const notCompletedTasks: { [key: string]: TaskType } = {};
                    for (let i = 0; i < localStorage.length; i++) {
                        let key = localStorage.key(i);
                        if (key && !JSON.parse(localStorage[key]).isDone) {
                            notCompletedTasks[key] = JSON.parse(localStorage[key])
                        }
                    }
                    return {...state, tasks: notCompletedTasks, filterType: 'active'}
                case "all":
                    state.filterType = 'all'
                    for (let i = 0; i < localStorage.length; i++) {
                        let key = localStorage.key(i);
                        if (key) {
                            state.tasks[key] = JSON.parse(localStorage[key])
                        }
                    }
                    return state
            }
        }
    }
})
export const tasksReducer = tasksSlice.reducer
export const {addTask, deleteTask, changeStatusTask, filterTask, changeTaskTitle} = tasksSlice.actions