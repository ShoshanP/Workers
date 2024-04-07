import { useState } from 'react'

import './App.css'
import AllEmployees from './employee/allEmployees'
import AddEmployeeForm from './employee/AddEmployeeForm'


function App() {
  const [addEmployee, setAddEmployee] = useState(false)

  return (
    <>
      

      <AllEmployees></AllEmployees>

    </>
  )
}

export default App
