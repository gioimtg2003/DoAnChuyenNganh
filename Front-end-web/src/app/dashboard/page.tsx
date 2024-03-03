"use client";

import { useCallback, useContext, useEffect, useReducer } from "react";
import { NavWeb } from "../ui/components/nav/NavWeb";
import { NavLinkContext } from "../lib/context/LinkContext";
import { selectedPage } from "../lib/util/selectedPage";
import { Title } from "../ui/components/dashboard/Title";
import { Card } from "../ui/components/dashboard/Card";
import Link from "next/link";

export default function Dashboard(): JSX.Element {
  const { stateLink, dispatchLink } = useContext(NavLinkContext);
  const selected = useCallback((index: number): void => {
    selectedPage(dispatchLink, index);
  }, []);

  useEffect(() => {
    document.title = "Dashboard";
    selected(0);
  }, []);

  return (
    <>
      <div className="ml-4 mt-4">
        <Title title="Overview" />
        <div className="text-sm text-gray-500">
          <p>
            Chào mừng bạn đến với hệ thống quản lý giao hàng linh hoạt và tiện
            lợi.
          </p>
        </div>
      </div>
      <div className="w-full p-2 grid grid-cols-10 gap-4 max-xl:grid-cols-6 ">
        <div className=" col-span-3 row-span-3 border-solid border-2 border-blue-100 rounded-md shadow-lg max-xl:col-start-1 max-xl:col-end-4 max-xl:row-start-1 max-xl:row-end-3 max-md:col-span-6 max-md:row-span-3">
          {
            <Card
              title="Tổng số sản phẩm."
              description="Tổng số sản phẩm có trong cửa hàng của bạn"
              metric="30"
              link={<Link href="/dashboard/employee">Xem chi tiết</Link>}
              typeChart="line"
            />
          }
        </div>
        <div className="col-span-3 row-span-3 border-solid border-2 border-blue-100 rounded-md shadow-lg max-xl:col-start-4 max-xl:col-end-7 max-xl:row-start-1 max-xl:row-end-3 max-md:col-span-6 max-md:row-span-3">
          {
            <Card
              title="Tổng doanh thu của bạn."
              description="Tổng số doanh thu của cửa hàng bạn."
              metricType={"money"}
              metric="600.000đ"
              link={<Link href="/dashboard/employee">Xem chi tiết</Link>}
              typeChart="line"
            />
          }
        </div>
        <div className="col-span-4 row-span-6 border-solid border-2 border-blue-100 rounded-md shadow-lg max-xl:col-start-1 max-xl:col-end-4 max-xl:row-start-8 max-xl:row-end-12 max-md:col-span-6 max-md:row-span-8">
          {
            <Card
              title="Tổng quan doanh thu trong tuần."
              description="Tổng số doanh thu trong tuần này."
              metric="30"
              link={<Link href="/dashboard/employee">Xem chi tiết</Link>}
              typeChart="column"
            />
          }
        </div>
        <div className="col-span-6 row-span-7 border-solid border-2 border-blue-100 rounded-md shadow-lg max-xl:col-start-1 max-xl:col-end-7 max-xl:row-start-3 max-xl:row-end-8 max-md:col-span-6 max-md:row-span-3">
          {
            <Card
              title="Tổng số sản phẩm 4."
              description="Tổng số sản phẩm có trong cửa hàng của bạn"
              metric="30"
              link={<Link href="/dashboard/employee">Xem chi tiết</Link>}
              typeChart="line"
            />
          }
        </div>
        <div className="col-span-4 row-span-4 border-solid border-2 border-blue-100 rounded-md shadow-lg max-xl:col-start-4 max-xl:col-end-7 max-xl:row-start-8 max-xl:row-end-12 max-md:col-span-6 max-md:row-span-3">
          {
            <Card
              title="Tổng số sản phẩm 5."
              description="Tổng số sản phẩm có trong cửa hàng của bạn"
              metric="30"
              link={<Link href="/dashboard/employee">Xem chi tiết</Link>}
              typeChart="line"
            />
          }
        </div>
      </div>
    </>
  );
}
