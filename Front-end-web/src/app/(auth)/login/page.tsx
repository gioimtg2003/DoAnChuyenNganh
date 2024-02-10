"use client";
import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import Link from "next/link";
import { Axios } from "@/app/lib/util/axios";
import { setToken } from "@/app/lib/hook/useToken";
import { useRouter } from "next/navigation";

const axios = new Axios().getInstance();

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

function Login(): JSX.Element {
  const router = useRouter();

  const onFinish = (values: FieldType) => {
    const { email, password, remember } = values;
    axios
      .post("/auth/login", {
        email: email,
        password: password,
      })
      .then((res: any) => {
        let data = {
          accessToken: res.data.data.accessToken,
          refreshToken: res.data.data.refreshToken,
          exp: res.data.data.exp,
        };

        setToken(data);
        messageApi.success("Login success!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      })
      .catch((err: any) => {
        console.log(err.response);
        messageApi.open({
          type: "error",
          content: err.response.data?.message || "Login failed!",
          duration: 3,
        });
      });
  };

  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    document.title = "Login";
    localStorage.clear();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="content flex flex-row pt-40 pb-3 justify-center items-center">
        <div className="w-7/12 lg:w-6/12 xl:w-5/12 text-center">
          <h1 className="text-wrap text-4xl text-sky-700 font-bold">Login</h1>
          <p className="pt-4 text-slate-500">
            Vui lòng nhập đầy đủ thông tin đăng nhập.
          </p>
        </div>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className="max-w-md"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Ghi nhớ mật khẩu</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div className="sm:flex w-full items-center justify-center">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 w-32 mr-2"
            >
              Submit
            </Button>
          </div>
        </Form.Item>
        <p className="text-center">
          Bạn chưa có tài khoản?{" "}
          <Link href="/register" className="text-blue-600">
            Đăng ký
          </Link>
        </p>
      </Form>
    </>
  );
}

export default Login;
