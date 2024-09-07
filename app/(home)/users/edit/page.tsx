'use client'

import React, { useState, useEffect } from 'react'
import { UserType } from '@/interface'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useQuery } from 'react-query'
import { FullPageLoader } from '@/components/Loader'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function UserEditPage() {
  const router = useRouter()
  const { status } = useSession()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')

  const fetchUser = async () => {
    const { data } = await axios('/api/users')
    return data as UserType
  }

  const { data: user, isSuccess } = useQuery('user-form', fetchUser, {
    enabled: status === 'authenticated',
    refetchOnMount: false,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e

    if (name === 'name') {
      setName(value)
    }
    if (name === 'email') {
      setEmail(value)
    }
    if (name === 'phone') {
      setPhone(value)
    }
    if (name === 'address') {
      setAddress(value)
    }
  }

  const updateUser = async () => {
    const res = await axios.put('/api/users', {
      name: name,
      email: email,
      phone: phone,
      address: address,
    })
    if (res.status === 200) {
      toast.success('정보를 수정했습니다')
      router.replace('/users/info')
    } else {
      toast.error('다시 시도해주세요')
    }
  }

  useEffect(() => {
    if (user && isSuccess) {
      setName(user?.name || '')
      setEmail(user?.email || '')
      setAddress(user?.address || '')
      setPhone(user?.phone || '')
    }
  }, [user, isSuccess])

  return user ? (
    <form>
      <div className="space-y-12 max-w-3xl mx-auto">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
            개인정보 수정
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            개인정보를 수정해주세요
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                이름
              </label>
              <div className="mt-2">
                <input
                  onChange={onChange}
                  value={name}
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                전화번호
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={phone}
                  onChange={onChange}
                  name="phone"
                  id="phone"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                이메일
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  value={email}
                  onChange={onChange}
                  name="email"
                  type="email"
                  readOnly
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <input name="id" value={user.id} className="hidden" readOnly />
            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                주소
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={address}
                  onChange={onChange}
                  name="address"
                  id="address"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6 max-w-3xl mx-auto">
        <button
          type="button"
          onClick={updateUser}
          className="rounded-md bg-lime-600 px-16 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
        >
          수정하기
        </button>
      </div>
    </form>
  ) : (
    <FullPageLoader />
  )
}