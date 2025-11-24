import TailButton from "@/components/TailButton"
// import { useRef } from "react";
import type { TodoData } from "./todoData"

interface TodoInputProps {
  todos : TodoData[], 
  setTodos : (newItem : TodoData[]) => void, 
  inRef : React.RefObject<HTMLInputElement | null> 
}

export default function TodoInput({todos, setTodos, inRef}:TodoInputProps) {
  // const inRef = useRef() ;

  const handleAdd = () => {
    if ( inRef.current?.value == "") {
      alert("값을 입력해 주세요.");
      inRef.current.focus() ;
      return 
    }

    const newItem : TodoData= {
      id: Date.now(),
      text:inRef.current?.value,
      completed : false 
    }
    setTodos([newItem, ...todos]) ;
    if (inRef.current ) {
      inRef.current.value = "" ;
      inRef.current.focus() ;
    }
    
  }

  return (
    <div className="w-full max-w-3xl flex justify-center items-center 
                    my-4">
      <input type="text" 
             ref = {inRef}
             className="flex-1 p-2 border border-gray-200
                        rounded-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-600" />

      <TailButton color="blue" 
                  caption="추가"
                  onHandle={handleAdd} />
    </div>
  )
}
