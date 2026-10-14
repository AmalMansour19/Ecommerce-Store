import React from 'react'
import Hero from './Hero'
import Categories from './Catogeries'
import FeaturedProducts from './FeaturedProducts'
import NewArrivals from './NewArrivals'
import BestSellers from './BestSellers'
import CTA from './CTA'

function Home() {
  return (
    <>
      <Hero/>
      <Categories/>
      <FeaturedProducts/>
      <NewArrivals />
      <BestSellers />
      <CTA />
    </>
  )
}

export default Home
