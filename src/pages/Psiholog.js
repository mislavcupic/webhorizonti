import React from 'react'
import { useParams } from 'react-router-dom'
import Navigation from './Navigation'
export default function Psiholog() {
   const {id} = useParams()
  return (
    <Navigation>
     <h3>Psiholog {id}</h3>
    </Navigation>
  )
}
