import { IconType } from "react-icons";
import { TbFileInvoice } from "react-icons/tb";
import { FiCodesandbox } from "react-icons/fi";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuBarChart3 } from "react-icons/lu";
import { RiDashboardLine } from "react-icons/ri";

export type Link = {
    icon: IconType;
    name: string;
    url: string;
    selected?: boolean | undefined;
};

export const Links: Link[] = [
    {
        icon: RiDashboardLine,
        name: "Dashboard",
        url: "/dashboard",
    },
    {
        icon: FaPeopleGroup,
        name: "Employee",
        url: "/dashboard/employee",
    },
    {
        icon: FiCodesandbox,
        name: "Product",
        url: "/dashboard/product",
    },
    {
        icon: TbFileInvoice,
        name: "Order",
        url: "/dashboard/order",
    },
    {
        icon: LuBarChart3,
        name: "Theo dõi",
        url: "/dashboard/tracking",
    },
];
