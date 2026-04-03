import { cookies } from 'next/headers'
import { connectDB } from './db'
import { User } from '@/models/User'

export async function getUser() {
  const token = cookies().get('token')

  if (!token?.value) {
    return null
  }

  try {
    await connectDB()
    const user = await User.findOne({ username: token.value })

    if (!user) {
      return null
    }

    return { 
      username: user.username,
      email: user.email,
    }
  } catch (error) {
    console.error('인증 에러:', error)
    return null
  }
}