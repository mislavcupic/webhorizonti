import React from 'react'
import Navigation from './Navigation'
import DataProtection from './DataProtection'
export default function Fees() {
  return (
    <>
    <div>Kotizacije</div>
     <Routes>
     <Route path="dataprotection" element={<DataProtection/>}></Route>
     
     </Routes>
     </>
  )
}
