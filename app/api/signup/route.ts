import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { User } from '@/models/User'

export async function POST(req: Request) {
  try {
    await connectDB()
    const { username, email, password, confirmPassword } = await req.json()

    // 검증
    if (!username || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: '모든 필드를 채워주세요' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: '비밀번호가 일치하지 않습니다' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: '비밀번호는 최소 6자 이상이어야 합니다' },
        { status: 400 }
      )
    }

    // 기존 사용자 확인
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: '이미 존재하는 사용자명 또는 이메일입니다',
        },
        { status: 409 }
      )
    }

    // 새 사용자 생성
    const newUser = new User({
      username,
      email,
      password,
    })

    await newUser.save()

    return NextResponse.json({
      success: true,
      message: '회원가입 성공! 로그인해주세요',
    })
  } catch (error) {
    console.error('회원가입 에러:', error)
    console.error('에러 상세:', error instanceof Error ? error.message : String(error))
    console.error('에러 스택:', error instanceof Error ? error.stack : '')
    return NextResponse.json(
      { success: false, message: '서버 에러' },
      { status: 500 }
    )
  }
}
