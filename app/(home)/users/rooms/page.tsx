"use client"

import { Loader } from "@/components/Loader"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { RoomType } from "@/interface"
import { storage } from "@/utils/firebaseApp"
import axios from "axios"
import dayjs from "dayjs"
import { deleteObject, ref, getDownloadURL } from "firebase/storage"
import { useSession } from "next-auth/react"
import Link from "next/link"
import React, { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { useInfiniteQuery } from "react-query"
import { useRecoilValue } from "recoil"
import { searchState } from "@/atom"
import RoomSearchFilter from "@/components/Form/RoomSearchFilter"

export default function UserRooms() {
  const observerRef = useRef<HTMLDivElement | null>(null)
  const pageRef = useIntersectionObserver(observerRef, {})
  const isPageEnd = !!pageRef?.isIntersecting
  const { data: session } = useSession()
  const searchStateValue = useRecoilValue(searchState)

  const searchParams = {
    q: searchStateValue.q,
  }

  const fetchMyRooms = async ({ pageParam = 1 }) => {
    const { data } = await axios("/api/rooms?my=true&page=" + pageParam, {
      params: {
        limit: 12,
        page: pageParam,
        ...searchParams,
      },
    })

    return data
  }

  const {
    data: rooms,
    isError,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    [`rooms-user-${session?.user.id}`, searchParams],
    fetchMyRooms,
    {
      getNextPageParam: (lastPage) =>
        lastPage?.data.length > 0 ? lastPage.page + 1 : undefined,
    },
  )

  async function deleteImages(imageKeys: string[] | null) {
    if (imageKeys) {
      imageKeys.forEach((key) => {
        const imageRef = ref(storage, `${session?.user.id}/${key}`)
        deleteObject(imageRef)
          .then(() => {
            console.log("File Deleted: ", key)
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
    return imageKeys
  }

  const handleDelete = async (data: RoomType) => {
    const confirm = window.confirm("해당 숙소를 삭제하시겠습니까?")

    if (confirm && data) {
      try {
        // 먼저 스토리지의 이미지 지우기
        await deleteImages(data.imageKeys || null)
        const result = await axios.delete(`/api/rooms?id=${data.id}`)

        if (result.status === 200) {
          toast.success("숙소를 삭제했습니다.")
          refetch()
        } else {
          toast.error("데이터 삭제중 문제가 생겼습니다.")
        }
      } catch (e) {
        console.log(e)
        toast.error("다시 시도해주세요")
      }
    }
  }

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNextPage()
      }, 500)
    }
  }, [fetchNextPage, hasNextPage, isPageEnd])

  if (!!isError) {
    throw new Error("room API fetching error")
  }

  return (
    <div className="mt-10 mb-40 max-w-7xl mx-auto overflow-auto px-8">
      <h1 className="mb-10 text-lg md:text-2xl font-semibold">
        나의 숙소 관리
      </h1>
      <RoomSearchFilter />
      <table className="text-sm text-left text-gray-500 shadow-lg overflow-x-scroll table-auto">
        <thead className="text-xs text-gray-700 bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6 min-w-[120px]">
              숙소
            </th>
            <th scope="col" className="py-3 px-6 min-w-[300px]">
              주소
            </th>
            <th scope="col" className="py-3 px-6 min-w-[120px]">
              카테고리
            </th>
            <th scope="col" className="py-3 px-6 min-w-[120px]">
              가격
            </th>
            <th scope="col" className="py-3 px-6 min-w-[200px]">
              생성 날짜
            </th>
            <th scope="col" className="py-3 px-6 min-w-[200px]">
              업데이트 날짜
            </th>
            <th scope="col" className="py-3 px-6 min-w-[80px]">
              상세 보기
            </th>
            <th scope="col" className="py-3 px-6 min-w-[80px]">
              수정
            </th>
            <th scope="col" className="py-3 px-6 min-w-[80px]">
              삭제
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page?.data.map((room: RoomType) => (
                <tr className="bg-white border-b" key={room.id}>
                  <td className="px-6 py-4 min-w-[200px]">{room.title}</td>
                  <td className="px-6 py-4">{room.address}</td>
                  <td className="px-6 py-4">{room.category}</td>
                  <td className="px-6 py-4">
                    {room.price?.toLocaleString()} 원
                  </td>
                  <td className="px-6 py-4">
                    {dayjs(room.createdAt).format("YYYY-MM-DD HH:MM:ss")}
                  </td>
                  <td className="px-6 py-4">
                    {dayjs(room.updatedAt).format("YYYY-MM-DD HH:MM:ss")}
                  </td>
                  <td className="px-6 py-4 min-w-[80px]">
                    <Link
                      href={`/rooms/${room.id}`}
                      className="font-medium text-gray-600 hover:underline"
                    >
                      보기
                    </Link>
                  </td>
                  <td className="px-6 py-4 min-w-[80px]">
                    <Link
                      href={`/rooms/edit/${room.id}`}
                      className="font-medium text-gray-600 hover:underline"
                    >
                      수정
                    </Link>
                  </td>
                  <td className="px-6 py-4 min-w-[80px]">
                    <button
                      type="button"
                      onClick={() => {
                        handleDelete(room)
                      }}
                      className="font-medium text-gray-600 hover:underline"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {(isFetching || hasNextPage || isFetchingNextPage) && (
        <Loader className="my-20" />
      )}
      <div className="w-full touch-none h-10 mb-10" ref={observerRef} />
    </div>
  )
}
