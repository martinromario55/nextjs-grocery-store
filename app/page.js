import React from 'react'
import Slider from './_components/Slider'
import GlobalApi from './_utils/GlobalApi'
import CategoryList from './_components/CategoryList'

const Home = async () => {
  const sliderList = await GlobalApi.getSliders()
  const categoryList = await GlobalApi.getCategoryList()

  // console.log('Sliders', sliderList)
  return (
    <div className="p-5 md:p-10">
      {/* Sliders */}
      <Slider sliderList={sliderList} />
      {/* Category List */}
      <CategoryList categoryList={categoryList} />
    </div>
  )
}

export default Home
