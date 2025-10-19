import { headerDemos } from '../page'
import { TopBar } from '../top-bar'

export default function DemoListNavbar() {
  return (
    <TopBar canToggleFullscreen={false} headerDemos={headerDemos} />
  )
}
