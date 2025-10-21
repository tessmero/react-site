import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type IconButtonProps = {
  onClick: () => void
  icon: IconDefinition
  className?: string
}

export function IconButton({ onClick, icon, className }: IconButtonProps) {
  return (
    <button
      className={`
        ${className ?? ''}
        relative align-middle
        max-w-[40px] max-h-[40px] rounded-lg
        ml-auto h-6 w-6 text-inherit
        bg-transparent text-slate-300 hover:text-slate-100 transition-colors
      `}
      type="button"
      onClick={onClick}
    >
      <span className="">
        <FontAwesomeIcon className="my-1" icon={icon} />
      </span>
    </button>
  )
}
