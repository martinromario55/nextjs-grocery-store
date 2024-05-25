'use client'
import { Button } from '@/components/ui/button'
import { LoaderIcon, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import { toast } from 'sonner'
import { UpdateCartContext } from '../_context/updateCartContext'

const ProductItemDetail = ({ product }) => {
  const jwt = sessionStorage.getItem('jwt')
  const router = useRouter()
  const user = JSON.parse(sessionStorage.getItem('user'))
  const [loading, setLoading] = useState(false)
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext)
  const [productTotalPrice, setProductTotalPrice] = useState(
    product.attributes.sellingPrice
  )

  const [quantity, setQuantity] = useState(1)

  const addToCart = () => {
    setLoading(true)
    // check if user is authenticated
    if (!jwt) {
      router.push('/sign-in')
      setLoading(false)
      return
    }

    const data = {
      data: {
        quantity,
        amount: productTotalPrice * quantity,
        products: product.id,
        users_permissions_users: user.id,
        userId: user.id,
      },
    }

    // console.log(data)
    GlobalApi.addToCart(data, jwt).then(
      resp => {
        // console.log(resp.data)
        toast('Product added to cart!')
        setUpdateCart(!updateCart)
        setLoading(false)
      },
      e => {
        toast('Error while adding to cart')
        setLoading(false)
      }
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product?.attributes?.images?.data[0]?.attributes?.url
        }
        alt={product?.attributes?.name}
        width={300}
        height={300}
        className="object-contain bg-slate-200 p-5 h-[320px] w-[300px] rounded-lg"
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">{product?.attributes?.name}</h2>
        <h2 className="text-sm">{product?.attributes?.description}</h2>
        <div className="flex gap-3">
          <h2 className="text-lg font-bold">
            ${product?.attributes?.sellingPrice}.00
          </h2>
          {product?.attributes?.sellingPrice !== product?.attributes?.mrp && (
            <h2 className="line-through text-gray-500">
              ${product?.attributes?.mrp}.00
            </h2>
          )}
        </div>
        <h2 className="font-medium text-lg">
          Quantity: ({product.attributes.itemQuantityType})
        </h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex gap-3 items-center">
            <div className="p-2 border flex gap-10 items-center px-5">
              <button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <h2>{quantity}</h2>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <h2 className="text-2xl font-bold">
              = ${quantity * productTotalPrice}.00
            </h2>
          </div>
          <Button
            className="flex gap-3 bg-emerald-500 hover:bg-emerald-800"
            onClick={() => addToCart()}
            disabled={loading}
          >
            <ShoppingBasket />
            {loading ? <LoaderIcon className="animate-ping" /> : 'Add To Cart'}
          </Button>
        </div>
        <h2 className="text-lg">
          <span className="font-bold">Category: </span>
          {product.attributes.categories.data[0].attributes.name}
        </h2>
      </div>
    </div>
  )
}

export default ProductItemDetail
