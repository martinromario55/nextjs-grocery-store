import React from 'react'
import Slider from './_components/Slider'
import GlobalApi from './_utils/GlobalApi'
import CategoryList from './_components/CategoryList'
import ProductList from './_components/ProductList'
import Image from 'next/image'
import Footer from './_components/Footer'

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
      {/* Banner */}
      <Image
        src={'/banner.png'}
        width={1000}
        height={400}
        alt="banner"
        className="mt-5 md:mt-5 lg:mt-10 w-full h-[400px] object-contain"
      />
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home
