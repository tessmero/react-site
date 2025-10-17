
// client component for changelog page 
'use client'

import { ChangelogEntry, GroupedChangelogEntry } from "@/parsers/changelogs-parser"
import dateformat from 'dateformat'
import parse from 'html-react-parser';
import Accordion from "./accordian";


import Image from 'next/image'
type ChangelogProps = {
  entries: Array<ChangelogEntry | GroupedChangelogEntry>
}

function IconElem({entry}:{entry: ChangelogEntry | GroupedChangelogEntry} ){
  if( 'subjectIds' in entry ){
    // entry is group, show stacked icons
    return (
      <div className="mt-8 relative h-[30px] w-[30px] flex items-center">
        {entry.subjectIds.slice(0,5).map((id, key) => (
          <Image
            key={key}
            width="200"
            height="200"
            src={`/images/thumbnails/${id}.png`}
            className="absolute top-0 left-0 object-cover rounded-xl shadow-lg"
            style={{ top: `${key * 10}px`, zIndex: entry.subjectIds.length - key }}
            alt="name"
          />
        ))}
      </div>
    )
  } else {
    // entry is not group, show one icon
    let src
    if( entry.subjectId === 'website' ){
      src =`/images/thumbnails/recursio.png`
    } else {
      // subject is demo
      src =`/images/thumbnails/${entry.subjectId}.png`
    }
    return (
      <Image
        width="200"
        height="200"
        src={src}
        className="mt-8 h-full w-full object-cover rounded-xl"
        alt="name"
      />
    )
  }
}

function SubjectElem({entry}:{entry: ChangelogEntry | GroupedChangelogEntry} ){
  
  if( 'subjectTitles' in entry ){
    // entry is group
    return (
      <Accordion title={`${entry.subjectIds.length} Demos...`}>
        <ul>
          {entry.subjectTitles.map((subject, key) => (
            <li key={key}>{subject}</li>
          ))}
        </ul>
      </Accordion>
    );
  } else {
    // entry is not group
    return (
      <p className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
        <b>{entry.subjectTitle}</b>
      </p>
    )
  }
}

function EntryElem({entry}:{entry: ChangelogEntry | GroupedChangelogEntry} ){
    return (
      <div className="group relative flex gap-x-8">
        <div className="relative 
            group-last:after:hidden 
            after:absolute after:top-8 after:bottom-[-20px] after:start-3 after:w-px 
            after:-translate-x-[-5px] after:bg-gray-200 dark:after:bg-neutral-700
            ">
          <div className="relative z-10 size-8 flex justify-center items-center">
            <IconElem entry={entry}></IconElem>
          </div>
        </div>

        <div className="grow pb-8 group-last:pb-0">
          <h3 className="mb-1 text-xs text-gray-600 dark:text-neutral-400">
            {dateformat(entry.date, 'yyyy-mm-dd')}
          </h3>

          <SubjectElem entry={entry}></SubjectElem>
          
          <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
            {parse(entry.description)}
          </p>
        </div>
      </div>
  )
}

// demos' metadata loaded from _demos folder (page.tsx)
export default function Changelog({entries}: ChangelogProps) {
  return (
    <section className="px-8 py-10">
      <div className="w-full max-w-xl mx-auto">
        {entries.map((entry, key) => (
          <EntryElem key={key} entry={entry}></EntryElem>
        ))}
      </div>
    </section>
  )
}