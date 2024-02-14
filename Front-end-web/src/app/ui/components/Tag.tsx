import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  CarOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";

export const EmployeeStatus = (status: string): JSX.Element => {
  switch (status) {
    case "Active":
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Active
        </Tag>
      );
    case "Offline":
      return (
        <Tag icon={<ClockCircleOutlined />} color="default">
          Offline
        </Tag>
      );
    default:
      return (
        <Tag icon={<MinusCircleOutlined />} color="default">
          Unknown
        </Tag>
      );
  }
};

export const OrderStatus = (status: string): JSX.Element => {
  switch (status) {
    case "pending":
      return (
        <Tag icon={<SyncOutlined spin />} color="processing">
          Đang xử lý
        </Tag>
      );
    case "delivery":
      return (
        <Tag icon={<CarOutlined />} color="lime">
          Đang vận chuyển
        </Tag>
      );
    case "cancel":
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          Đã hủy
        </Tag>
      );
    case "success":
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Thành công
        </Tag>
      );
    default:
      return (
        <Tag icon={<MinusCircleOutlined />} color="default">
          Unknown
        </Tag>
      );
  }
};