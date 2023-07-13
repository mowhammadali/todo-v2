import React , { createContext , useReducer , useEffect, useState } from 'react';
// import uuid
import { v4 } from 'uuid';
// export context
export const TodosContext = createContext(null); 
// initial state
const initialState = []
// reducer
const reducer = (state , action) => {
    if (action.type === 'Add') {
        const todo = {title: action.text , id: v4() , complate: false};
        return [...state , todo];
    }

    if (action.type === 'Remove') {
        const newTodos = state.filter(todo => todo.id !== action.payload.id);
        return [...newTodos];
    }

    if (action.type === 'Complate_Handler') {
        const newState = state.map(todo => {
            if (todo.id === action.payload.id) {
                todo.complate = !todo.complate;
            }
            return todo;
        })
        return [...newState];
    }

    else {
        return state;
    }
}


const TodosContextProvider = ({children}) => {
    const [ state , dispatch ] = useReducer(reducer  , 
        JSON.parse(localStorage.getItem('todos')) || initialState
    );

    const [selection , setSelection] = useState('all');

    useEffect(() => {
        localStorage.setItem('todos' , JSON.stringify(state))
    } , [state])


    return (
        <TodosContext.Provider value={{state , dispatch , selection , setSelection}}>
            {children}
        </TodosContext.Provider>
    )
}

export default TodosContextProvider;