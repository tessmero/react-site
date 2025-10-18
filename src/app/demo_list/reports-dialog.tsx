'use client'

import React from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@/components/material-tailwind-components'

export type ReportsDialogProps = {
  open: boolean
  handleOpen: () => void
  demo: string | undefined
}

export function ReportsDialog({ open, handleOpen, demo }: ReportsDialogProps) {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Its a simple dialog.</DialogHeader>
      <DialogBody>
        <iframe
          className="w-full h-full"
          src={`/iframe/${demo}/reports/index.html`}
          allowFullScreen
        />
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleOpen}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
