import React from 'react'

type TooltipProps = {
  children: React.ReactNode
  tooltip: string
  position?: 'above' | 'below'
}

export function Tooltip({ children, tooltip, position = 'above' }: TooltipProps) {
  const tooltipPositionClass = position === 'above'
    ? 'bottom-full mb-2'
    : 'top-full mt-2'
  return (
    <span className="relative group">
      {children}
      <span
        className={`absolute left-1/2 -translate-x-1/2 ${tooltipPositionClass} px-2 py-1
        rounded bg-gray-900 text-white text-xs whitespace-nowrap opacity-0
        group-hover:opacity-100 transition-opacity duration-300
        pointer-events-none z-10 shadow-lg`}
      >
        {tooltip}
      </span>
    </span>
  )
}
