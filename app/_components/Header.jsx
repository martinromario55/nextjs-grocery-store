'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CircleUserRound, LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function Header() {
  const [categoryList, setCategoryList] = useState([])
  const isLoggedIn = sessionStorage.getItem('jwt') ? true : false
  const router = useRouter()

  const getCategoryList = () => {
    GlobalApi.getCategory().then(res => {
      //   console.log(res.data.data)
      setCategoryList(res.data.data)
    })
  }

  useEffect(() => {
    getCategoryList()
  }, [])

  const onSignOut = () => {
    sessionStorage.removeItem('jwt')
    sessionStorage.removeItem('user')

    // forward to login page
    router.push('/sign-in')
  }

  return (
    <div className="p-5 shadow-sm flex justify-between">
      <div className="flex items-center gap-8">
        <Image src={'/logo.png'} alt="logo" width={150} height={150} />

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer">
              <LayoutGrid className="h-5 w-5" /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category, index) => (
              <DropdownMenuItem
                key={category?.attributes?.id}
                className="flex gap-2 items-center cursor-pointer"
              >
                <Image
                  src={
                    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                    category?.attributes?.icon?.data[0]?.attributes?.url
                  }
                  unoptimized={true}
                  alt="icon"
                  width={30}
                  height={30}
                />
                <h2 className="text-lg">{category?.attributes?.name}</h2>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:flex lg:flex xl:flex gap-3 items-center border rounded-full p-2 px-5">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>

      <div className="flex gap-5 items-center">
        <h2 className="flex gap-2 items-center text-lg">
          <ShoppingBag /> 0
        </h2>
        {!isLoggedIn ? (
          <Button>
            {' '}
            <Link href={'/sign-in'}>Login</Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUserRound className="bg-green-100 text-primary h-7 w-7 rounded-full cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My Orders</DropdownMenuItem>
              <DropdownMenuItem>My Items</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onSignOut()}
                className="text-lg font-semibold"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}

export default Header
