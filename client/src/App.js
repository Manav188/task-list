import React, { useEffect, useState } from 'react'
import ListHeader from './componenets/ListHeader'
import ListItem from './componenets/ListItem'
import Auth from './componenets/Auth'
import { useCookies } from 'react-cookie'

const App = () => {
  const[cookies,setCookie,removeCookies]=useCookies(null)
  const userEmail=cookies.userEmail
  const authToken= cookies.AuthToken
  const [tasks,setTasks]=useState(null)


  const getData=async()=>{
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
      const json = await response.json()
      setTasks(json)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getData()
  },[])
  console.log(tasks)

  const sortedTasks=tasks?.sort((a,b)=>new Date(a.date)-new Date(b.date))
  return (
    <div className='app'>
      {!authToken &&<Auth/>}
     {authToken &&
     <><ListHeader listName={'⌚ Task List'}getData={getData}/>
      {sortedTasks?.map((task)=><ListItem key={task.id} task={task}/>)}
      </> }
    </div>
  )
}

export default App