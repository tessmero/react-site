// client component for demo_list page
'use client'


import React, { useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from "@/components/material-tailwind-components";
import { DemoCard } from "./demo-card";
import { DemoProps } from "@/parsers/demos-parser";
import { Checkbox } from "@/components/checkbox";


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

// demos' metadata loaded from _demos folder (page.tsx)
export default function DemoList({ demos }: DemoListProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleCheckboxChange = (label: string, checked: boolean) => {
    setSelectedFilters((prev) =>
      checked ? [...prev, label] : prev.filter((f) => f !== label)
    );
  };

  // Adjust this filter logic based on your DemoProps structure
  const filteredDemos = demos.filter((demo) =>
        !demo.hidden &&
        selectedFilters.every((filter) =>
          checkFilter(filter as Filter,demo)
        )
      );

  return (
    <section className="xl:px-30 lg:px-20 md:px-10 py-10">
      <Card shadow={false} className="border border-gray-300">
        <CardHeader
          shadow={false}
          floated={false}
          className="flex overflow-visible gap-y-4 flex-wrap items-start justify-between rounded-none"
        >
          <div className="flex flex-wrap items-center gap-2 m-4">
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
        <CardBody className="grid xl:grid-cols-3 grid-cols-1 gap-4 px-4">
          {filteredDemos.map((props: DemoProps, key: number) => (
            <DemoCard key={key} {...props} />
          ))}
        </CardBody>
      </Card>
    </section>
  );
}
