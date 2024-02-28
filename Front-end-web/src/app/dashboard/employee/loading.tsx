"use client";
import React from "react";
import { Flex, Spin } from "antd";

const LoadingDashboard: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Flex gap="small" vertical className="w-full">
        <Spin size="large" className="size-36"></Spin>
      </Flex>
    </div>
  );
};

export default LoadingDashboard;
