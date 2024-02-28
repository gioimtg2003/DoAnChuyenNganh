"use client";

import SearchInput from "@/app/ui/components/SearchProduct";
import { FiPlusCircle } from "react-icons/fi";
import { Button, Form, Input, Popconfirm, Select } from "antd";
import { SelectOptionProps } from "@/app/ui/components/seletectOption/SelectOptionProps";
import { FaFilterCircleDollar } from "react-icons/fa6";
import { VscListSelection } from "react-icons/vsc";
import {
  use,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DataGridView } from "@/app/ui/components/dataGridView/DataGridView";
import {
  AddProductFieldType,
  DatagridViewColumn,
  OptionsDatagridView,
} from "@/app/lib/Types";
import { useProduct } from "@/app/lib/context/product/Context";
import { ModalPopUp } from "@/app/ui/components/modal/ModalPopUp";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { Option } from "antd/es/mentions";
import UploadFile from "@/app/ui/components/Upload";
import { axiosInstance } from "@/app/lib/util/axios";
import { NotificationContext } from "@/app/lib/context/NotificationContext";
import { NavLinkContext } from "@/app/lib/context/LinkContext";
import { selectedPage } from "@/app/lib/util/selectedPage";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { EmployeeStatus } from "@/app/ui/components/Tag";
import style from "./styles.module.css";

