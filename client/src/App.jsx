import './App.css'
import { Route, Routes } from 'react-router-dom'
import {SlayerRegisterView} from './views/SlayerRegisterView'

function App() {


  return (
    <>
      <Routes>
        <Route path="/slayer/register" element={<SlayerRegisterView />} />
      </Routes>
    </>
  )
}

export default App
