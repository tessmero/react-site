import { redirect } from 'next/navigation'
import { homePage } from '@/config'

export default function Home() {
  redirect(homePage)
  return null
}
