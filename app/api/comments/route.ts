import { NextResponse } from 'next/server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import prisma from '@/db'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const roomId = searchParams.get('roomId') as string
  const limit = searchParams.get('limit') as string
  const page = searchParams.get('page') as string
  const my = searchParams.get('my') as string

  const session = await getServerSession(authOptions)
  // page 값이 있는 경우, 댓글 모달 리스트 무한 스크롤
  if (page) {
    const count = await prisma.comment.count({
      where: {
        roomId: roomId ? parseInt(roomId) : {},
        // 사용자 댓글을 가져온다.
        userId: my ? session?.user?.id : {},
      },
    })
    const skipPage = parseInt(page) - 1
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        roomId: roomId ? parseInt(roomId) : {},
        userId: my ? session?.user?.id : {},
      },
      take: parseInt(limit),
      skip: skipPage * parseInt(limit),
      include: {
        user: true,
      },
    })

    return NextResponse.json({
      page: parseInt(page),
      data: comments,
      totalCount: count,
      totalPage: Math.ceil(count / parseInt(limit)),
    })
  } else {
    // page 값이 없는 경우, limit 값 기준으로 최신 데이터 가져오기
    const count = await prisma.comment.count({
      where: {
        roomId: roomId ? parseInt(roomId) : {},
        userId: my ? session?.user?.id : {},
      },
    })

    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      where: {
        roomId: roomId ? parseInt(roomId) : {},
        userId: my ? session?.user?.id : {},
      },
      include: {
        user: true,
      },
    })

    return NextResponse.json(
      {
        data: comments,
        totalCount: count,
      },
      {
        status: 200,
      },
    )
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const formData = await req.json()

  const { roomId, body } = formData

  if (!session?.user) {
    return NextResponse.json(
      {
        error: 'Unauthorized user',
      },
      {
        status: 401,
      },
    )
  }

  const comment = await prisma.comment.create({
    data: {
      roomId,
      body,
      userId: session?.user.id,
    },
  })

  return NextResponse.json(comment, {
    status: 200,
  })
}