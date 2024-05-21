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
import { LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'

function Header() {
  const [categoryList, setCategoryList] = useState([])
  const getCategoryList = () => {
    GlobalApi.getCategory().then(res => {
      //   console.log(res.data.data)
      setCategoryList(res.data.data)
    })
  }

  useEffect(() => {
    getCategoryList()
  }, [])

  //   console.log(
  //     'Image:',
  //     process.env.NEXT_PUBLIC_BACKEND_BASE_URL + categoryList[0]
  //   )

  //   categoryList.map(category => {
  //     console.log(
  //       'Category',
  //       category?.attributes?.icon?.data[0]?.attributes?.url
  //     )
  //   })

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
        <Button>Login</Button>
      </div>
    </div>
  )
}

export default Header
