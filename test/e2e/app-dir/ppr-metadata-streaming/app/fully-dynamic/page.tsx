import { cookies } from 'next/headers'
import Link from 'next/link'
import { connection } from 'next/server'
export default function Home() {
  return (
    <div>
      <h1>Fully Dynamic</h1>
      <SubComponent />

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
  await connection()
  await new Promise((resolve) => setTimeout(resolve, 3 * 1000))
  return {
    title: `fully dynamic`,
    description: `fully dynamic - ${Math.random()}`,
  }
}
