// client component for demo_list page
'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, Card, CardBody, CardHeader } from '@/components/material-tailwind-components'
import { DemoCard } from './demo-card/demo-card'
import { DemoProps } from '@/parsers/demos-parser'
import { Checkbox } from '@/components/checkbox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { ReportsDialog } from './reports-dialog'
import { MusicPlayer } from '@/components/music-player'

const FILTERS = ['reports', 'music', 'sound', 'multitouch', 'physics', 'three-js'] as const
export type Filter = (typeof FILTERS)[number]

const FILTER_LABELS = {
  'reports': 'Reports',
  'music': 'Music',
  'sound': 'Sound',
  'multitouch': 'Multitouch',
  'physics': 'Physics',
  'three-js': 'Three.js',
} as const satisfies Record<Filter, string>

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
}

// demos' metadata loaded from _demos folder (page.tsx)
export default function DemoList({ demos }: DemoListProps) {
  // filter and sort demos in list
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('dateAdded')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  // show one demo as selected
  const [selectedDemoId, setSelectedDemoId] = useState<string | undefined>(undefined)
  // ref map for demo cards
  const demoRefs = React.useRef<{ [id: string]: HTMLDivElement | null }>({})

  // show reports dialog for one demo
  const [reportsDialogOpen, setReportsDialogOpen] = useState(false)
  const handleReportsDialogOpen = (demoId?: string) => {
    setSelectedDemoId(demoId)
    setReportsDialogOpen(open => !open)
  }

  // show music player
  const [musicPlayerOpen, setMusicPlayerOpen] = useState(false)

  // clicked checkbox at top -> add or remove one filter
  const handleCheckboxChange = (label: Filter, checked: boolean) => {
    setSelectedDemoId(undefined)
    setSelectedFilters(prev =>
      checked ? [...prev, label] : prev.filter(f => f !== label),
    )
  }

  const handleClickPlay = (demoId: string, e?: React.MouseEvent) => {
    e?.stopPropagation() // prevent expanding card while next page loads
    window.location.href = `/${demoId}`
  }

  // clicked tag in demo card -> select one filter and deselect all others
  const handleClickTag = (tag: Filter, e?: React.MouseEvent) => {
    if (selectedFilters.length === 1 && selectedFilters[0] === tag) {
      return // do nothing, let event propogate to card
    }
    e?.stopPropagation()

    setSelectedDemoId(undefined)
    setSelectedFilters([tag])
    if (tag === 'music')
      setMusicPlayerOpen(true)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Sorting logic
  const handleSort = (key: SortKey) => {
    setSelectedDemoId(undefined)
    if (sortKey === key) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'))
    }
    else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  // Filter demos
  const filteredDemos = demos.filter(demo =>
    !demo.hidden
    && selectedFilters.every(filter => checkFilter(filter as Filter, demo)),
  )

  // deselect selectedDemoId if not in filteredDemos
  React.useEffect(() => {
    if (selectedDemoId && !filteredDemos.some(d => d.id === selectedDemoId)) {
      setSelectedDemoId(undefined)
    }
  }, [selectedFilters, demos, selectedDemoId, filteredDemos])

  // Sort demos (memoized)
  const sortedDemos = React.useMemo(() => {
    const arr = [...filteredDemos]
    if (sortKey) {
      arr.sort((a, b) => {
        const aVal = getSortValue(a, sortKey)
        const bVal = getSortValue(b, sortKey)
        if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
        if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
        return 0
      })
    }
    return arr
  }, [filteredDemos, sortKey, sortDir])

  // scroll selected demo into view if needed
  React.useEffect(() => {
    if (selectedDemoId && demoRefs.current[selectedDemoId]) {
      demoRefs.current[selectedDemoId]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [selectedDemoId, sortedDemos])

  // button at top of demo_list used to sort demos
  function SortButton({ label, buttonKey }: SortButtonProps) {
    const isActive = buttonKey === sortKey
    return (
      <Button
        size="sm"
        variant="outlined"
        className={`
          dark:text-neutral-100 flex items-center px-2 py-1 
          bg-emerald-300 dark:bg-emerald-700 dark:border-none
        ${isActive ? 'font-bold border-black' : ''}
        `}
        onClick={() => handleSort(buttonKey)}
      >
        <FontAwesomeIcon
          className={`mr-1 my-1 ${isActive ? '' : 'opacity-50'}`}
          icon={isActive ? (sortDir === 'asc' ? faSortUp : faSortDown) : faSort}
        />
        <span className="inline-block align-text-middle text-nowrap">{label}</span>
      </Button>
    )
  }

  // show one demo as selected
  const handleClickCard = (demoId?: string) => {
    setSelectedDemoId(demoId)
  }

  return (
    <section className="xl:px-80 lg:px-40 md:px-15 sm:px-10 py-10 h-full">
      <Card shadow={false} className="border-none bg-transparent">
        <CardHeader
          shadow={false}
          floated={false}
          className="flex overflow-visible gap-y-0 flex-wrap mt-0 items-start justify-between rounded-none bg-transparent"
        >
          <div className="flex flex-col">

            <div className="flex flex-wrap items-center gap-2 m-2">
              <SortButton
                label="Title"
                buttonKey="title"
              />
              <SortButton
                label="Date Added"
                buttonKey="dateAdded"
              />
              <SortButton
                label="Date Updated"
                buttonKey="dateUpdated"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 m-2">
              {/* {selectedFilters.length > 0
              ? (
                  <Button
                    onClick={() => setSelectedFilters([])}
                    size="sm"
                    variant="outlined"
                    className="dark:text-neutral-400 flex items-center px-2 py-1 border-gray-300"
                  >
                    Clear Filters
                  </Button>
                )
              : (
                  <span className="text-gray-600 dark:text-neutral-400 text-sm">
                    Filter:
                  </span>
                )} */}
              <span className="text-gray-600 dark:text-neutral-400 text-sm">
                Filter:
              </span>

              <div
                key={selectedFilters.join(',') /* re-render on changing filters */}
                className="flex flex-wrap items-center gap-2 m-0"
              >

                {FILTERS.map(filter => (
                  <Checkbox
                    key={filter}
                    label={FILTER_LABELS[filter]}
                    checked={selectedFilters.includes(filter)}
                    onChange={e => handleCheckboxChange(filter, e.target.checked)}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="grid xl:grid-cols-2 md:grid-cols-2 sx:grid-cols-1 gap-4 px-4 items-start">

          <AnimatePresence>
            {sortedDemos.map((demo: DemoProps) => (
              <motion.div
                key={demo.id}
                layout
                ref={(el) => { demoRefs.current[demo.id] = el }}
                // transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                // transition={{ type: 'tween' }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
              >
                <DemoCard
                  demo={demo}
                  isSelected={demo.id === selectedDemoId}
                  onClickPlay={e => handleClickPlay(demo.id, e)}
                  onViewReports={() => handleReportsDialogOpen(demo.id)}
                  onClickTag={handleClickTag}
                  onClickCard={() => handleClickCard(demo.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </CardBody>
      </Card>

      <ReportsDialog
        demo={demos.find(({ id }) => id === selectedDemoId)}
        open={reportsDialogOpen}
        handleOpen={handleReportsDialogOpen}
      />

      { musicPlayerOpen
        && <MusicPlayer setMusicPlayerOpen={setMusicPlayerOpen} />}
    </section>
  )
}
