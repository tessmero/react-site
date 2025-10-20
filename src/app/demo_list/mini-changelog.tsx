// client component for changelog page
'use client'

import { ChangelogEntry } from '@/parsers/changelogs-parser'
import parse from 'html-react-parser'

type MiniChangelogProps = {
  entries: Array<ChangelogEntry>
}

function EntryElem({ entry}: { entry: ChangelogEntry }) {
  return (
    <div className="group relative flex gap-x-2">
      <div className="relative
            group-last:after:hidden
            after:absolute after:top-[4] after:bottom-[-11px] after:start-3 after:w-px
            after:-translate-x-[-3.5px] after:bg-gray-500 dark:after:bg-neutral-700
            "
      >
        <div className="relative z-10 size-8 flex justify-center items-center">
          <div
            className="mt-[-15] h-full w-full rounded-full bg-gray-500"
            style={{ width: 10, height: 10 }}
          />
        </div>
      </div>

      <div className="grow pb-3 group-last:pb-0">
        <h3 className="mb-1 text-xs text-gray-600 dark:text-neutral-400">
          {entry.date.sDate}
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
    <section className="px-1 py-1">
      <div className="w-full max-w-xl mx-auto">
        {entries.map((entry, key) => (
          <EntryElem key={key} entry={entry}></EntryElem>
        ))}
      </div>
    </section>
  )
}
