// client component for demo_list page
'use client'

import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader } from '@/components/material-tailwind-components'
import { DemoCard } from './demo-card'
import { DemoProps } from '@/parsers/demos-parser'
import { Checkbox } from '@/components/checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { ReportsDialog } from './reports-dialog'

const FILTERS = ['reports', 'music', 'sound', 'multitouch', 'physics', 'three-js'] as const
export type Filter = (typeof FILTERS)[number]

type DemoListProps = {
  demos: DemoProps[]
}

// return true if demo satisfies filter
function checkFilter(filter: Filter, demo: DemoProps): boolean {
  if (filter === 'reports')
    return !!demo.hasReports
  if (filter === 'music')
    return !!demo.music
  if (filter === 'sound')
    return !!demo.sound

  // filter is a tech
  if (!demo.techs) return false
  return demo.techs.includes(filter)
}

// get value for purposes of sorting demos
function getSortValue(demo: DemoProps, sortKey: string): number | string {
  if (sortKey === 'title') {
    return demo.title.toLowerCase()
  }
  else if (sortKey === 'dateAdded') {
    return demo.date.getTime()
  }
  else if (sortKey === 'dateUpdated') {
    return demo.lastUpdated?.getTime() ?? 0
  }
  return 0
}

type SortKey = 'title' | 'dateAdded' | 'dateUpdated' | null
type SortDir = 'asc' | 'desc'
type SortButtonProps = {
  label: string
  buttonKey: SortKey
  activeKey: SortKey
  activeDir: SortDir
  handleSort: (key: SortKey) => void
}

// button at top of demo_list used to sort demos
function SortButton({ label, buttonKey, activeKey, activeDir, handleSort }: SortButtonProps) {
  const isActive = buttonKey === activeKey
  return (
    <Button
      size="sm"
      variant="outlined"
      className={`dark:text-neutral-400 flex items-center px-2 py-1 border-gray-300 ${isActive ? 'font-bold' : ''}`}
      onClick={() => handleSort(buttonKey)}
    >
      <FontAwesomeIcon
        className={`mr-1 my-1 ${isActive ? '' : 'opacity-50'}`}
        icon={isActive ? (activeDir === 'asc' ? faSortUp : faSortDown) : faSort}
      />
      <span className="inline-block align-text-middle text-nowrap">{label}</span>
    </Button>
  )
}

// demos' metadata loaded from _demos folder (page.tsx)
export default function DemoList({ demos }: DemoListProps) {
  // filter and sort demos in list
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [sortKey, setSortKey] = useState<SortKey>(null)
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  // show one demo as selected
  const [selectedDemoId, setSelectedDemoId] = useState<string | undefined>(undefined)
  const handleClickCard = (demoId?: string) => {
    setSelectedDemoId(demoId)
  }

  // show reports dialog for one demo
  const [reportsDialogOpen, setReportsDialogOpen] = useState(false)
  const handleReportsDialogOpen = (demoId?: string) => {
    setSelectedDemoId(demoId)
    setReportsDialogOpen(open => !open)
  }

  // clicked checkbox at top -> add or remove one filter
  const handleCheckboxChange = (label: Filter, checked: boolean) => {
    setSelectedFilters(prev =>
      checked ? [...prev, label] : prev.filter(f => f !== label),
    )
  }

  // clicked tag in demo card -> select one filter and deselect all others
  const handleClickTag = (label: Filter) => {
    setSelectedFilters(() => [label])
  }

  // Sorting logic
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'))
    }
    else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  // Filter demos
  const filteredDemos = demos.filter(demo =>
    !demo.hidden
    && selectedFilters.every(filter => checkFilter(filter as Filter, demo)),
  )

  // Sort demos
  const sortedDemos = [...filteredDemos]
  if (sortKey) {
    sortedDemos.sort((a, b) => {
      const aVal = getSortValue(a, sortKey)
      const bVal = getSortValue(b, sortKey)
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }

  return (
    <section className="xl:px-30 lg:px-20 md:px-10 py-10">
      <Card shadow={false} className="border border-gray-300 dark:bg-neutral-900">
        <CardHeader
          shadow={false}
          floated={false}
          className="flex overflow-visible gap-y-4 flex-wrap items-start justify-between rounded-none dark:bg-neutral-900"
        >
          <div className="flex flex-wrap items-center gap-2 m-4">
            <SortButton
              label="Title"
              buttonKey="title"
              activeKey={sortKey}
              activeDir={sortDir}
              handleSort={handleSort}
            />
            <SortButton
              label="Date Added"
              buttonKey="dateAdded"
              activeKey={sortKey}
              activeDir={sortDir}
              handleSort={handleSort}
            />
            <SortButton
              label="Date Updated"
              buttonKey="dateUpdated"
              activeKey={sortKey}
              activeDir={sortDir}
              handleSort={handleSort}
            />
          </div>

          <div
            key={selectedFilters.join(',') /* re-render on changing filters */}
            className="flex flex-wrap items-center gap-2 m-5"
          >
            <span className="text-gray-600 dark:text-neutral-400 text-sm">Filter:</span>
            {FILTERS.map(label => (
              <Checkbox
                key={label}
                label={label}
                checked={selectedFilters.includes(label)}
                onChange={e => handleCheckboxChange(label, e.target.checked)}
              />
            ))}
          </div>
        </CardHeader>
        <CardBody className="grid xl:grid-cols-3 md:grid-cols-2 sx:grid-cols-1 gap-4 px-4">
          {sortedDemos.map((demo: DemoProps) => (
            <DemoCard
              key={demo.id}
              demo={demo}
              isSelected={demo.id === selectedDemoId}
              onClickCard={() => handleClickCard(demo.id)}
              onViewReports={() => handleReportsDialogOpen(demo.id)}
              onClickTag={handleClickTag}
            />
          ))}
        </CardBody>
      </Card>

      <ReportsDialog demo={selectedDemoId} open={reportsDialogOpen} handleOpen={handleReportsDialogOpen} />
    </section>
  )
}
