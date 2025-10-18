'use client'

import React from 'react'
import {
  Dialog,
  DialogHeader,
  DialogBody,
} from '@/components/material-tailwind-components'
import { DemoProps } from '@/parsers/demos-parser'

export type ReportsDialogProps = {
  open: boolean
  handleOpen: () => void
  demo: DemoProps | undefined
}

export function ReportsDialog({ open, handleOpen, demo }: ReportsDialogProps) {
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className={`
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        flex items-center justify-center`}
      style={{
        maxWidth: 600,
      }}
    >
      <div
        className="bg-white rounded-lg shadow-lg flex flex-col border"
        style={{ maxWidth: 600, maxHeight: 600, width: '100%', height: '100%' }}
      >
        <DialogHeader>
          {demo?.title}
          {' '}
          Reports
        </DialogHeader>
        <DialogBody className="flex-1 p-5" style={{ height: 500 }}>
          <iframe
            className="w-full h-full rounded-b-lg"
            style={{ minHeight: 400, maxHeight: 500, border: 'none' }}
            src={`/iframe/${demo?.id}/reports/index.html`}
            allowFullScreen
          />
        </DialogBody>

        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter> */}
      </div>
    </Dialog>
  )
}
