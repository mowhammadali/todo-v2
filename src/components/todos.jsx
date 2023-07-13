import React , { useContext, useEffect, useState } from 'react';
// import context
import { TodosContext } from '../context/todos-context-provider';
// icons
import { AiOutlineFileDone } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

const Todos = () => {
    const { state , dispatch , selection , setSelection } = useContext(TodosContext);

    const [newState , setNewState] = useState([]);

    useEffect(() => {
        if (selection === 'all') {
            setNewState(state);
        }

        if (selection === 'complate') {
            const complateStates = state.filter(todo => todo.complate === true);
            setNewState(complateStates);
        }

        if (selection === 'uncomplate') {
            const uncomplateStates = state.filter(todo => todo.complate === false);
            setNewState(uncomplateStates);
        }
        
    } , [selection , state])

    return (
        <div className='w-full mt-16 flex flex-col items-center gap-8'>
            {
                newState.map(todo => {
                    return (
                        <div key={todo.id}
                        className='flex items-center h-[50px] min-w-[250px]
                        sm:min-w-[300px] md:min-w-[400px] text-slate-100 font-bold
                        text-sm sm:text-base'>
                            <button className='flex items-center justify-center w-[70px] 
                            h-full bg-violet-600 rounded-l-2xl'>
                                <AiOutlineFileDone className={`text-2xl
                                ${todo.complate ? "text-green-500 opacity-100" : 
                                "text-slate-100 opacity-50"}`}
                                onClick={() => dispatch({type: 'Complate_Handler' , payload: todo})}/>
                            </button>
                            <section className='flex items-center justify-center w-full 
                            h-full bg-violet-800'>
                                <p className={`${todo.complate && "opacity-50 line-through decoration-red-600 decoration-2"}`}>
                                    {todo.title}
                                </p>
                            </section>
                            <button className='flex items-center justify-center w-[70px] 
                            h-full bg-violet-600 rounded-r-2xl'
                            onClick={() => dispatch({type: 'Remove' , payload: todo})}>
                                <FaTrash />
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Todos;