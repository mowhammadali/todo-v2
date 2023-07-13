import React from 'react';
// context provider
import TodosContextProvider from './context/todos-context-provider';
// components
import Input from './components/input';
import Todos from './components/todos';

const App = () => {
    return (
        <TodosContextProvider>
            <Input />
            <Todos />
        </TodosContextProvider>
    )
}

export default App;