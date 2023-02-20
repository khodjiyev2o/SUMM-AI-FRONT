import { Route, Routes } from 'react-router-dom'
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login'/>
        <Route path='/register' element={<Register />} />
        <Route path='/translation-objects'/>
      </Routes>
    </div>
  )
}

export default App
