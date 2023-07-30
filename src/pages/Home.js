import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import CarouselComponent from './CarouselComponent'

export default function Home() {
  return (
    <><Navigation/>
     <CarouselComponent/>   
    <div>This is HOME page.</div>
    <Footer/>
 </>
    
  )
}
