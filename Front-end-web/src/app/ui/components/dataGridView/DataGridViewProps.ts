import type { Employee, OptionsDatagridView } from "@/app/lib/Types";

export interface DataGridViewProps<U extends Employee, V extends any[]> {
  dataSources: U[];
  readonly columns: V;
  options: OptionsDatagridView;
  onRowClick?: (row: U) => void;
  onCellClick?: (row: U, column: V) => void;
}
