import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/tabs/Home'
import About from './components/tabs/About';
import SearchWorkspace from './components/tabs/SearchWorkspace';


function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/about' exact element={<About/>}/>
          <Route path='/workspace' exact element={<SearchWorkspace/>}/>
          <Route path='/signin' exact element={<SearchWorkspace/>}/>
        </Routes>
      </Router>
    </>    
  );
}

export default App;
