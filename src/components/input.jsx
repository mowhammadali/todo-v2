import React , { useContext, useState , useEffect } from 'react';
// import context
import { TodosContext } from '../context/todos-context-provider';
// icons
import { TiArrowSortedUp , TiArrowSortedDown } from 'react-icons/ti';

const Input = () => {
    const { state , dispatch , selection , setSelection } = useContext(TodosContext);

    const [value , setValue] = useState('');
    const [orientation , setOrientation] = useState(false);

    const handleAddTodo = () => {
        if (!value) {
            return;
        }
        dispatch({type: 'Add' , text: value});
        setValue('');
    }

    const handleKeyDown = event => {
        if (event.key === 'Enter' && value) {
            dispatch({type: 'Add' , text: value});
            setValue('');
        }
    }

    return (
        <div className='w-full p-8 flex flex-col gap-6
        items-center'>
            <input className='w-[300px] h-[45px] outline-none rounded-2xl
            px-4 sm:w-[350px] md:w-[500px] border-[1px] border-slate-600
            text-slate-500 font-bold text-lg' 
            type='text' 
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            placeholder='Insert Todo...'/>
            <button className='btn'
            onClick={handleAddTodo}>
                Add Todo
            </button>
            <div className='relative'>
                <div className='absolute top-[50%] translate-y-[-50%] right-2 z-10'>
                {
                    orientation
                    ?
                    <TiArrowSortedUp className='text-xl text-slate-100'
                    />
                    :
                    <TiArrowSortedDown className='text-xl text-slate-100'
                    />
                }
                </div>
                <select className='outline-none appearance-none shadow-xl w-[170px] 
                rounded-3xl py-2 px-3 bg-blue-500 text-slate-100 font-bold'
                value={selection}
                onChange={e => setSelection(e.target.value)}
                onClick={() => setOrientation(curr => !curr)}>
                    <option value="all">All</option>
                    <option value="complate">Complate</option>
                    <option value="uncomplate">Uncomplate</option>
                </select>
            </div>
        </div>
    )
}

export default Input;