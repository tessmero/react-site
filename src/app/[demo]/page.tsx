// server component used to render static demo pages

import { getCachedDemos } from '@/parsers/demos-parser'
import ClientDemoPage from '.'

// Required for static export in Next.js
export function generateStaticParams() {
  const demosData = getCachedDemos()
  return demosData.map(demo => ({ demo: demo.id }))
}

export default function DemoPage() {
  return <ClientDemoPage />
}
