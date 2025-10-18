import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/demo_list')
  return null
}
