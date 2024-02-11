"use client";

import { NavLinkContext, ActionType } from "@/app/lib/context/LinkContext";
import { use, useContext, useState } from "react";
import { Link as TypeLink } from "./Links";
import Link from "next/link";
import Image from "next/image";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Badge, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7DCBF7",
      light: "#7DCBF7",
      dark: "#7DCBF7",
      contrastText: "#000000",
    },
  },
});

const colorSelected = (type: string, selected: boolean | undefined): string => {
  switch (type) {
    case "icon":
      return selected ? "text-primary-1-color" : "text-primary-2-color";
    case "text":
      return selected ? "text-primary-1-color" : "text-gray-600";
    default:
      return "text-primary-2-color";
  }
};
export function NavWeb(): JSX.Element {
  const [stateLink, dispatchLink] = useContext(NavLinkContext);
  const [navLink, setNavLink] = useState(stateLink);
  return (
    <>
      <header className="w-full py-2 md:p-0 h-screen md:h-full md:border-b-2">
        <div className="md:flex md:flex-row md:items-center md:py-4">
          <div className="flex pl-2 relative w-full  flex-row items-center md:w-2/12 lg:w-3/12">
            <div className="w-2/12 md:w-20">
              <Image
                src="/images/logo-1.png"
                alt="logo"
                width={80}
                height={80}
                className="rounded-full hover:cursor-pointer"
              />
            </div>
            <div className="w-6/12 md:w-full">
              <h1 className="text-2xl font-bold text-primary-1-color ml-4 hover:cursor-pointer lg:text-lg md:text-sm ">
                Quản lý giao hàng
              </h1>
            </div>
            <div className="w-4/12 md:hidden">
              <div className=" flex pr-8 justify-end md:hidden">
                <IoClose className="size-10 md:size-7" />
              </div>
            </div>
          </div>
          <nav className="pl-4 md:w-6/12 lg:w-7/12">
            <ul className="md:flex md:flex-row">
              {navLink.map((link: TypeLink, key: number) => {
                return (
                  <li
                    key={key}
                    className={`${key > 0 ? "lg:ml-4 md:ml-2" : ""}`}
                  >
                    <div className="flex flex-row pb-4  items-center md:pb-0">
                      {
                        <link.icon
                          className={
                            colorSelected("icon", link.selected) +
                            " size-10 md:size-6 lg:size-7"
                          }
                        />
                      }
                      <Link
                        href={link.url}
                        className={
                          colorSelected("text", link.selected) +
                          " ml-4 md:ml-1 lg:text-base md:text-sm"
                        }
                        onClick={() => {
                          dispatchLink({
                            type: ActionType.SELECT,
                            index: key,
                          });
                        }}
                      >
                        {link.name}
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="hidden md:block w-1/12 md:w-3/12 lg:w-2/12">
            <div className="px-6 w-full flex flex-row justify-around items-center">
              <ThemeProvider theme={theme}>
                <Badge color="primary" badgeContent={10} max={9}>
                  <NotificationsActiveIcon className="size-6 text-gray-600" />
                </Badge>
              </ThemeProvider>
              <div className="w-full flex justify-center hover:cursor-pointer">
                <p>Logout</p>
                <IoLogOutOutline className="size-6 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
