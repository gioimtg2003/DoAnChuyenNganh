"use client";

import { selectedPage } from "@/app/lib/util/selectedPage";
import { useContext, useEffect } from "react";
import { NavLinkContext } from "@/app/lib/context/LinkContext";
import { NotificationContext } from "@/app/lib/context/NotificationContext";
import { DataGridView } from "@/components/dataGridView/DataGridView";
import { columns, employeeData } from "@/app/lib/data";

const optionDataGridView = {
  gridType: "employee",
  row: {
    height: 20,
  },
};

export default function EmployeePage(): JSX.Element {
  const { stateLink, dispatchLink } = useContext(NavLinkContext);
  const { apiNotification, contextHolder } = useContext(NotificationContext);
  useEffect(() => {
    selectedPage(dispatchLink, 1);
  }, []);

  return (
    <>
      {contextHolder}
      <div className="w-full flex flex-row justify-center items-center">
        <div className="w-3/4 shadow-xl rounded-md my-8 border-2 border-gray-200 hover:shadow-2xl">
          <div className="p-8">
            <div className="w-full flex flex-row items-center justify-between pb-2 border-b-2 border-primary-2-color">
              <div className="text-2xl font-normal">
                <h1>Nhân viên</h1>
              </div>
              <div className="transition-shadow shadow-md p-2 rounded-md bg-primary-1-color hover:shadow-lg">
                <button className="font-normal text-white">
                  Thêm nhân viên mới
                </button>
              </div>
            </div>
            <DataGridView
              columns={columns}
              dataSources={employeeData}
              options={optionDataGridView}
            />
          </div>
        </div>
      </div>
    </>
  );
}
