
// server component used to build static changelog page

import { ChangelogEntry, getCachedWebsiteChangelog } from "@/changelogs-parser";
import Changelog from ".";
import { getCachedDemos } from "@/demos-parser";

export default function ChangelogPage() {
  const demos = getCachedDemos();
  const websiteChangelog = getCachedWebsiteChangelog()

  const entries: ChangelogEntry[] = [...websiteChangelog]
  for( const {changelog} of demos ){
    if( changelog ){
      entries.push(...changelog)
    }
  }

  return <Changelog entries={entries}/>;
}
