'use client'

import React from 'react'

import { Collapse, Navbar, Typography } from '@/components/material-tailwind-components'
import { faBars, faExpand, faX } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { DemoProps } from '@/parsers/demos-parser'
import styles from './top-bar.module.css'
import { Tooltip } from '@/components/tooltip'
import { IconButton } from './icon-button'

type NavLinkProps = {
  label: string
  href: string
}
function NavLink({ label, href }: NavLinkProps) {
  return (
    <Typography
      as="li"
      variant="small"
      className="font-medium h-full"
      style={{ height: '100%' }}
    >
      <a
        href={href}
        className={`${styles.navLink} w-full h-full px-2 font-light hover:font-normal
          text-slate-300 hover:text-slate-100 transition-colors text-right`}
        title={label}
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
    <Navbar className="bg-neutral-700 dark:bg-neutral-800 w-screen-xl px-6 rounded-none border-none outline-none">
      <div className="flex items-center justify-between">

        <div className="flex items-center">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="h6"
              className="mr-4 cursor-pointer py-1.5 text-slate-300 hover:text-slate-100 transition-colors"
            >
              tessmero.github.io
            </Typography>
          </Link>

          {props.canToggleFullscreen && (
            <Tooltip tooltip="toggle fullscreen" position="below">
              <IconButton onClick={toggleFullscreen} icon={faExpand} />
            </Tooltip>
          )}
        </div>

        <div className="flex">
          <div className="hidden lg:block">
            <NavList {...props} />
          </div>
          <IconButton
            className="block lg:hidden"
            onClick={() => setOpenNav(!openNav)}
            icon={openNav ? faX : faBars}
          />
        </div>
      </div>
      <Collapse open={openNav} className="lg:hidden overflow-hidden">
        <NavList {...props} />
      </Collapse>
    </Navbar>
  )
}
