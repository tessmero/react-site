import { headerDemos } from '../page'
import { TopBar } from '../top-bar'

export default function DemoNavbar() {
  return (
    <TopBar canToggleFullscreen={true} headerDemos={headerDemos} />
  )
}
