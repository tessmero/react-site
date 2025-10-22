import { headerDemos } from '../page'
import { TopBar } from '../top-bar'

export default function MusicNavbar() {
  return (
    <TopBar canToggleFullscreen={false} headerDemos={headerDemos} />
  )
}
