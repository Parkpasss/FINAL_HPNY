"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MdModeOfTravel } from "react-icons/md"
import { RxDividerVertical } from "react-icons/rx"
import { AiOutlineSearch } from "react-icons/ai"
import { AiOutlineMenu } from "react-icons/ai"
import { AiOutlineUser } from "react-icons/ai"
import { GiNightSleep } from "react-icons/gi"

import cn from "classnames"

import Link from "next/link"
import { SearchFilter } from "./Filter"
import { detailFilterState, filterState } from "@/atom"
import { useRecoilState, useRecoilValue } from "recoil"
import { signOut, useSession } from "next-auth/react"

const LOGOUT_USER_MENU = [
  { id: 1, title: "로그인", url: "/users/signin" },
  { id: 2, title: "회원가입", url: "/users/signup" },
  { id: 3, title: "FAQ", url: "/faqs" },
]

const LOGIN_USER_MENU = [
  { id: 1, title: "마이페이지", url: "/users/mypage" },
  { id: 2, title: "FAQ", url: "/faqs" },
  { id: 3, title: "로그아웃", url: "#", signout: true },
]

export default function Navbar() {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const { status, data: session } = useSession()
  const [detailFilter, setDetailFilter] = useRecoilState(detailFilterState)
  const filterValue = useRecoilValue(filterState)

  const router = useRouter()

  return (
    <nav
      className={cn(
        "h-20 z-[20] border border-b-gray-20 w-full shadow-sm p-4 sm:px-10 flex justify-between items-center align-middle fixed top-0 bg-white",
        {
          "!h-44": showFilter === true,
          "!items-start": showFilter === true,
        },
      )}
    >
      <div className="grow basis-0 hidden font-semibold text-lg sm:text-xl text-lime-500 cursor-pointer sm:flex sm:gap-2">
        <GiNightSleep className="text-4xl my-auto" />
        <Link href="/" className="my-auto block">
          Comma
        </Link>
      </div>
      {showFilter === false ? (
        <div className="w-full sm:w-[280px] border py-1.5 border-gray-200 rounded-full shadow hover:shadow-lg cursor-pointer flex justify-between pl-6 pr-2">
          <div
            role="presentation"
            className="flex justify-center gap-1 cursor-pointer"
            onClick={() => setShowFilter(true)}
          >
            <div className="my-auto font-semibold text-sm">어디든지</div>
            <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
            <div className="my-auto font-semibold text-sm">언제든</div>
            <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
            <div className="my-auto font-semibold text-sm">게스트</div>
          </div>
          <button
            type="button"
            onClick={() => setShowFilter(true)}
            className="bg-lime-500 text-white rounded-full w-8 h-8 my-auto"
          >
            <AiOutlineSearch className="text-lg m-auto font-semibold" />
          </button>
        </div>
      ) : (
        <div className="sm:w-[340px] cursor-pointer w-full relative">
          <div className="flex justify-center gap-7 h-14 text-center items-center">
            <button
              type="button"
              className="font-semibold underline underline-offset-8"
            >
              숙소
            </button>
            <button
              type="button"
              className="text-gray-700"
              onClick={() => router.push("/activity")}
            >
              활동
            </button>
            <button
              type="button"
              className="text-gray-700"
              onClick={() => window.alert("서비스 준비중입니다.")}
            >
              온라인 체험
            </button>
            <button
              type="button"
              className="underline underline-offset-8 text-gray-500 hover:text-black"
              onClick={() => setShowFilter(false)}
            >
              필터 닫기
            </button>
          </div>
          <div className="w-[90%] sm:max-w-3xl flex flex-col sm:flex-row border border-gray-200 rounded-lg py-4 sm:py-2 sm:rounded-full shadow-sm bg-white hover:shadow-lg cursor-pointer justify-between fixed top-20 inset-x-0 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-4 w-full relative sm:pl-2">
              <button
                type="button"
                onClick={() => setDetailFilter("location")}
                className={cn(
                  "font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left",
                  {
                    "shadow bg-white": detailFilter === "location",
                  },
                )}
              >
                여행지
                <div className="text-gray-500 text-xs">
                  {filterValue?.location || "여행지 검색"}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDetailFilter("checkIn")}
                className={cn(
                  "font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left",
                  {
                    "shadow bg-white": detailFilter === "checkIn",
                  },
                )}
              >
                체크인
                <div className="text-gray-500 text-xs">
                  {filterValue?.checkIn || "날짜 추가"}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDetailFilter("checkOut")}
                className={cn(
                  "font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left",
                  {
                    "shadow bg-white": detailFilter === "checkOut",
                  },
                )}
              >
                체크아웃
                <div className="text-gray-500 text-xs">
                  {filterValue?.checkOut || "날짜 추가"}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDetailFilter("guest")}
                className={cn(
                  "font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left",
                  {
                    "shadow bg-white": detailFilter === "guest",
                  },
                )}
              >
                여행자
                <div className="text-gray-500 text-xs">
                  {`${filterValue?.guest} 명` || "게스트 추가"}
                </div>
              </button>
              <SearchFilter />
            </div>
            <button
              type="button"
              className="bg-lime-600 text-white rounded-full h-10 mx-4 sm:w-24 mt-4 sm:mt-2 my-auto flex justify-center gap-1 px-3 py-2 hover:shadow hover:bg-lime-500"
              onClick={() => {
                setShowFilter(false)
                setDetailFilter(null)
              }}
            >
              <AiOutlineSearch className="font-semibold text-xl my-auto" />
              <div className="my-auto">검색</div>
            </button>
          </div>
        </div>
      )}

      <div className="grow basis-0 hidden md:flex gap-4 align-middle justify-end relative">
        {status === "authenticated" ? (
          <Link
            href={`/rooms/register/category`}
            className="font-semibold text-sm my-auto px-4 py-3 rounded-full hover:bg-gray-50"
          >
            당신의 공간을 등록해주세요
          </Link>
        ) : (
          <Link
            href={`/users/signin`}
            className="font-semibold text-sm my-auto px-4 py-3 rounded-full hover:bg-gray-50"
          >
            로그인 후 사용해주세요
          </Link>
        )}

        <button
          type="button"
          onClick={() => setShowMenu((val) => !val)}
          className="flex align-middle gap-3 rounded-full border border-gray-20 shadow-sm px-4 py-3 my-auto hover:shadow-lg"
        >
          <AiOutlineMenu />
          {status === "authenticated" && session?.user?.image ? (
            <img
              src={session?.user?.image}
              alt="profile img"
              className="rounded-full w-4 h-4 my-auto"
            />
          ) : (
            <AiOutlineUser />
          )}
        </button>
        {showMenu && (
          <div className="border border-gray-200 shadow-lg py-2 flex flex-col absolute top-12 bg-white w-60 rounded-lg">
            {status === "unauthenticated"
              ? LOGOUT_USER_MENU?.map((menu) => (
                  <button
                    type="button"
                    key={menu.id}
                    className="h-10 hover:bg-gray-50 pl-3 text-sm text-gray-700 text-left"
                    onClick={() => {
                      router.push(menu.url)
                      setShowMenu(false)
                    }}
                  >
                    {menu.title}
                  </button>
                ))
              : LOGIN_USER_MENU?.map((menu) => (
                  <button
                    type="button"
                    key={menu.id}
                    className="h-10 hover:bg-gray-50 pl-3 text-sm text-gray-700 text-left"
                    onClick={() => {
                      menu.signout ? signOut({ callbackUrl: "/" }) : null
                      router.push(menu.url)
                      setShowMenu(false)
                    }}
                  >
                    {menu.title}
                  </button>
                ))}
          </div>
        )}
      </div>
    </nav>
  )
}
