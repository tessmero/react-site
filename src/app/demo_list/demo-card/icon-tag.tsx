import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type TagIconProps = {
  icon: IconDefinition
  onClick: (e?: React.MouseEvent) => void
  tooltip: string
}

export function IconTag({ icon, onClick, tooltip }: TagIconProps) {
  return (
    <span className="relative group">
      <FontAwesomeIcon
        className="cursor-pointer m-[2]"
        size="sm"
        icon={icon}
        onClick={onClick}
      />
      <span
        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1
        rounded bg-gray-900 text-white text-xs whitespace-nowrap opacity-0
        group-hover:opacity-100 transition-opacity duration-300
        pointer-events-none z-10 shadow-lg"
      >
        {tooltip}
      </span>
    </span>
  )
}
