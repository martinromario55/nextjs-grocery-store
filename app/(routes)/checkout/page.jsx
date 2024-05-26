'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { ArrowBigRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Checkout = () => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const jwt = sessionStorage.getItem('jwt')
  const [totalCartItem, setTotalCartItem] = useState(0)
  const [cartItemList, setCartItemList] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const router = useRouter()

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [zip, setZip] = useState()
  const [address, setAddress] = useState()

  useEffect(() => {
    let total = 0
    cartItemList.forEach(item => {
      total += item.amount
    })
    setSubTotal(total)
  }, [cartItemList])

  useEffect(() => {
    if (!jwt) {
      router.push('/sign-in')
    }
    getCartItems()
  }, [])

  const getCartItems = () => {
    GlobalApi.getCartItems(user?.id, jwt).then(res => {
      setTotalCartItem(res.length)
      // console.log(res)
      setCartItemList(res)
    })
  }

  // Calculate Total amount plus tax
  const calculateTotalAmount = () => {
    const totalAmount = subTotal * 0.9 + 15
    return totalAmount.toFixed(2)
  }

  return (
    <div>
      <h2 className="p-3 bg-emerald-500 text-xl font-bold text-center text-white">
        Checkout
      </h2>

      <div className="p-5 px-5 md:px-10 grid grid-col-1 md:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Name"
              onChange={e => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Phone"
              onChange={e => setPhone(e.target.value)}
            />
            <Input placeholder="Zip" onChange={e => setZip(e.target.value)} />
          </div>
          <div className="mt-3">
            <Input
              placeholder="Address"
              onChange={e => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="mx-10 border mt-5">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCartItem})
          </h2>

          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>$ {subTotal}.00</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery: <span>$15.00</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (9%): <span>${(subTotal * 0.9).toFixed(2)}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between font-bold">
              Total: <span>$ {calculateTotalAmount()}</span>
            </h2>
            {/* <Button>
              Payment <ArrowBigRight />
            </Button> */}
            <PayPalButtons style={{ layout: 'vertical' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
