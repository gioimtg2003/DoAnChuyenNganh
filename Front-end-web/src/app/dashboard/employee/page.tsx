"use client";

import { selectedPage } from "@/app/lib/util/selectedPage";
import { useCallback, useContext, useEffect, useState } from "react";
import { NavLinkContext } from "@/app/lib/context/LinkContext";
import { NotificationContext } from "@/app/lib/context/NotificationContext";
import { DataGridView } from "@/components/dataGridView/DataGridView";
import { columns } from "@/app/lib/data";
import { ModalPopUp } from "@/app/ui/components/modal/ModalPopUp";
import { Button, Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import type { AddEmployeeFieldType, Employee } from "@/app/lib/Types";
import { useStaff } from "@/app/lib/context/StaffContext";
import { AddEmployee } from "@/app/lib/service/user";
import { useFetch } from "@/app/lib/hook/fetch";
import { useWrapperContext } from "@/app/lib/context/wrapper/WrapperContext";

const optionDataGridView = {
    gridType: "employee",
    row: {
        height: 20,
    },
};

export default function EmployeePage(): JSX.Element {
    const { apiNotification, contextHolder } = useContext(NotificationContext);
    const [isOpenPopUp, setIsOpenPopUp] = useState(false);
    const { state, GetEmployee, UpdateStatus } = useStaff();
    const [reLoad, setReLoad] = useState<boolean | null>(null);
    const { data: employeeSource } = useFetch(
        "/user/shop/employee",
        {},
        reLoad
    );
    const { stateLink, dispatchLink } = useContext(NavLinkContext);
    const [form] = Form.useForm();
    const { state: StateEvent } = useWrapperContext();
    useEffect(() => {
        window.document.title = "Employee";
        selectedPage(dispatchLink, 1);
        GetEmployee(employeeSource as Employee[]);
    }, [employeeSource, dispatchLink, GetEmployee]);

    useEffect(() => {
        if (StateEvent.events.statusShipper) {
            let data = [
                {
                    Id: StateEvent.events.statusShipper.id,
                    Status: StateEvent.events.statusShipper.status,
                },
            ];
            UpdateStatus(data);
        }
    }, [StateEvent.events.statusShipper, UpdateStatus]);

    const onFinish = async (values: AddEmployeeFieldType) => {
        try {
            let data = await AddEmployee(values);
            form.resetFields();
            setIsOpenPopUp(!isOpenPopUp);
            setReLoad(!reLoad);
            apiNotification.success({
                message: "Success",
                description: data?.message ?? "Success",
            });
        } catch (err: any) {
            apiNotification.error({
                message: "Error",
                description: err?.message ?? "Error",
            });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const OnClosePopUp = useCallback(() => {
        setIsOpenPopUp(!isOpenPopUp);
    }, [isOpenPopUp]);

    return (
        <>
            {contextHolder}
            <ModalPopUp open={isOpenPopUp} onClose={OnClosePopUp}>
                <div className="w-full flex justify-center items-center mb-2 text-xl">
                    <p>Thêm mới nhân viên </p>
                </div>

                <Form
                    form={form}
                    name="basic"
                    style={{ maxWidth: 500 }}
                    initialValues={{ position: "shipper" }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className="flex flex-row justify-around items-center">
                        <Form.Item<AddEmployeeFieldType>
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 22 }}
                            label="First Name"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<AddEmployeeFieldType>
                            label="Last Name"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 22 }}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <Form.Item<AddEmployeeFieldType>
                        name="position"
                        label="Position"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 23 }}
                    >
                        <Select placeholder="select Position">
                            <Option value="shipper">Shipper</Option>
                            <Option value="staff">Staff</Option>
                        </Select>
                    </Form.Item>
                    <div className="flex flex-row justify-around items-center">
                        <Form.Item<AddEmployeeFieldType>
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 22 }}
                            label="Phone Number"
                            name="Phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Phone!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<AddEmployeeFieldType>
                            label="Email Address"
                            name="Email"
                            rules={[
                                {
                                    required: true,
                                    type: "email",
                                    message: "Please input Email!",
                                },
                            ]}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 22 }}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <Form.Item<AddEmployeeFieldType>
                        label="Address"
                        name="Address"
                        rules={[
                            {
                                required: true,
                                message: "Please input Email!",
                            },
                        ]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 23 }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-primary-1-color w-2/4"
                        >
                            Thêm mới
                        </Button>
                    </Form.Item>
                </Form>
            </ModalPopUp>
            <div className="w-full flex flex-row justify-center items-center">
                <div className="w-4/5 shadow-xl rounded-md my-8 border-2 border-gray-200 hover:shadow-2xl">
                    <div className="p-8">
                        <div className="w-full flex flex-row items-center justify-between pb-2 border-b-2 border-primary-2-color">
                            <div className="text-2xl font-normal">
                                <h1>Nhân viên</h1>
                            </div>
                            <div className="transition-shadow shadow-md p-2 rounded-md bg-primary-1-color hover:shadow-lg">
                                <button
                                    className="font-normal text-white"
                                    onClick={OnClosePopUp}
                                >
                                    Thêm nhân viên mới
                                </button>
                            </div>
                        </div>
                        <DataGridView
                            columns={columns}
                            dataSources={state}
                            options={optionDataGridView}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
