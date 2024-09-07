import { NextResponse } from "next/server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import prisma from "@/db"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized user" },
      {
        status: 401,
      },
    )
  }

  const data = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
    },
    include: {
      accounts: true,
    },
  })

  return NextResponse.json(data, {
    status: 200,
  })
}

export async function PUT(req: Request) {
  // 데이터 수정을 처리한다
  const formData = await req.json()
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json(
      {
        error: "Unauthorized user",
      },
      {
        status: 401,
      },
    )
  }

  const result = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: { ...formData },
  })

  return NextResponse.json(result, {
    status: 200,
  })
}
