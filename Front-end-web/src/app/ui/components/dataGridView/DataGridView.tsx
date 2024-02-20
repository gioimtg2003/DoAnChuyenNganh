import { DataGridViewProps } from "./DataGridViewProps";
import type { Employee } from "@/app/lib/Types";
import { EmployeeStatus, OrderStatus } from "@/components/Tag";

export function DataGridView({
  dataSources,
  columns,
  options,
}: Readonly<DataGridViewProps<Employee>>): JSX.Element {
  return (
    <table
      className={` w-full table-auto border-separate border-spacing-0 max-md:border-spacing-1 mt-6`}
    >
      <thead>
        <tr>
          <th className="text-center">STT</th>
          {columns.map((column: any, index: number) => (
            <th key={index}>{column["title"]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSources?.map((dataSource: any, index: number) => {
          let tag: any;
          return (
            <tr
              key={index}
              className={
                options?.row?.height
                  ? "h-" + options?.row?.height + " text-center"
                  : "h-20 text-center"
              }
            >
              <td className="border-b-2 border-blue-200">{index}</td>
              {columns.map((column: any, index: number) => {
                if (column["dataIndex"] === "Status") {
                  if (options?.gridType == "employee") {
                    tag = EmployeeStatus(dataSource[column["dataIndex"]]);
                  } else {
                    tag = OrderStatus(dataSource[column["dataIndex"]]);
                  }
                }

                return (
                  <td key={index} className="border-b-2 border-blue-200">
                    {column["dataIndex"] == "Status"
                      ? tag
                      : dataSource[column["dataIndex"]]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
