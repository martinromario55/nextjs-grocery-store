import React from 'react'
import Slider from './_components/Slider'
import GlobalApi from './_utils/GlobalApi'
import CategoryList from './_components/CategoryList'
import ProductList from './_components/ProductList'

const Home = async () => {
  const sliderList = await GlobalApi.getSliders()
  const categoryList = await GlobalApi.getCategoryList()
  const productList = await GlobalApi.getAllProducts()

  // console.log('Sliders', sliderList)
  return (
    <div className="p-5 md:p-10">
      {/* Sliders */}
      <Slider sliderList={sliderList} />
      {/* Category List */}
      <CategoryList categoryList={categoryList} />
      {/* Product List */}
      <ProductList productList={productList} />
    </div>
  )
}

export default Home
