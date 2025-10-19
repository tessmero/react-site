import { Tooltip } from '@/components/tooltip'
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
    <Tooltip tooltip={tooltip}>
      <FontAwesomeIcon
        className="cursor-pointer m-[2px] h-5 w-5"
        size="sm"
        icon={icon}
        onClick={onClick}
      />
    </Tooltip>
  )
}
