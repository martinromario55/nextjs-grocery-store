import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const ProductItem = ({ product }) => {
  //   console.log('Product:', product)
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-2 md:p-6 rounded-lg cursor-pointer border hover:scale-110 hover:shadow-md transition-all ease-in-out cursor-pointer">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product?.attributes?.images?.data[0]?.attributes?.url
        }
        alt={product?.attributes?.name}
        width={500}
        height={200}
        className="w-[200px] h-[200px] object-contain"
      />
      <h2 className="text-green-800">{product?.attributes?.name}</h2>
      <div className="flex gap-3">
        <h2 className="text-green-800 font-bold text-lg">
          ${product?.attributes?.sellingPrice}.00
        </h2>
        {product?.attributes?.sellingPrice !== product?.attributes?.mrp && (
          <h2 className="line-through text-gray-500">
            ${product?.attributes?.mrp}.00
          </h2>
        )}
      </div>
      <Button
        variant="outline"
        className="text-emerald-500 hover:text-white hover:bg-emerald-700"
      >
        Add to cart
      </Button>
    </div>
  )
}

export default ProductItem
