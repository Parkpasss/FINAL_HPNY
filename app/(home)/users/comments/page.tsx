/* eslint-disable @next/next/no-img-element */
'use client'

import { Loader } from '@/components/Loader'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { CommentType } from '@/interface'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useInfiniteQuery } from 'react-query'
import { useRouter } from 'next/navigation'

import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { BiChevronRight } from 'react-icons/bi'

export default function UserComment() {
  const router = useRouter()
  const ref = useRef<HTMLDivElement | null>(null)
  const pageRef = useIntersectionObserver(ref, {})
  const isPageEnd = !!pageRef?.isIntersecting

  const { data: session } = useSession()

  const fetchComments = async ({ pageParam = 1 }) => {
    const { data } = await axios(`/api/comments?my=true&page=${pageParam}`, {
      params: {
        limit: 12,
      },
    })

    return data
  }

  const {
    data: comments,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    `comments-infinite-user-${session?.user.id}`,
    fetchComments,
    {
      getNextPageParam: (lastPage: any) =>
        lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
    },
  )

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNextPage()
      }, 500)
    }
  }, [fetchNextPage, isPageEnd, hasNextPage])

  return (
    <>
      <h1 className="font-semibold text-lg md:text-2xl max-w-7xl mx-auto">
        나의 후기 리스트
      </h1>
      <div className="mt-2 text-gray-500 max-w-7xl mx-auto">
        내가 쓴 후기 리스트입니다.
      </div>
      <div className="mt-12 grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {comments?.pages?.map((page, index) => (
          <React.Fragment key={index}>
            {page.data.map((comment: CommentType) => (
              <div key={comment?.id} className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <img
                    src={comment?.user?.image || '/images/user.png'}
                    alt="profile img"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h1 className="font-semibold">
                      {comment?.user?.name || '-'}
                    </h1>
                    <div className="text-gray-500 text-xs">
                      {dayjs(comment?.createdAt).format('YYYY-MM-DD HH:MM:ss')}
                    </div>
                  </div>
                </div>
                <div className="max-w-lg text-gray-600">{comment?.body}</div>
                <button
                  type="button"
                  onClick={() => router.push(`/rooms/${comment.roomId}`)}
                  className="underline flex gap-1 items-center justify-start hover:text-gray-500 font-semibold"
                >
                  숙소 보기 <BiChevronRight className="text-xl" />
                </button>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      {(isFetching || hasNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </>
  )
}