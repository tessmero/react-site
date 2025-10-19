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
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const handleIframeLoad = React.useCallback(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document
      if (!doc) return
      const style = doc.createElement('style')
      style.innerHTML = `* { background: transparent !important; color: #000 !important; }`
      doc.head.appendChild(style)
    }
    catch (_e) {
      // Cross-origin, do nothing
    }
  }, [])

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className={`
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        flex items-center justify-center`}
      style={{
        maxWidth: 800,
      }}
    >
      <div
        className="bg-stone-300 rounded-lg shadow-lg flex flex-col border"
        style={{ maxWidth: 800, maxHeight: 800, width: '100%', height: '100%' }}
      >
        <DialogHeader className="text-black">
          {`${demo?.title} Reports`}
        </DialogHeader>
        <DialogBody className="flex-1 p-5" style={{ height: 500 }}>
          <iframe
            ref={iframeRef}
            className="w-full h-full rounded-b-lg"
            style={{ minHeight: 400, maxHeight: 500, border: 'none' }}
            src={`/iframe/${demo?.id}/reports/index.html`}
            allowFullScreen
            onLoad={handleIframeLoad}
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
