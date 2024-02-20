"use client";

import SearchInput from "@/app/ui/components/SearchProduct";
import { FiPlusCircle } from "react-icons/fi";
import { Button, Form, Select, Upload } from "antd";
import { SelectOptionProps } from "@/app/ui/components/seletectOption/SelectOptionProps";
import { FaFilterCircleDollar } from "react-icons/fa6";
import { VscListSelection } from "react-icons/vsc";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import type { GetProp, UploadProps } from "antd";
import { message } from "antd";
import { axiosInstance } from "@/app/lib/util/axios";

const optionsCategory = [
  {
    value: "trà sữa",
    label: "Trà Sữa",
  },
  {
    value: "cà phê",
    label: "Cà Phê",
  },
  {
    value: "sinh tố",
    label: "Sinh Tố",
  },
  {
    value: "trà trái cây",
    label: "Trà Trái Cây",
  },
  {
    value: "nước ép",
    label: "Nước Ép",
  },
];

let optionsFilter: SelectOptionProps[] = [
  { value: "MAX_TO_MIN", label: "Lớn đến nhỏ" },
  { value: "MIN_TO_MAX", label: "Nhỏ đến lớn" },
];

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

export default function ProductPage() {
  const [fileSelected, setFileSelected] = useState<any>(null);
  const onFileChange = (event: any) => {
    console.log(event.target.files[0]);
    setFileSelected(event.target.files[0]);
  };
  const submit = () => {
    const formData = new FormData();
    formData.append("image", fileSelected, fileSelected.name);
    formData.append("category", "65be4e11d443d573c9dcf091");
    formData.append("name", "ahijihih147");
    formData.append("price", "3432");
    formData.append("stock", "1233");
    formData.append("description", "18d8ajdad");

    axiosInstance(true)
      .post("/product", formData)
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <section className="w-full flex justify-center bg-background-product h-screen">
      <div className="w-10/12">
        <div className="w-full mt-10 md:flex md:flex-row-reverse md:items-center">
          <div className="w-8/12 flex flex-row md:justify-end max-md:w-full max-md:mb-6">
            <button className="py-2 px-5 bg-primary-1-color rounded-md flex justify-around items-center text-white shadow-md shadow-primary-2-color">
              <FiPlusCircle className="size-5" />
              <span className="font-medium ml-2">Thêm mới</span>
            </button>
          </div>
          <div className="w-4/12 max-md:w-full">
            <SearchInput />
          </div>
        </div>
        <div className="w-full bg-white mt-7 rounded-md shadow-md flex flex-row items-center py-2 px-4">
          <div className="w-9/12 flex flex-row justify-center items-center">
            <div className="w-4/12 flex flex-row justify-around items-center">
              <span className="text-gray-500 w-4/12">Danh mục:</span>
              <Select
                showSearch
                placeholder="Chọn danh mục sản phẩm"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={optionsCategory}
                notFoundContent="Không tìm thấy thể loại nào"
                suffixIcon={<VscListSelection />}
                className="w-8/12"
              />
            </div>
            <div className="w-4/12 flex flex-row justify-around items-center pl-4">
              <span className="text-gray-500 w-4/12">Giá tiền:</span>
              <Select
                placeholder="Sắp xếp theo giá"
                onChange={handleChange}
                options={optionsFilter}
                suffixIcon={<FaFilterCircleDollar />}
                className="w-8/12"
              />
            </div>
            <div className="w-4/12 flex flex-row justify-around items-center pl-4">
              <span className="text-gray-500 w-4/12">Doanh thu:</span>
              <Select
                placeholder="Sắp xếp theo doanh thu"
                onChange={handleChange}
                options={optionsFilter}
                className="w-8/12"
                suffixIcon={<FaFilterCircleDollar />}
              />
            </div>
          </div>
          <div className="w-3/12 hidden">
            <button>Lọc</button>
          </div>
        </div>
        <div className="">
          <input
            type="file"
            formEncType="multipart/form-data"
            accept="image/*"
            onChange={onFileChange}
          />
          <button onClick={submit}>Up load</button>
        </div>
      </div>
    </section>
  );
}