const columns: DatagridViewColumn[] = [
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

const options: OptionsDatagridView = {
  style: {
    header: {
      textHeaderColor: "text-white",
      bgColor: "bg-primary-1-color",
      height: 10,
    },
  },
  gridType: "product",
};

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

const FormProduct: React.FC<{ options: any; open: () => void }> = ({
  options,
  open,
}) => {
  const { apiNotification, contextHolder } = useContext(NotificationContext);
  const { reload } = useProduct();
  const [fileSelected, setFileSelected] = useState<any>(null);
  const [form] = Form.useForm();

  const onFileChange = (event: any) => {
    event.preventDefault();
    console.log(event.target.files[0]);
    setFileSelected(event.target.files[0]);
  };
  const onFinish = (values: AddProductFieldType) => {
    const formData = new FormData();
    formData.append("image", fileSelected, fileSelected.name);
    formData.append("category", values.Category);
    formData.append("name", values.Name);
    formData.append("price", String(values.Price));
    formData.append("stock", String(values.Stock));
    formData.append("description", "description");

    axiosInstance(true)
      .post("/product", formData)
      .then((res) => {
        console.log(res.data);
        apiNotification.success({
          message: "Success",
          description: res.data?.message ?? "Success",
        });
        form.resetFields();
        reload();
        open();
      })
      .catch((err) => {
        apiNotification.error({
          message: "Error",
          description: err.response?.data.message ?? "Error",
        });
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        style={{ maxWidth: 500 }}
        initialValues={{ position: "shipper" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item<AddProductFieldType>
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 22 }}
          label="Product Name"
          name="Name"
          rules={[
            {
              required: true,
              message: "Please input Name Product!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<AddProductFieldType>
          name="Category"
          label="Category"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 23 }}
          rules={[
            {
              required: true,
              message: "Please select category!",
            },
          ]}
        >
          <Select placeholder="Select Category">
            {options?.map((item: any, index: number) => (
              <Option key={item._id} value={item._id}>
                {item.Name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="flex flex-row justify-around items-center">
          <Form.Item<AddProductFieldType>
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
            label="Price"
            name="Price"
            rules={[
              {
                required: true,
                message: "Please input Price!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<AddProductFieldType>
            label="Stock"
            name="Stock"
            rules={[
              {
                required: true,
                message: "Please input Stock!",
              },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 22 }}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item<AddProductFieldType>
          label="Image"
          name="Image"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 23 }}
        >
          <UploadFile setFile={onFileChange} url={fileSelected} />
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
    </>
  );
};

const items = [
  {
    key: "1",
    label: "Thêm mới sản phẩm",
    children: null,
    Icon: <AppleOutlined />,
  },
  {
    key: "2",
    label: "Thêm mới thể loại",
    children: <h1>hello</h1>,
    Icon: <AppleOutlined />,
  },
];

export default function ProductPage() {
  const { ProductState, setFilter, Categories } = useProduct();
  const [open, setOpen] = useState(false);
  const [valueInput, setValueInput] = useState<AddProductFieldType>({} as any);
  const onchange = () => {
    setOpen(!open);
  };
  const onChangeCategory = (value: string) => {
    setFilter("category", value);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const onChangePrice = (value: string) => {
    setFilter("price", value);
  };

  const onChangeRevenue = (value: string) => {
    setFilter("revenue", value);
  };
  // const submit = () => {

  // };
  const CategoryOptions = useMemo(() => {
    let options: any[] = [];
    Categories?.map((item) => {
      options.push({ value: item._id, label: item.Name });
    });
    options.unshift({ value: "", label: "Tất cả" });
    return options;
  }, [Categories]);
  const { stateLink, dispatchLink } = useContext(NavLinkContext);

  useEffect(() => {
    window.document.title = "Product";
    selectedPage(dispatchLink, 2);
  }, [dispatchLink]);

  const itemsTab = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        children: item.key === "1" && (
          <FormProduct open={onchange} options={Categories} />
        ),
      })),
    [Categories]
  );

  const confirmDelete = useCallback((e: MouseEvent) => {
    console.log(e);
  }, []);
  const dataSources = useMemo(() => {
    return ProductState?.map((item) => {
      return {
        ...item,
        Action: (
          <div className="flex flex-row justify-around items-center">
            <button className="text-primary-1-color">
              <FaEdit />
            </button>
            <Popconfirm
              title="Delete the product"
              description="Are you sure to delete this Product?"
              okText="Yes"
              cancelText="No"
            >
              <button className="text-red-500">
                <RiDeleteBin6Line />
              </button>
            </Popconfirm>
          </div>
        ),
        Name: (
          <div className="flex flex-row justify-start items-center">
            <img
              src={item.ImageUrl}
              alt={item.Name}
              className="w-10 h-10 object-cover rounded-md shadow-sm"
            />
            <span className="ml-3">{item.Name}</span>
          </div>
        ),
      };
    });
  }, [ProductState, setFilter]);
  return (
    <section className="w-full flex justify-center bg-background-product pb-10 ">
      <ModalPopUp open={open} onClose={onchange}>
        <Tabs defaultActiveKey="0" items={itemsTab} />
      </ModalPopUp>
      <div className="w-10/12 max-lg:w-full">
        <div className="w-full mt-10 md:flex md:flex-row-reverse md:items-center">
          <div className="w-8/12 flex flex-row md:justify-end max-md:w-full max-md:mb-6">
            <button
              className="py-2 px-5 bg-primary-1-color rounded-md flex justify-around items-center text-white shadow-md shadow-primary-2-color"
              onClick={onchange}
            >
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
                onChange={onChangeCategory}
                onSearch={onSearch}
                filterOption={filterOption}
                options={CategoryOptions}
                notFoundContent="Không tìm thấy thể loại nào"
                suffixIcon={<VscListSelection />}
                className="w-8/12"
              />
            </div>
            <div className="w-4/12 flex flex-row justify-around items-center pl-4">
              <span className="text-gray-500 w-4/12">Giá tiền:</span>
              <Select
                placeholder="Sắp xếp theo giá"
                onChange={onChangePrice}
                options={optionsFilter}
                suffixIcon={<FaFilterCircleDollar />}
                className="w-8/12"
              />
            </div>
            <div className="w-4/12 flex flex-row justify-around items-center pl-4">
              <span className="text-gray-500 w-4/12">Doanh thu:</span>
              <Select
                placeholder="Sắp xếp theo doanh thu"
                onChange={onChangeRevenue}
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
          {/* <input
            type="file"
            formEncType="multipart/form-data"
            accept="image/*"
            onChange={onFileChange}
          />
          <button onClick={submit}>Up load</button> */}
        </div>
        <div className="">
          <DataGridView
            options={options}
            columns={columns}
            dataSources={dataSources}
          />
        </div>
      </div>
    </section>
  );
}
