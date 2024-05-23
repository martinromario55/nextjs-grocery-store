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

const SignIn = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  //   Prevent user from accessing Login screen if logged in
  //   Not the best way. Should use middleware
  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt')

    if (jwt) {
      router.replace('/')
    }
  }, [])

  const onSignIn = () => {
    setLoading(true)
    GlobalApi.signInUser(email, password).then(
      resp => {
        // console.log('User:', resp.data.user)
        // console.log('JWT:', resp.data.jwt)

        //   Save user info and JWT to session storage
        sessionStorage.setItem('user', JSON.stringify(resp.data.user))
        sessionStorage.setItem('jwt', resp.data.jwt)
        // forward to home page
        router.replace('/')
        toast('Login successfully!')
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
        <h2 className="font-bold text-3xl mt-4">Sign In</h2>

        <div className="w-full flex flex-col gap-5 m-4">
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

          <Button onClick={() => onSignIn()} disabled={!(email || password)}>
            {loading ? <LoaderIcon className="animate-ping" /> : 'Login'}
          </Button>
          <p className="text-sm text-gray-500 text-center">
            You do not have an account?
            <span className="font-bold text-blue-500">
              {' '}
              <Link href={'/create-account'}>Register</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
