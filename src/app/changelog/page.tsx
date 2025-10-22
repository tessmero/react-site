// server component used to build static changelog page

import { ChangelogEntry, getCachedWebsiteChangelog, getGroupedChangelog } from '@/parsers/changelogs-parser'
import Changelog2 from '.'
import { getCachedDemos } from '@/parsers/demos-parser'

export default function Changelog2Page() {
  // collect entries from all changelogs
  const demos = getCachedDemos()
  const websiteChangelog = getCachedWebsiteChangelog()
  const entries: ChangelogEntry[] = [...websiteChangelog]
  for (const { changelog } of demos) {
    if (changelog) {
      entries.push(...changelog)
    }
  }

  // sort entries and group those with matching date and description
  const groupedEntries = getGroupedChangelog(entries)

  return <Changelog2 entries={groupedEntries} />
}
