import React from 'react'
import HeroSection from '../component/Herosession'
import Contacts from '../component/Contacts'
import Small from '../component/Small'
import Trains from './Trains'

function Home() {
  return (
    <div>
      <HeroSection />
      <Trains />
      <Small />
      <Contacts />
    </div>
  )
}

export default Home
