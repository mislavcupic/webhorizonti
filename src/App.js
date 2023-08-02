import './App.css';
import Home from './pages/Home';
import {Routes,Route} from 'react-router-dom'
import About from './pages/About';
import Psiholog from './pages/Psiholog';
import NotFoundPage from './pages/NotFoundPage';
import Navigation from './pages/Navigation';
import Fees from './pages/Fees';


function App() {
  return (
    <>
        {/* <Link to="/canvas" >Canvas</Link>
      <br/>
      <Link to="/registrationfeesaccommodation" >Kotizacije</Link>
      <br/>  
      <Link to="/" >Home</Link>
      <br/> 
      <Link>
      <Link to="/about" >ONama</Link>
      <br/> 
      <Link to="/about/introductionspeech" >Pozdravni govor</Link>
      <br/> 
      <Link to="/about/organizingcomettee" >Programski odbor</Link>
      <br/> 
      <Link to="/about/theplaceofevent" >Mjesto odrzavanja</Link>
      <br/> 
      </Link> */}
      
    
      {/* <Link to="/psiholozi" >Psiholozi</Link>
      <br/>  */}
     
      <Routes>
        <Route path="/navigation" element={<Navigation/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/about/*" element={<About/>}/>
        <Route path="/registrationfeesaccommodation/*" element={<Fees/>}/>
        <Route path="/psiholozi"/>
        <Route path=":id" element={<Psiholog/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
  
     
    </>
  );
}

export default App;
