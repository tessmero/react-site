'use client'

import React from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { Button, Collapse, IconButtonProps, Navbar, Typography } from '@/components/material-tailwind-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { DemoProps } from '@/parsers/demos-parser'

type NavLinkProps = {
  label: string
  href: string
}
function NavLink({ label, href }: NavLinkProps) {
  return (
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="font-medium h-full"
      style={{ height: '100%' }}
    >
      <a
        href={href}
        className="flex items-center w-full h-full px-2 hover:text-blue-500 transition-colors"
        style={{ minHeight: '2.5rem' }}
      >
        {label}
      </a>
    </Typography>
  )
}

function NavList({ headerDemos }: TopBarProps) {
  return (
    <ul
      className="my-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-stretch"
      style={{ gap: 0 }}
    >
      {headerDemos.map((demo, key) => (
        <NavLink key={key} href={`/${demo.id}`} label={demo.title} />
      ))}
      <NavLink href="/demo_list" label="More..." />
      <NavLink href="/changelog" label="Changelog" />
    </ul>
  )
}

// button on left for small screens - replacement for material-tailwind component
function IconButton({ onClick, children }: IconButtonProps) {
  return (
    <button
      className="
    relative align-middle select-none font-sans font-medium text-center
    uppercase transition-all disabled:opacity-50 disabled:shadow-none
    disabled:pointer-events-none max-w-[40px] max-h-[40px] rounded-lg
    text-xs ml-auto h-6 w-6 text-inherit hover:bg-transparent
    focus:bg-transparent active:bg-transparent lg:hidden"
      type="button"
      onClick={onClick}
    >
      <span className="">
        {children}
      </span>
    </button>
  )
}

export type TopBarProps = {
  canToggleFullscreen: boolean
  headerDemos: Array<DemoProps>
}

export function TopBar(props: TopBarProps) {
  const [openNav, setOpenNav] = React.useState(false)

  // collapse navbar when screen size increases past breakpoint
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false) // should match --breakpoint-lg in global.css

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  function toggleFullscreen() {
    const iframe = document.getElementById('gameFrame')
    if (iframe && !document.fullscreenElement) {
      iframe.requestFullscreen()
    }
  }

  return (
    <Navbar className="
      text-gray-600 dark:text-neutral-400 dark:bg-neutral-900
      mx-auto max-w-screen-xl px-6"
    >
      <div className="flex items-center justify-between text-blue-gray-900">

        <div className="flex">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="h6"
              className="mr-4 cursor-pointer py-1.5"
            >
              tessmero.github.io
            </Typography>
          </Link>

          {props.canToggleFullscreen && (
            <Button
              size="sm"
              variant="outlined"
              className="flex items-center px-2 py-1 border-gray-300"
              onClick={toggleFullscreen}
            >
              <FontAwesomeIcon className="my-1" icon={faExpand} />
            </Button>
          )}
        </div>

        <div className="hidden lg:block">
          <NavList {...props} />
        </div>

        <IconButton onClick={() => setOpenNav(!openNav)}>
          {openNav
            ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              )
            : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
        </IconButton>
      </div>
      <Collapse open={openNav} className="lg:hidden overflow-hidden">
        <NavList {...props} />
      </Collapse>
    </Navbar>
  )
}
