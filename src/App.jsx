import { Route, Routes } from 'react-router-dom'
import  Register  from "./components/Register";
import  Login from "./components/Login";
import  TransListing from "./components/TransListing";
import  NewObject from "./components/NewObject";
import ObjDetail from './components/ObjDetail';
import ObjEdit from './components/ObjEdit';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route
          path="/translation-objects/edit/:objid"
          element={
            <ProtectedRoute >
              <ObjEdit/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/translation-objects/detail/:objid"
          element={
            <ProtectedRoute >
              <ObjDetail/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute >
              <NewObject/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute >
              <TransListing/>
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
