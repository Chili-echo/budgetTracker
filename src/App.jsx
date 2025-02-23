import { useState } from 'react'
import './App.css'
import BudgetTracker from './budgetTracker'
import Navbar from './Navbar'

function App() {

  return (
    <>
      <Navbar />
      <div className='app'>
        <BudgetTracker />
      </div>

    </>
  )
}

export default App
