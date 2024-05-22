import React from 'react'
import Slider from './_components/Slider'
import GlobalApi from './_utils/GlobalApi'

const Home = async () => {
  const sliderList = await GlobalApi.getSliders()

  console.log('Sliders', sliderList)
  return (
    <div className="p-5 md:p-10">
      {/* Sliders */}
      <Slider sliderList={sliderList} />
    </div>
  )
}

export default Home
