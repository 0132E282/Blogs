import {
  ColumnDef,
  ColumnFiltersTableState,
  ColumnOrderTableState,
  ColumnPinningTableState,
  ColumnSizingTableState,
  ExpandedState,
  ExpandedTableState,
  GroupingTableState,
  OnChangeFn,
  PaginationState,
  PaginationTableState,
  Row,
  RowSelectionTableState,
  SortingState,
  SortingTableState,
  VisibilityTableState,
} from "@tanstack/react-table";
import { ReactElement, ReactNode } from "react";

export type TypeActionDataTable = {
  title: string;
  icon: ReactNode | string | undefined | ReactElement;
  onClick?: () => void;
  path?: string;
};

export type ActionTable<TData> = {
  label?: string;
  text: string;
  variables?: string;
  classname?: string;
  icon?: ReactNode | string | undefined | ReactElement;
  onClick?: (rows: Row<TData>[]) => void;
  path?: string;
};

export type UseDataTableProps<TData, TValue = unknown> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onSortingChange?: OnChangeFn<SortingState>;
  onExpandedChange?: OnChangeFn<ExpandedState>;
  getSubRows?: (originalRow: TData, index: number) => undefined | TData[];
  onPaginationChange?: OnChangeFn<PaginationState>;
  getRowId: (originalRow: TData, index: number, parent?: Row<TData>) => string | number;
  state?: Partial<
    VisibilityTableState & ColumnOrderTableState & ColumnPinningTableState & ColumnFiltersTableState & SortingTableState & ExpandedTableState & GroupingTableState & ColumnSizingTableState & PaginationTableState & RowSelectionTableState
  >;
};
