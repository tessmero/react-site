
// server component used to build static changelog page

import { ChangelogEntry, getCachedWebsiteChangelog, getGroupedChangelog } from "@/changelogs-parser";
import Changelog from ".";
import { getCachedDemos } from "@/demos-parser";

export default function ChangelogPage() {

  // collect entries from all changelogs
  const demos = getCachedDemos();
  const websiteChangelog = getCachedWebsiteChangelog()
  const entries: ChangelogEntry[] = [...websiteChangelog]
  for( const {changelog} of demos ){
    if( changelog ){
      entries.push(...changelog)
    }
  }

  // sort entries and group those with matching date and description
  const groupedEntries = getGroupedChangelog(entries)
  
  return <Changelog entries={groupedEntries}/>;
}
