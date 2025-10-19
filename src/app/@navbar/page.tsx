import { DemoProps, getCachedDemos } from '@/parsers/demos-parser'
import { TopBar } from './top-bar'
import { headerPages } from '@/config'

const allDemos = getCachedDemos()

export const headerDemos: Array<DemoProps> = headerPages.map((id) => {
  const match = allDemos.find(demo => demo.id === id)
  if (!match) throw new Error(`could not find demo with id '${id}'`)
  return match
})

export default function DefaultNavbar() {
  return (
    <TopBar canToggleFullscreen={false} headerDemos={headerDemos} />
  )
}
