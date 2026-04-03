import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.redirect(new URL('/login', process.env.NEXTAUTH_URL || 'http://localhost:3000'))
  
  // 쿠키 삭제
  res.cookies.delete('token')
  
  return res
}
