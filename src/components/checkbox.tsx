import React from 'react'

export interface CheckBoxProps {
  label: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Checkbox(props: CheckBoxProps) {
  const id = React.useId()
  return (
    <div className="text-gray-600 dark:text-neutral-400 inline-flex items-center">
      <label className="flex items-center cursor-pointer relative" htmlFor={id}>
        <input
          type="checkbox"
          className="
            peer h-4 w-4 cursor-pointer transition-all appearance-none
            border border-slate-300 hover:border-black rounded-none
            bg-white dark:bg-neutral-500
            checked:bg-neutral-800 checked:border-neutral-800
            dark:checked:bg-black dark:checked:border-neutral-800
          "
          id={id}
          onChange={props.onChange}
          defaultChecked={props.checked}
        />
        <span className="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
        </span>
      </label>
      <label className="cursor-pointer ml-1 text-sm" htmlFor={id}>
        {props.label}
      </label>
    </div>
  )
}
