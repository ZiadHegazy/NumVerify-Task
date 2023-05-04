import logo from './logo.svg';
import './App.css';
import {Routes,Route,useNavigate} from 'react-router-dom'
import { Login } from './Components/Login/Login';
import  SearchPage  from './Components/Search/SearchPage';
import { Register } from './Components/Register/Register';
import  SearchHistory  from './Components/Search/SearchHistory';
import { RequireAuth } from './Components/Authentication/RequireAuth';

function App() {
  const navigate=useNavigate()
  //localStorage.clear()
  return (
    <Routes>
      <Route path='/' element={<Login/> } ></Route>
      <Route path='/home' element={<SearchPage/>}> </Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/searchHistory' element={<SearchHistory />}></Route>
    </Routes>
    
  );
}

export default App;
