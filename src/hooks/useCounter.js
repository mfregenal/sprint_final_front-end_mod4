import { useState } from "react";

function useCounter(initialValue = 1) {
  const [counter, setCounter] = useState(initialValue)

  const increment = () => setCounter( prevCounter => prevCounter + 1 )

  const decrement = () => setCounter( prevCounter => (prevCounter > 1 ? prevCounter - 1 : 1))

  return {
    counter,
    increment,
    decrement
  }
}

export default useCounter