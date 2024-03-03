import { DatagridViewColumn } from "../Types";

export const columnsOrder: DatagridViewColumn[] = [
  {
    title: "Khách hàng",
    dataIndex: "Customer",
    key: "Customer",
  },
  {
    title: "Sản phẩm",
    dataIndex: "Product",
    key: "Product",
  },
  {
    title: "Thời gian",
    dataIndex: "OrderDate",
    key: "OrderDate",
  },
  {
    title: "Tổng tiền",
    dataIndex: "PriceTotal",
    key: "PriceTotal",
  },
  {
    title: "Trạng thái",
    dataIndex: "Status",
    key: "Status",
  },
  {
    title: "Payment",
    dataIndex: "PaymentMethod",
    key: "PaymentMethod",
  },
  {
    title: "Action",
    dataIndex: "Action",
    key: "action",
  },
];

export const columnsProduct: DatagridViewColumn[] = [
  {
    title: "Tên sản phẩm",
    dataIndex: "Name",
    key: "name",
    style: {
      width: "w-3/12",
    },
  },
  {
    title: "Thể loại",
    dataIndex: "Category",
    key: "name",
    style: {
      width: "w-2/12",
    },
  },
  {
    title: "Giá",
    dataIndex: "Price",
    key: "name",
    style: {
      width: "w-2/12",
    },
  },
  {
    title: "Kho",
    dataIndex: "Stock",
    key: "name",
    style: {
      width: "w-1/12",
    },
  },
  {
    title: "Doanh Thu",
    dataIndex: "Revenue",
    key: "name",
    style: {
      width: "w-2/12",
    },
  },
  {
    title: "Hành động",
    dataIndex: "Action",
    key: "name",
    style: {
      width: "w-1/12",
    },
  },
];
