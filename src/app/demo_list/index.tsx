// client component for demo_list page
'use client'


import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader } from "@/components/material-tailwind-components";
import { DemoCard } from "./demo-card";
import { DemoProps } from "@/parsers/demos-parser";
import { Checkbox } from "@/components/checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";


const FILTERS = ["Reports", "Music", "Sound", "Multitouch", "Physics", "Three.js"] as const
type Filter = (typeof FILTERS)[number]

type DemoListProps = {
  demos: DemoProps[]
}

function checkFilter( filter: Filter, demo: DemoProps ): boolean {
  if( filter === 'Reports' )
    return !!demo.hasReports
  if( filter === 'Music' )
    return !!demo.music
  if( filter === 'Sound' )
    return !!demo.sound

  // filter is a tech
  if( !demo.techs ) return false
  return demo.techs.includes(filter.toLowerCase().replace('.','-'))
}

// get value for purposes of sorting demos
function getSortValue(demo: DemoProps, sortKey: string ): number | string {
  if (sortKey === 'title') {
    return demo.title.toLowerCase()
  } else if (sortKey === 'dateAdded') {
    return demo.date.getTime()
  } else if (sortKey === 'dateUpdated') {
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
function SortButton( {label,buttonKey,activeKey,activeDir,handleSort}: SortButtonProps ){
  const isActive = buttonKey === activeKey
  return (
    <Button
      size="sm"
      variant='outlined'
      className={`flex items-center px-2 py-1 border-gray-300 ${isActive ? 'font-bold' : ''}`}
      onClick={() => handleSort(buttonKey)}
    >
      <FontAwesomeIcon
        className={`mr-1 my-1 ${isActive ? '' : 'opacity-50'}`}
        icon={isActive ? (activeDir === 'asc' ? faSortUp : faSortDown ) : faSort}
      />
      <span className="inline-block align-text-middle text-nowrap">{label}</span>
    </Button>
  )
}

// demos' metadata loaded from _demos folder (page.tsx)
export default function DemoList({ demos }: DemoListProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const handleCheckboxChange = (label: string, checked: boolean) => {
    setSelectedFilters((prev) =>
      checked ? [...prev, label] : prev.filter((f) => f !== label)
    );
  };

  // Sorting logic
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  // Filter demos
  const filteredDemos = demos.filter((demo) =>
    !demo.hidden &&
    selectedFilters.every((filter) => checkFilter(filter as Filter, demo))
  );

  // Sort demos
  const sortedDemos = [...filteredDemos];
  if (sortKey) {
    sortedDemos.sort((a, b) => {
      const aVal = getSortValue(a,sortKey)
      const bVal = getSortValue(b,sortKey)
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return (
    <section className="xl:px-30 lg:px-20 md:px-10 py-10">
      <Card shadow={false} className="border border-gray-300">
        <CardHeader
          shadow={false}
          floated={false}
          className="flex overflow-visible gap-y-4 flex-wrap items-start justify-between rounded-none"
        >
          <div className="flex flex-wrap items-center gap-2 m-4">
            <SortButton label='Title' 
              buttonKey='title' activeKey={sortKey} activeDir={sortDir} handleSort={handleSort}/>
            <SortButton label='Date Added' 
              buttonKey='dateAdded' activeKey={sortKey} activeDir={sortDir} handleSort={handleSort}/>
            <SortButton label='Date Updated' 
              buttonKey='dateUpdated' activeKey={sortKey} activeDir={sortDir} handleSort={handleSort}/>
          </div>

          <div className="flex flex-wrap items-center gap-2 m-5">
            <span className="text-gray-600 dark:text-neutral-400 text-sm">Filter:</span>
            {FILTERS.map((label) => (
              <Checkbox
                key={label}
                label={label}
                checked={selectedFilters.includes(label)}
                onChange={(e) => handleCheckboxChange(label, e.target.checked)}
              />
            ))}
          </div>
        </CardHeader>
        <CardBody className="grid xl:grid-cols-3 md:grid-cols-2 sx:grid-cols-1 gap-4 px-4">
          {sortedDemos.map((props: DemoProps) => (
            <DemoCard key={props.id} {...props} />
          ))}
        </CardBody>
      </Card>
    </section>
  );
}
