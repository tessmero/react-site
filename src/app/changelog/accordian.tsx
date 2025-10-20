'use client'

// https://www.material-tailwind.com/docs/html/accordion

import React, { useState } from 'react'

type AccordionProps = {
  title: React.ReactNode
  children: React.ReactNode
}

export default function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="max-w-30">
      <button
        type="button"
        className="w-full h-1 flex justify-between items-center py-2 font-semibold text-sm  light:text-gray-800 dark:text-neutral-200"
        onClick={() => setOpen(v => !v)}
      >
        <b>{title}</b>
        <span className="transition-transform duration-300">
          {open
            ? (
                // up icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                  <path
                    fillRule="evenodd"
                    d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              )
            : (
                // down icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                  <path
                    fillRule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-40' : 'max-h-0'}`}
      >
        <div className="pb-2 text-sm">{children}</div>
      </div>
    </div>
  )
}
