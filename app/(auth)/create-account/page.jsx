'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const CreateAccount = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  //   Prevent user from accessing Register screen if logged in
  //   Not the best way. Should use middleware
  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt')

    if (jwt) {
      router.replace('/')
    }
  }, [])

  const onCreateAccount = () => {
    setLoading(true)
    GlobalApi.registerUser(username, email, password).then(
      resp => {
        // console.log('User:', resp.data.user)
        // console.log('JWT:', resp.data.jwt)

        //   Save user info and JWT to session storage
        sessionStorage.setItem('user', JSON.stringify(resp.data.user))
        sessionStorage.setItem('jwt', resp.data.jwt)
        toast('Account created successfully!')
        // forward to home page
        router.replace('/')
        setLoading(false)
      },
      e => {
        toast(e?.response?.data?.error.message)
        setLoading(false)
      }
    )
  }

  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center p-10 bg-slate-100 border border-gray-200">
        <Image src={'/logo.png'} width={200} height={200} alt="logo" />
        <h2 className="font-bold text-3xl">Create Account</h2>

        <div className="w-full flex flex-col gap-5 m-4">
          <Input
            placeholder="username"
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            placeholder="example@email.com"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            placeholder="******"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />

          <Button
            onClick={() => onCreateAccount()}
            disabled={!(username || email || password)}
          >
            {loading ? (
              <LoaderIcon className="animate-ping" />
            ) : (
              'Create an Account'
            )}
          </Button>
          <p className="text-sm text-gray-500 text-center">
            Already have an account?
            <span className="font-bold text-blue-500">
              {' '}
              <Link href={'/sign-in'}>Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount
