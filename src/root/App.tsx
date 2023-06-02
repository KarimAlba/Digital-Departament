import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Autorization from '../components/autorization/AutorizationComponent';
import Registration from '../components/registration/RegistrationComponent';
import Main from '../components/mainComponent/MainComponent';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Autorization/>}/>
        <Route path='registration' element={<Registration/>}/>
        <Route path='main' element={<Main/>}/>
        <Route path='*' element={<h1>Сломався...</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
