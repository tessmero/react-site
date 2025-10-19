import { Button } from '@/components/material-tailwind-components'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type ButtonTagProps = {
  icon: IconDefinition
  onClick: (e?: React.MouseEvent) => void
  label: string
}

export function ButtonTag({ icon, label, onClick }: ButtonTagProps) {
  return (
    <Button
      size="sm"
      variant="outlined"
      className="flex items-center px-2 py-1 mx-1 my-1 h-5 text-[10px]
            bg-neutral-0
            border border-gray-300 hover:border-gray-500 rounded-sm
            hover:bg-neutral-100  light:text-neutral-900 dark:hover:bg-neutral-700
            cursor-pointer"
      onClick={onClick}
    >
      <FontAwesomeIcon className="mr-1 my-1" icon={icon} />
      <span className="inline-block align-text-middle">{label}</span>
    </Button>
  )
}
