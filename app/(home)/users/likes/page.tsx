'use client'
import React, { useEffect, useRef } from 'react'

import CategoryList from '@/components/CategoryList'
import { GridLayout, RoomItem } from '@/components/RoomList'
import { useInfiniteQuery } from 'react-query'

import axios from 'axios'

import { LikeType, RoomType } from '@/interface'
import { Loader, LoaderGrid } from '@/components/Loader'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { useSession } from 'next-auth/react'

export default function UserLikes() {
  const ref = useRef<HTMLDivElement | null>(null)
  const pageRef = useIntersectionObserver(ref, {})
  const isPageEnd = !!pageRef?.isIntersecting
  const { data: session } = useSession()

  const fetchLikes = async ({ pageParam = 1 }) => {
    const { data } = await axios('/api/likes?page=' + pageParam, {
      params: {
        limit: 12,
        page: pageParam,
      },
    })

    return data
  }

  const {
    data: likes,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery(`likes-user-${session?.user.id}`, fetchLikes, {
    getNextPageParam: (lastPage, pages) =>
      lastPage?.data?.length > 0 ? lastPage.page + 1 : undefined,
  })

  if (isError) {
    throw new Error('Like API Fetching Error')
  }

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNextPage()
      }, 500)
    }
  }, [fetchNextPage, hasNextPage, isPageEnd])

  return (
    <>
      <h1 className="font-semibold text-lg md:text-2xl max-w-7xl mx-auto">
        찜한 숙소 리스트
      </h1>
      <div className="mt-2 text-gray-500 max-w-7xl mx-auto">
        찜한 숙소 리스트입니다.
      </div>
      <GridLayout>
        {isLoading || isFetching ? (
          <LoaderGrid />
        ) : (
          likes?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page?.data?.map((like: LikeType) => (
                <RoomItem room={like.room} key={like.id} />
              ))}
            </React.Fragment>
          ))
        )}
      </GridLayout>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </>
  )
}