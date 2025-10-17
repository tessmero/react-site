'use client';


import React from "react";

import {
  Card,
  Button,
  CardBody,
  Typography,
} from "@material-tailwind/react";

import Image from 'next/image'
import { DemoProps } from "@/demos-parser";


export function DemoCard(demo: DemoProps) {
  return (
    <Card className="border border-gray-300 overflow-hidden shadow-sm">
      <CardBody className="p-4">
        <Typography
          color="blue-gray"
          className="!text-base !font-semibold mb-1"
        >
          CARDNUM
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
                {JSON.stringify(demo.changelog)}
              </Typography>
            </div>
          </div>
          <Button size="sm" variant="outlined" className="border-gray-300">
            see collection
          </Button>
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
        </div>
      </CardBody>
    </Card>
  );
}