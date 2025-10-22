'use client'

import React from 'react'

import {
  Card,
  CardBody,
} from '@/components/material-tailwind-components'

import { Filter } from '..'
import Image from 'next/image'
import { DemoProps } from '@/parsers/demos-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck, faMusic, faPlay, faTag, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import MiniChangelog from '../mini-changelog'
import { IconTag } from './icon-tag'
import { ButtonTag } from './button-tag'

const visibleTechs = ['multitouch', 'physics', 'three-js'] satisfies Array<Filter>
type VisibleTech = (typeof visibleTechs)[number]

export interface DemoCardProps {
  demo: DemoProps
  isSelected: boolean
  onClickPlay: (e?: React.MouseEvent) => void
  onViewReports: () => void // click reports button in card
  onClickTag: (filter: Filter, e?: React.MouseEvent) => void // click tag/icon in card
  onClickCard: () => void // click anywhere else in card
}

export function DemoCard(props: DemoCardProps) {
  const { demo } = props

  function PlayButton(demo: DemoProps) {
    return (
      <a
        onClick={props.onClickPlay}
        className="
          flex items-center px-2 py-1
          rounded text-sm font-medium
          bg-neutral-0
          border border-neutral-500 hover:border-neutral-900
          hover:bg-neutral-100  text-neutral-900 dark:hover:bg-neutral-700
          dark:text-neutral-400
          cursor-pointer"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon className="mr-1 my-1" icon={faPlay} />
        <span className="inline-block align-text-middle text-nowrap">{demo.title}</span>
      </a>
    )
  }

  return (
    <Card
      className={`
        hover:border-gray-500 dark:hover:border-white
        border border-gray-300 overflow-hidden 
        dark:text-neutral-400
        ${props.isSelected
      ? 'bg-neutral-100  dark:bg-neutral-800'
      : 'dark:bg-neutral-900 cursor-pointer'}
      `}
      onClick={props.onClickCard}
    >
      <CardBody className="p-4 z-10">
        <div className="flex">
          <div className="w-30 sm:w-40
          h-25 relative overflow-hidden rounded-xl mr-4"
          >
            <Image
              key={demo.id}
              src={`/images/thumbnails/${demo.id}.png`}
              fill
              className="object-cover"
              alt={demo.title}
            />
          </div>
          <div className="flex flex-col w-full">
            <PlayButton {...demo} />
            <div className="text-sm grid grid-cols-2 grid-rows-2 gap-0 m-1">
              <span className="">Added:</span>
              {' '}
              <span>{demo.date.sDate}</span>
              {demo.lastUpdated && (
                <>
                  <span className="">Updated:</span>
                  <span>{demo.lastUpdated.sDate}</span>
                </>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-0 m-0">
              {demo.music
                && (
                  <IconTag
                    icon={faMusic}
                    onClick={(e?: React.MouseEvent) => props.onClickTag('music', e)}
                    tooltip="has music"
                  />
                )}
              {demo.sound
                && (
                  <IconTag
                    icon={faVolumeUp}
                    onClick={(e?: React.MouseEvent) => props.onClickTag('sound', e)}
                    tooltip="has sound"
                  />
                )}
              {demo.hasReports
                && (
                  <IconTag
                    icon={faListCheck}
                    onClick={(e?: React.MouseEvent) => props.onClickTag('reports', e)}
                    tooltip="has reports"
                  />
                )}
              {(demo.techs ?? []).filter(tech => visibleTechs.includes(tech as VisibleTech)).map((tech, key) => (
                <ButtonTag
                  key={key}
                  onClick={(e?: React.MouseEvent) => props.onClickTag(tech as Filter, e)}
                  icon={faTag}
                  label={tech.replace('-', '.')}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Extra expandable section for changelog + reports */}
        {((demo.changelog && demo.changelog.length > 0) || demo.hasReports)
          && (
            <div
              className={`
                transition-all duration-300 overflow-hidden 
                bg-transparent p-1
                ${props.isSelected ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}
              `}
              style={{ pointerEvents: props.isSelected ? 'auto' : 'none' }}
            >

              <div className="flex items-center justify-end">
                {/* <span>
                  {(demo.changelog && demo.changelog.length > 0) ? 'Changelog' : ''}
                </span> */}
                {demo.hasReports && (
                  <ButtonTag
                    onClick={props.onViewReports}
                    icon={faListCheck}
                    label="View Reports"
                  />
                )}
              </div>

              <div className="overflow-y-auto" style={{ maxHeight: '120px' }}>
                <MiniChangelog entries={demo.changelog}></MiniChangelog>
              </div>

            </div>
          )}
      </CardBody>
    </Card>
  )
}
