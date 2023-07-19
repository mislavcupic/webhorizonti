import React from 'react'
import { Link } from 'react-router-dom'

export default function Psiholozi() {
  return (
    <>
      <Link to="/psiholozi/1">Prvi psiholog</Link>
      <Link to="/psiholozi/2">Drugi psiholog</Link>
    </>
  )
}
