'use client'
import { useParams } from 'next/navigation'

export default function ClientDemoPage() {
  const params = useParams()
  const demo = params?.demo
  return (
    <iframe
      id="gameFrame"
      className="w-full h-full rounded-lg"
      src={`/iframe/${demo}/index.html`}
      allowFullScreen
    />
  )
}
