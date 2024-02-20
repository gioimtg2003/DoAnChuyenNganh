"use client";
import React, { use, useCallback, useEffect, useState } from "react";
import { Flex, Spin } from "antd";

const OauthPage: React.FC = () => {
  const [loading, setLoading] = useState("");

  const loading1 = useCallback(() => {
    setLoading("Đang chuyển hướng.");
  }, []);

  const loading2 = useCallback(() => {
    setLoading("Đang chuyển hướng..");
  }, []);

  const loading3 = useCallback(() => {
    setLoading("Đang chuyển hướng...");
  }, []);

  useEffect(() => {
    const interval1 = setInterval(() => {
      loading1();
    }, 500);

    const interval2 = setInterval(() => {
      loading2();
    }, 1000);

    const interval3 = setInterval(() => {
      loading3();
    }, 1500);

    // Clear intervals to prevent memory leaks
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, [loading1, loading2, loading3]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Flex gap="small" vertical className="w-full">
        <Spin size="large" className="size-36" tip={loading}>
          <div className="content text-lg" />
        </Spin>
      </Flex>
    </div>
  );
};

export default OauthPage;
