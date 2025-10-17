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
        <div className="my-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div>
              <Typography color="blue-gray" variant="h6">
                {demo.title}
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="font-medium"
              >
                {JSON.stringify(demo)}
              </Typography>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
            <Image
              width="200"
              height="200"
              key={demo.id}
              src={`/images/thumbnails/${demo.id}.png`}
              className="h-full w-full object-cover rounded-xl"
              alt="name"
            />
            <div>
              <Button size="sm" variant="outlined" className="flex items-center px-2 py-1 border-gray-300">
                <FontAwesomeIcon className="mr-1 my-1" icon={faPlay} /> 
                <span className="inline-block align-text-middle text-nowrap">{demo.title}</span>
              </Button>
              {demo.music && <FontAwesomeIcon size="sm"  icon={faMusic} />}
              {demo.sound && <FontAwesomeIcon size="sm"  icon={faVolumeUp} />}
              {(demo.techs ?? []).filter(tech => visibleTechs.includes(tech)).map((tech,key) => (
                <Button key={key} size="sm" 
                    variant="outlined" className="flex items-center px-2 py-1 border-gray-300">
                  <FontAwesomeIcon className="mr-1 my-1" icon={faTag} /> 
                  <span className="inline-block align-text-middle">{tech.replace('-','.')}</span>
                </Button>
              ))}
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