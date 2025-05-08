import { useEffect, useReducer } from "react"

import { todoReducer } from "./"

const initialState = [
]

const init = () => {
    return JSON.parse( localStorage.getItem('todos')  ) || [];
}

export const useTodos = () => {


        const [todos, dispatch] = useReducer(todoReducer , initialState)
    
        useEffect(() => {
          localStorage.setItem('todos', JSON.stringify(todos));
        }, [todos])
        
        const handledNewTodo = ( todo ) =>{
            const action ={
                type: '[TODO] Add Todo',
                payload: todo,
            }
    
            dispatch(action);
        }
    
        const handleDeleteTodo = (id) =>{
           
            const action ={
                type: '[TODO] remove todo',
                payload: id,
            }
    
            dispatch(action);
        }
    
        const handleToggleTodo = (id) =>{
            dispatch({
                type: '[TODO] Toggle Todo',
                payload: id,
            });
        }

  return {
    ...dispatch,
    todos,
    handledNewTodo,
    handleToggleTodo,
    handleDeleteTodo
  }
}
