'use client';

import React from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
 
import { Collapse, IconButtonProps, Navbar, Typography } from "@/components/material-tailwind-components";

function NavList() {
  return (
    <ul className="
      my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="/demo_list" className="flex items-center hover:text-blue-500 transition-colors">
          More...
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="/changelog" className="flex items-center hover:text-blue-500 transition-colors">
          Changelog
        </a>
      </Typography>
    </ul>
  );
}

// replace material-tailwind component
function IconButton({ onClick, children }: IconButtonProps){
  return(
    <button className="
    relative align-middle select-none font-sans font-medium text-center 
    uppercase transition-all disabled:opacity-50 disabled:shadow-none 
    disabled:pointer-events-none max-w-[40px] max-h-[40px] rounded-lg 
    text-xs ml-auto h-6 w-6 text-inherit hover:bg-transparent 
    focus:bg-transparent active:bg-transparent lg:hidden" type="button"
          onClick={onClick}
          >
      <span className="">
        {children}
      </span>
    </button>
  )
}
 
export function TopBar() {
  const [openNav, setOpenNav] = React.useState(false);
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false); // should match --breakpoint-lg in global.css 
 
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
 
  return (
    <Navbar className="
      text-gray-600 dark:text-neutral-400 
      mx-auto max-w-screen-xl px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          tessmero.github.io
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton onClick={() => setOpenNav(!openNav)}>
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav} className="lg:hidden overflow-hidden">
        <NavList />
      </Collapse>
    </Navbar>
  );
}