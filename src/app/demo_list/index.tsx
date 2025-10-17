'use client'

import {
  Card,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

import { DemoCard } from "./demo-card";
import { DemoProps } from "@/demos-parser";


type DemoListProps = {
  demos: DemoProps[]
}

// demos' metadata loaded from _demos folder (page.tsx)
export default function DemoList({demos}: DemoListProps) {
  return (
    <section className="px-8 py-10">
      <Card shadow={false} className="border border-gray-300">
        <CardHeader
          shadow={false}
          floated={false}
          className="flex overflow-visible gap-y-4 flex-wrap items-start justify-between rounded-none"
        >
          <div>
            <Typography
              color="blue-gray"
              variant="h1"
              className="!text-2xl mb-1"
            >
              Top Creators
            </Typography>
            <Typography
              color="blue-gray"
              className="!text-lg font-normal text-gray-600"
            >
              The most sought-after collections across the entire ecosystem.
            </Typography>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button size="sm" variant="outlined" className="border-gray-300">
              Last 24h
            </Button>
            <Button size="sm" variant="outlined" className="border-gray-300">
              Last week
            </Button>
            <Button size="sm" variant="outlined">
              Last month
            </Button>
          </div>
        </CardHeader>
        <CardBody className="grid xl:grid-cols-3 grid-cols-1 gap-4 px-4">
          {demos.map((props: DemoProps, key: number) => (
            <DemoCard key={key} {...props} />
          ))}
        </CardBody>
      </Card>
    </section>
  );
}
