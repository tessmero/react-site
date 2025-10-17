import path from "path";
import fs from "fs";
import matter from "gray-matter";


export interface ChangelogEntry {
    subject: string // demo name or 'website'
    date: Date
    description: string
}


const filePath = path.join(process.cwd(), "_changelogs/website.md");

// Use process-level cache for changelogs metadata
const CHANGELOGS_CACHE_KEY = '__changelogs_metadata_cache__';
export function getCachedWebsiteChangelog(): ChangelogEntry[] {

  console.log('getCachedWebsiteChangelog')

  // avoid re-running expensive operations when reloading page in dev mode
  if (typeof globalThis.process !== 'undefined') {
    const proc = globalThis.process as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!proc[CHANGELOGS_CACHE_KEY]) {

      // one-time build
      console.log('getDemosMetadata')
      const demos = getWebsiteChangelog() // check markdown file
      proc[CHANGELOGS_CACHE_KEY] = demos;
    }
    return proc[CHANGELOGS_CACHE_KEY];
  }

  throw new Error('environment has no process')
  // // fallback for environments without process
  // console.log('getCachedDemos EXPENSIVE FALLBACK')
  // return getDemosMetadata();
}

function getWebsiteChangelog(): ChangelogEntry[] {

    console.log(`parsing website changelog from ${filePath}`)
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

    return parseChangelog(data,filePath)
}


// parse date YYYY-MM-DD
function parseDate( value: string, description: string ){
    if( typeof value !== 'string' )
        throw new Error(`date value is not string: ${description}`)
    const d = new Date(value.split(' ')[0]);
    if (isNaN(d.getTime())) 
        throw new Error(`could not parse date from ${description}: ${value}`)
    return d
}

// extract changelog from frontmatter
export function parseChangelog( data: {changelog?: string[]}, description: string ): ChangelogEntry[]{
  
    const changelog: ChangelogEntry[] = []
    if (data.changelog) {
        if( !Array.isArray(data.changelog) )
            throw new Error(`changelog should be array (or omitted) in ${description}`)
        for( const rawEntry of data.changelog as string[] ){
            changelog.push({
                subject: 'website',
                date: parseDate(rawEntry, 'changelog entry'),
                description: rawEntry.substring( rawEntry.indexOf(' ') + 1 ),
            })
        }
    }
    return changelog
}