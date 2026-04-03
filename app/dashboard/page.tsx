import { getUser } from '../../lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Dashboard() {
  const user = getUser()
  const resolvedUser = await user

  if (!resolvedUser) {
    redirect('/login')
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ marginBottom: '20px' }}>대시보드</h1>
        
        <div style={{
          backgroundColor: '#e7f3ff',
          padding: '15px',
          borderRadius: '4px',
          marginBottom: '20px',
          color: '#004085'
        }}>
          <p style={{ margin: '0' }}>
            👋 환영합니다, <strong>{resolvedUser.username}</strong>님!
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
            이메일: {resolvedUser.email}
          </p>
        </div>

        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <h2 style={{ marginTop: '0' }}>로그인 성공! 🎉</h2>
          <p>
            이 페이지는 로그인한 사용자만 접근할 수 있는 보호된 페이지입니다.
          </p>
          <p>
            MongoDB와 JWT(쿠키) 기반의 인증 시스템을 통해 작동합니다.
          </p>
        </div>

        <form 
          action="/api/logout" 
          method="POST"
          style={{ display: 'inline-block' }}
        >
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            로그아웃
          </button>
        </form>
      </div>
    </div>
  )
}