'use client'

import React from 'react'

import {
  Card,
  Button,
  CardBody,
  Typography,
} from '@/components/material-tailwind-components'

import { Filter } from '.'
import Image from 'next/image'
import { DemoProps } from '@/parsers/demos-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic, faPlay, faTag, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import dateformat from 'dateformat'
import MiniChangelog from './mini-changelog'

const visibleTechs = ['multitouch', 'physics', 'three-js'] satisfies Array<Filter>
type VisibleTech = (typeof visibleTechs)[number]

function PlayButton(demo: DemoProps) {
  return (
    <a
      href={`/${demo.id}`}
      className="flex items-center px-2 py-1 border border-gray-300
        rounded hover:bg-gray-100  light:text-gray-900
        text-sm font-medium cursor-pointer transition-shadow shadow-sm"
      style={{ textDecoration: 'none' }}
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon className="mr-1 my-1" icon={faPlay} />
      <span className="inline-block align-text-middle text-nowrap">{demo.title}</span>
    </a>
  )
}

export interface DemoCardProps {
  demo: DemoProps
  isSelected: boolean
  onClickCard: () => void // click anywhere in card
  onViewReports?: () => void // click reports button in card
  onClickTag: (filter: Filter) => void // click tag/icon in card
}

export function DemoCard(props: DemoCardProps) {
  const { demo } = props
  return (
    <Card
      className={`
        cursor-pointer border border-gray-300 overflow-hidden shadow-sm 
        dark:text-neutral-400
        ${props.isSelected
      ? 'bg-neutral-100  dark:bg-neutral-800'
      : 'dark:bg-neutral-900'
    }
      `}
      onClick={props.onClickCard}
    >
      <CardBody className="p-4">
        <Typography
          color="blue-gray"
          className="!text-base !font-semibold mb-1"
        >
          {demo.title}
        </Typography>
        <div className="flex">
          <div className="w-25 h-25 relative overflow-hidden rounded-xl mr-4">
            <Image
              key={demo.id}
              src={`/images/thumbnails/${demo.id}.png`}
              fill
              className="object-cover"
              alt={demo.title}
            />
          </div>
          <div className="flex flex-col w-50">
            <PlayButton {...demo} />
            <div className="text-sm grid grid-cols-2 grid-rows-2 gap-0 m-1">
              <span className="">Added:</span>
              {' '}
              <span>{dateformat(demo.date, 'yyyy-mm-dd')}</span>
              {demo.lastUpdated && (
                <>
                  <span className="">Updated:</span>
                  <span>{dateformat(demo.lastUpdated, 'yyyy-mm-dd')}</span>
                </>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-0 m-0">
              {demo.music
                && (
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    size="sm"
                    icon={faMusic}
                    onClick={() => props.onClickTag('music')}
                  />
                )}
              {demo.sound
                && (
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    size="sm"
                    icon={faVolumeUp}
                    onClick={() => props.onClickTag('sound')}
                  />
                )}
              {(demo.techs ?? []).filter(tech => visibleTechs.includes(tech as VisibleTech)).map((tech, key) => (
                <Button
                  key={key}
                  size="sm"
                  variant="outlined"
                  className="flex items-center px-2 py-1 border-gray-300"
                  onClick={() => props.onClickTag(tech as Filter)}
                >
                  <FontAwesomeIcon className="mr-1 my-1" icon={faTag} />
                  <span className="inline-block align-text-middle">{tech.replace('-', '.')}</span>
                </Button>
              ))}
            </div>
            {demo.hasReports && (
              <Button
                size="sm"
                variant="outlined"
                className="flex items-center px-2 py-1 border-gray-300 mt-2"
                onClick={props.onViewReports}
              >
                <FontAwesomeIcon className="mr-1 my-1" icon={faPlay} />
                <span className="inline-block align-text-middle text-nowrap">View Reports</span>
              </Button>
            )}
          </div>
        </div>

        {/* Extra expandable section for changelog */}
        {demo.changelog && demo.changelog.length > 0
          && (
            <div
              className={`transition-all duration-300 overflow-hidden ${props.isSelected ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'} bg-gray-100 dark:bg-gray-800 rounded p-3`}
              style={{ pointerEvents: props.isSelected ? 'auto' : 'none' }}
            >
              <MiniChangelog entries={demo.changelog}></MiniChangelog>
            </div>
          )}
      </CardBody>
    </Card>
  )
}
