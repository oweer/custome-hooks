import { useState } from "react"

export const useCounter = (initValue = 10 ) => {

    const [counter, setcounter] = useState(initValue)

    const increment = (value=1) =>{
        setcounter( (c) => c+value);
    }
    const descontar = (value=1) =>{
        if(counter===0) return;

        setcounter((c) => c-value);
    }
    const reset = () =>{
        setcounter(initValue);
    }

  return {
    counter, increment, descontar, reset
  }

  
}
