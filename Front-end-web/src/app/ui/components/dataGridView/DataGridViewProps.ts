import type {
  DatagridViewColumn,
  Employee,
  OptionsDatagridView,
} from "@/app/lib/Types";

/**
 * Props of DataGridView
 * @param options Options of table
 * @example
 * let options: OptionsDatagridView = {
 *  gridType: "employee",
 *  pagination: {
 *   pageSize: 10,
 *  },
 * };
 */
export interface DataGridViewProps<U extends Employee> {
  dataSources: U[] | null;
  readonly columns: DatagridViewColumn[];
  options: OptionsDatagridView;
  onRowClick?: (row: U) => void;
  onCellClick?: (row: U, column: DatagridViewColumn) => void;
}
