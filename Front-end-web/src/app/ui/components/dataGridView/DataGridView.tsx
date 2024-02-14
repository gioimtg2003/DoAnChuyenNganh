import { DataGridViewProps } from "./DataGridViewProps";
import type { Employee, OptionsDatagridView } from "@/app/lib/Types";
import { EmployeeStatus, OrderStatus } from "@/components/Tag";
export function DataGridView<T, V>({
  dataSources,
  columns,
  options,
  onRowClick,
  onCellClick,
}: DataGridViewProps<Employee, V[]>): JSX.Element {
  const isOption = "undefined" !== typeof options ? true : false;
  if (isOption) {
    console.log(options);
  }

  return (
    <>
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
          {dataSources.map((dataSource: any, index: number) => (
            <tr
              key={index}
              className={`${options && options.row?.height ? `h-${options.row?.height}` : "h-32"} text-center`}
            >
              <td className="border-b-2 border-blue-200">{index}</td>
              {columns.map((column: any, index: number) => (
                <td key={index} className="border-b-2 border-blue-200">
                  {column["dataIndex"] == "Status"
                    ? options?.gridType == "employee"
                      ? EmployeeStatus(dataSource[column["dataIndex"]])
                      : OrderStatus(dataSource[column["dataIndex"]])
                    : dataSource[column["dataIndex"]]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
