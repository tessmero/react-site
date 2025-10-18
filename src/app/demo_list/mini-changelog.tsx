// client component for changelog page
'use client'

import { ChangelogEntry } from '@/parsers/changelogs-parser'
import dateformat from 'dateformat'
import parse from 'html-react-parser'

import Image from 'next/image'
type MiniChangelogProps = {
  entries: Array<ChangelogEntry>
}

function IconElem({ entry}: { entry: ChangelogEntry }) {
  // entry is not group, show one icon
  let src
  if (entry.subjectId === 'website') {
    src = `/images/thumbnails/recursio.png`
  }
  else {
    // subject is demo
    src = `/images/thumbnails/${entry.subjectId}.png`
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

function EntryElem({ entry}: { entry: ChangelogEntry }) {
  return (
    <div className="group relative flex gap-x-8">
      <div className="relative
            group-last:after:hidden
            after:absolute after:top-8 after:bottom-[-20px] after:start-3 after:w-px
            after:-translate-x-[-5px] after:bg-gray-200 dark:after:bg-neutral-700
            "
      >
        <div className="relative z-10 size-8 flex justify-center items-center">
          <IconElem entry={entry}></IconElem>
        </div>
      </div>

      <div className="grow pb-8 group-last:pb-0">
        <h3 className="mb-1 text-xs text-gray-600 dark:text-neutral-400">
          {dateformat(entry.date, 'yyyy-mm-dd')}
        </h3>

        <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
          {parse(entry.description)}
        </p>
      </div>
    </div>
  )
}

export default function MiniChangelog({ entries }: MiniChangelogProps) {
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
