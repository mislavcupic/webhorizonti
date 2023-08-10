import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import CarouselComponent from './CarouselComponent'


// import './App.css';
// import {Routes,Route} from 'react-router-dom'
// import About from './pages/About';
// import Psiholog from './pages/Psiholog';
// import NotFoundPage from './pages/NotFoundPage';
// import Fees from './pages/Fees';

export default function Home() {
  return (
    <>
     <Navigation/>
     <CarouselComponent/>   
    <div>This is HOME page.</div>
    <Footer/>
      {/* <Routes>
        <Route path="/navigation" element={<Navigation/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/about/*" element={<About/>}/>
        <Route path="/registrationfeesaccommodation/*" element={<Fees/>}/>
        <Route path="/psiholozi"/>
        <Route path=":id" element={<Psiholog/>}/>
        <Route path="*" element={<NotFoundPage />} />
        </Routes> */}
    
   
 </>
    
  )
}
