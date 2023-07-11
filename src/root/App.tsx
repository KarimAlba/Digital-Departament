import './App.scss';
import Router from '../router';
import Favicon from "react-favicon";
import FavIconImg from '../assets/images/icons/favicon.ico';

function App() {
  return (
    <div className="App">
      <Favicon url={FavIconImg}/>
      <Router/>
    </div>
  );
}

export default App;
