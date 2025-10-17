'use client';


import React from "react";

import {
  Card,
  Button,
  CardBody,
  Typography,
} from "@/components/material-tailwind-components";

import Image from 'next/image'
import { DemoProps } from "@/parsers/demos-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faPlay, faTag, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import dateformat from "dateformat";

const visibleTechs = ["multitouch", "physics", "three-js"]

export function DemoCard(demo: DemoProps) {
  return (
    <Card className="border border-gray-300 overflow-hidden shadow-sm">
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
              <Button size="sm" variant="outlined" className="flex items-center px-2 py-1 border-gray-300">
                <FontAwesomeIcon className="mr-1 my-1" icon={faPlay} /> 
                <span className="inline-block align-text-middle text-nowrap">{demo.title}</span>
              </Button>


              <div className="text-sm grid grid-cols-2 grid-rows-2 gap-0 m-1">
                <span className="">Added:</span> <span>{dateformat(demo.date, 'yyyy-mm-dd')}</span>
                
                {demo.lastUpdated && (
                  <span className="">Updated:</span>
                )}
                {demo.lastUpdated && (
                  <span>{dateformat(demo.lastUpdated, 'yyyy-mm-dd')}</span>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-0 m-0">
                {demo.music && <FontAwesomeIcon size="sm"  icon={faMusic} />}
                {demo.sound && <FontAwesomeIcon size="sm"  icon={faVolumeUp} />}
                {(demo.techs ?? []).filter(tech => visibleTechs.includes(tech)).map((tech,key) => (
                  <Button key={key} size="sm" 
                      variant="outlined" className="flex items-center px-2 py-1 border-gray-300">
                    <FontAwesomeIcon className="mr-1 my-1" icon={faTag} /> 
                    <span className="inline-block align-text-middle">{tech.replace('-','.')}</span>
                  </Button>
                ))}
              </div>
              {
                demo.hasReports && (
                  <Button size="sm" variant="outlined" className="flex items-center px-2 py-1 border-gray-300">
                    <FontAwesomeIcon className="mr-1 my-1" icon={faPlay} /> 
                    <span className="inline-block align-text-middle text-nowrap">View Reports</span>
                  </Button>
                )
              }
            </div>
        </div>
      </CardBody>
    </Card>
  );
}