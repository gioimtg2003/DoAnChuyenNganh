"use client";

import { NavLinkContext, ActionType } from "@/app/lib/context/LinkContext";
import { useContext } from "react";
import { Link as TypeLink } from "./Links";
import Link from "next/link";
import Image from "next/image";
import { IoLogOutOutline } from "react-icons/io5";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Badge, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { FaStore } from "react-icons/fa";

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

export function NavWeb(): JSX.Element {
  const [stateLink, dispatchLink] = useContext(NavLinkContext);

  return (
    <header className="fixed top-0 left-0 bg-white w-full h-20 p-0 m-0 border-b-2 border-gray-100 z-0">
      <div className="flex flex-row  justify-center items-center h-full">
        <div className="w-2/12">
          <div className="w-full flex flex-row justify-center items-center">
            <div className="w-4/12">
              <Image
                src="/images/logo-1.png"
                alt="logo"
                width={80}
                height={80}
                className="rounded-full hover:cursor-pointer"
              />
            </div>
            <div className="w-8/12">
              <h1 className="text-lg font-bold text-primary-1-color hover:cursor-pointer">
                Quản lý giao hàng
              </h1>
            </div>
          </div>
        </div>
        <nav className="w-6/12 max-md:hidden flex flex-row h-full">
          {stateLink.map((link: TypeLink, key: number) => {
            let isBorderBottom: string = link.selected
              ? " border-b-2 border-primary-1-color"
              : "";
            return (
              <Link
                key={key}
                href={link.url}
                onClick={() => {
                  dispatchLink({ type: ActionType.SELECT, index: key });
                }}
                className={
                  isBorderBottom +
                  " transition-border duration-150 ease-linear relative z-10  w-1/5 h-full hover:cursor-pointer hover:text-primary-1-color hover:border-b-2 hover:border-primary-2-color"
                }
              >
                <div className="w-full h-full flex justify-center items-center">
                  {
                    <link.icon
                      className={`${link.selected ? "text-primary-1-color" : "text-primary-2-color"} size-7`}
                    />
                  }
                  <span
                    className={`${link.selected ? "text-primary-1-color" : "text-gray-500"} ml-2 text-[1.05rem] text-wrap font-semibold`}
                  >
                    {link.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="w-4/12">
          <div className="w-full flex flex-row justify-between items-center p-4">
            <div className="w-2/5 flex flex-row justify-center items-center hover:cursor-pointer">
              <FaStore className="size-6 text-primary-1-color" />
              <div className="text-sm ml-2">
                <p>Shop Thái Công</p>
              </div>
            </div>
            <div className="w-1/5 hover:cursor-pointer">
              <ThemeProvider theme={theme}>
                <Badge color="primary" badgeContent={10} max={9}>
                  <NotificationsActiveIcon className="size-6 text-gray-600" />
                </Badge>
              </ThemeProvider>
            </div>
            <div className="w-2/5 hover:cursor-pointer flex flex-row justify-center items-center">
              <p>Logout</p>
              <IoLogOutOutline className="size-6 ml-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
