'use client'

import { ChangelogEntry } from "@/changelogs-parser"
import { DemoProps } from "@/demos-parser"

type ChangelogProps = {
  entries: ChangelogEntry[]
}

// demos' metadata loaded from _demos folder (page.tsx)
export default function Changelog({entries}: ChangelogProps) {
  return (
    <section className="px-8 py-10">
      {entries.map((entry: ChangelogEntry, key: number) => (
        <p key={key}>{JSON.stringify(entry)}</p>
      ))}
    </section>
  )
}