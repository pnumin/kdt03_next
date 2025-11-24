'use client'
import TodoInput from "./TodoInput"
import TodoItem from "./TodoItem"
import { useState, useEffect , useRef} from "react"
import type { TodoData } from "./todoData"

export default function TodoList() {
  const [todos, setTodos] = useState<TodoData[]>([]) ; 
  const [completed, setCompleted] = useState(0) ;
  const [incompleted, setInCompleted] = useState(0) ;
  const inRef = useRef<HTMLInputElement>(null) ;

  // console.log(todos)

  const handleSave = (newItem : TodoData[]) =>{
    setTodos(newItem) ;
    localStorage.setItem("todo", JSON.stringify(newItem)) ;
  }

  useEffect(() =>{
    //문자열 -> 자바스크립트 객체 : JSON.parse()
    const local = localStorage.getItem("todo") ;
    const localTodos = local == null ?  [] :JSON.parse(local);
    setTodos(localTodos)
  } , []);

  useEffect(() => {
    setCompleted(todos.filter(todo => todo.completed).length);
    setInCompleted(todos.filter(todo => !todo.completed).length)
  } , [todos]);

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <h1 className="w-full max-w-3xl text-2xl font-bold text-center mt-10">
        할일 목록
      </h1>
      <div className="w-full max-w-3xl
                     p-5 my-2 font-bold
                     bg-amber-50 border border-amber-300">
        전체 : {todos.length} 개 | 
        완료 : {completed} 개 | 
        미완료: {incompleted} 개
      </div>
      { 
        <TodoInput todos={todos} setTodos={handleSave} inRef={inRef}/>
      }
      { 
        todos.map (todo => <TodoItem key={todo.id} todo={todo}
                                     todos={todos} setTodos={handleSave} />)
      }
    </div>
  )
}
