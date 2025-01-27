import { cookies } from 'next/headers'
import { Suspense } from 'react'
import Link from 'next/link'

// Dynamic usage in page, wrapped with Suspense boundary
export default function Page() {
  return (
    <div>
      <h1>Dynamic Page</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SubComponent />
      </Suspense>
      <Link href="/">Home</Link>
    </div>
  )
}

async function SubComponent() {
  const cookieStore = await cookies()
  await new Promise((resolve) => setTimeout(resolve, 500))
  const cookie = await cookieStore.get('test')
  return <div>Cookie: {cookie?.value}</div>
}

export async function generateMetadata() {
  // Slow but static metadata
  await new Promise((resolve) => setTimeout(resolve, 3 * 1000))
  return {
    title: `static metadata with dynamic page content`,
  }
}
