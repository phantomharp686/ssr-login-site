import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/models/User'

export async function POST(req: Request) {
  try {
    await connectDB()
    const { username, password } = await req.json()

    // 데이터베이스에서 사용자 찾기
    const user = await User.findOne({ username })

    if (!user) {
      return NextResponse.json(
        { success: false, message: '사용자를 찾을 수 없습니다' },
        { status: 401 }
      )
    }

    // 비밀번호 확인
    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: '비밀번호가 틀렸습니다' },
        { status: 401 }
      )
    }

    // 로그인 성공 - 쿠키에 사용자명 저장
    const res = NextResponse.json({ success: true, username: user.username })
    res.cookies.set('token', user.username, {
      httpOnly: true,
    })

    return res
  } catch (error) {
    console.error('로그인 에러:', error)
    return NextResponse.json(
      { success: false, message: '서버 에러' },
      { status: 500 }
    )
  }
}