import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SSR Login Site',
  description: 'Server-side rendering login application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
