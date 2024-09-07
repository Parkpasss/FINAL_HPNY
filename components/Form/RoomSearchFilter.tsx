'use client'

import { useSetRecoilState } from 'recoil'
import { searchState } from '@/atom'
import { AiOutlineSearch } from 'react-icons/ai'

export default function RoomSearchFilter() {
  const setQ = useSetRecoilState(searchState)
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 mb-10">
      <div className="flex items-center justify-center w-full gap-2">
        <input
          type="search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQ({ q: e?.target?.value })
          }}
          placeholder="숙소명 검색"
          className="w-full block p-3 text-sm border border-gray-300 rounded-lg outline-none focus:border-lime-500 text-gray-800"
        />
        <AiOutlineSearch className="w-6 h-6" />
      </div>
    </div>
  )
}