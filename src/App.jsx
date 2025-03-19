import { useEffect, useState } from 'react'
import './App.css'
import BudgetTracker from './budgetTracker'
import Navbar from './Navbar'
import { p } from 'framer-motion/client';
import axios from "axios";

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

export default App;
