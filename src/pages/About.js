import React from 'react'
import { Routes,Route } from 'react-router-dom';
import ProgramOrganizingComittee from './ProgramOrganizingComittee';
import IntroductionSpeech from './IntroductionSpeech';
import ThePlaceOfEvent from './ThePlaceOfEvent';
import Navigation from '../pages/Navigation';
export default function About() {
  return (
    <>
   <Navigation/>
   <div>Ovo je o nama stranica!</div>
   <Routes>
   <Route path="introductionspeech" element={<IntroductionSpeech/>}></Route>
   <Route path="organizingcomettee" element={<ProgramOrganizingComittee/>}></Route>
   <Route path="theplaceofevent" element={<ThePlaceOfEvent/>}></Route>
   </Routes>

    </>
  )
}
