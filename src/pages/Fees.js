import React from 'react'
import Navigation from './Navigation'
import DataProtection from './DataProtection'
import {Routes,Route} from 'react-router-dom'
import EventRegistration from './EventRegistration'
import Footer from './Footer'
import FormsOfParticipation from './FormsOfParticipation'
import LectureSelection from './LectureSelection'
import LectureSelectionPredb from './LectureSelectionPredb'
import CreatePredavanje from './CreatePredavanje'
export default function Fees() {
  return (
    <>
    <Navigation/>
    <div>Kotizacije</div>
     <Routes>
     <Route path="dataprotection" element={<DataProtection/>}></Route>
     <Route path="eventregistration" element={<EventRegistration/>}></Route>
     <Route path="formsofparticipation" element={<FormsOfParticipation/>}></Route>
     <Route path="lectureselection" element={<LectureSelection/>}></Route>
     <Route path="lectureselectionpredb" element={<LectureSelectionPredb/>}></Route>
     <Route path="createpredavanje" element={<CreatePredavanje/>}></Route>
     </Routes>
     <Footer/>
     </>
  )
}
