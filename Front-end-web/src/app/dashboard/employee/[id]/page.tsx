"use client";
import Card from "@/app/ui/components/Cart";
import { SupervisedUserCircleOutlined } from "@mui/icons-material";
import { Avatar } from "antd";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaRegClock, FaRegWindowClose, FaStar } from "react-icons/fa";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { GoLocation } from "react-icons/go";
import { BsBoxSeam } from "react-icons/bs";
import { NumberToPrice } from "@/app/lib/util/numberToPrice";
import { IoPricetagsOutline } from "react-icons/io5";
import { axiosInstance } from "@/app/lib/util/axios";
interface Data {
    totalCancel: number;
    totalCompleted: number;
    Name: string;
    Phone: string;
    Email: string;
    OnlineTotal: string;
}
export default function PageDetails() {
    const router = usePathname();
    const [metric, setMetric] = useState<Data>({} as Data);

    const idShipper = useMemo(
        () => router.split("/").slice(3, 4).join(""),
        [router]
    );
    useEffect(() => {
        (async (id) => {
            const getData = await axiosInstance().get(
                `/user/shop/employee/details/${id}`
            );
            setMetric(getData.data.data);
            console.log(getData.data.data);
        })(idShipper);
    }, []);
    return (
        <div className="w-full grid grid-cols-3 grid-rows-2 gap-5 mt-8 px-5">
            <Card className={"bg-[#D2E0FB] col-span-1 row-span-2 w-full"}>
                <div className="w-full flex flex-row justify-center items-center">
                    <Avatar
                        size={112}
                        icon={<SupervisedUserCircleOutlined />}
                        className="w-2/6"
                    />
                    <div className="w-4/6 flex flex-col justify-center items-start pl-3">
                        <p className="text-start text-2xl font-bold text-[#19385D] mb-2">
                            {metric.Name}
                        </p>
                        <div className="w-4/5 flex flex-row items-center">
                            <FaStar className="text-primary-1-color mr-2" />
                            <p className="text-primary-1-color">
                                Nhan vien tich cuc
                            </p>
                        </div>
                    </div>
                </div>
                <div className="h-[2px] w-full bg-primary-1-color/15 mt-4 rounded-lg"></div>
                <div className="px-4 w-full mt-4">
                    <div className="flex flex-row justify-center items-center">
                        <div className="w-1/5 text-center">
                            <FaHeadphonesSimple
                                className="text-[#008DDA]"
                                size={32}
                            />
                        </div>
                        <div className="w-4/5">
                            <p className="text-[#19385D] text-lg font-medium">
                                {metric.Phone}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center items-center mt-4">
                        <div className="w-1/5 text-center">
                            <GoLocation className="text-[#008DDA]" size={32} />
                        </div>
                        <div className="w-4/5">
                            <p className="text-[#19385D] text-lg font-medium">
                                {metric.Email}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
            <Card className={"bg-[#DFCCFB] "}>
                <div className="flex w-full justify-center">
                    <p className="text-xl font-semibold text-[#19385D]">
                        Tổng đơn hàng thành công
                    </p>
                </div>
                <div className="flex flex-row w-full justify-center items-center mt-2">
                    <p className="text-3xl font-semibold text-[#756AB6]">
                        {metric.totalCompleted}
                    </p>
                    <BsBoxSeam
                        size={32}
                        className="text-primary-1-color text-center ml-3"
                    />
                </div>
            </Card>
            <Card className={"bg-[#FFEEF4]"}>
                <div className="flex w-full justify-center">
                    <p className="text-xl font-semibold text-[#19385D]">
                        Tổng đơn thu nhập
                    </p>
                </div>
                <div className="flex flex-row w-full justify-center items-center mt-2">
                    <p className="text-2xl font-semibold text-[#51829B]">
                        {NumberToPrice(30000)}
                    </p>
                    <IoPricetagsOutline
                        size={28}
                        className="text-primary-1-color text-center ml-3"
                    />
                </div>
            </Card>
            <Card className={"bg-[#FAF3F0]"}>
                <div className="flex w-full justify-center">
                    <p className="text-xl font-semibold text-[#19385D]">
                        Tổng đơn hủy
                    </p>
                </div>
                <div className="flex flex-row w-full justify-center items-center mt-2">
                    <p className="text-3xl font-semibold text-[#D37676]">
                        {metric.totalCancel}
                    </p>
                    <FaRegWindowClose
                        size={32}
                        className="text-[#FF8080] text-center ml-3"
                    />
                </div>
            </Card>
            <Card className={"bg-[#F7FFE5]"}>
                <div className="flex w-full justify-center">
                    <p className="text-xl font-semibold text-[#19385D]">
                        Tổng thời gian hoạt động
                    </p>
                </div>
                <div className="flex flex-row w-full justify-center items-center mt-2">
                    <p className="text-xl font-medium text-primary-2-color">
                        {metric.OnlineTotal}
                    </p>
                    <FaRegClock
                        size={32}
                        className="text-primary-1-color text-center ml-3"
                    />
                </div>
            </Card>
        </div>
    );
}
