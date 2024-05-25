'use client'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const CartItemList = ({ cartItemList, onDeleteItem }) => {
  const [subTotal, setSubTotal] = useState(0)
  // console.log(cartItemList)

  useEffect(() => {
    let total = 0
    cartItemList.forEach(item => {
      total += item.amount
    })
    setSubTotal(total)
  }, [cartItemList])
  return (
    <div>
      <div className="h-[700px] overflow-auto">
        {cartItemList.map((cart, index) => (
          <div className="" key={index}>
            <div className="flex gap-6 items-center justify-between p-2 m-3">
              <Image
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + cart.image}
                width={90}
                height={90}
                alt={cart.name}
                className="border p-2 h-[90px] object-contain"
              />

              <div className="">
                <h2 className="font-bold">{cart.name}</h2>
                <h2 className="">Quantity: {cart.quantity}</h2>
                <h2 className="text-lg font-bold">$ {cart.amount}.00</h2>
              </div>
              <TrashIcon
                className="text-red-600 cursor-pointer"
                onClick={() => onDeleteItem(cart.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute w-[90%] bottom-6 flex flex-col">
        <h2 className="text-lg font-bold flex justify-between">
          Subtotal <span>$ {subTotal}.00</span>
        </h2>
        <Button>View Cart</Button>
      </div>
    </div>
  )
}

export default CartItemList
