"use client";

import { CreateOrderType, OptionsDatagridView } from "@/app/lib/Types";
import { columnsOrder } from "@/app/lib/constant/columns";
import { NavLinkContext } from "@/app/lib/context/LinkContext";
import { NotificationContext } from "@/app/lib/context/NotificationContext";
import { selectedPage } from "@/app/lib/util/selectedPage";
import { DataGridView } from "@/app/ui/components/dataGridView/DataGridView";
import { ModalPopUp } from "@/app/ui/components/modal/ModalPopUp";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Select,
  Tooltip,
} from "antd";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  FaFilterCircleDollar,
  FaRegAddressBook,
  FaRegMoneyBill1,
} from "react-icons/fa6";
import { FiMinus, FiPlus, FiPlusCircle, FiUserCheck } from "react-icons/fi";
import { VscListSelection } from "react-icons/vsc";
import { AiOutlineExport } from "react-icons/ai";
import { SortOptions, StatusOptions } from "@/app/lib/constant/options";
import { styleVertical } from "@/app/lib/constant/styleFrom";
import { IoPricetagsOutline } from "react-icons/io5";
import { onNumericInputChange } from "@/app/lib/util/handleNumber";
import {
  MdOutlineDeliveryDining,
  MdOutlineDescription,
  MdOutlineSettingsPhone,
} from "react-icons/md";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { ProductProvider, useProduct } from "@/app/lib/context/product/Context";
import { createOrder } from "@/app/lib/service/order";
import { useOrder } from "@/app/lib/context/order/Context";
import { Order } from "@/app/lib/context/order/type";
import { OrderStatus } from "@/app/ui/components/Tag";

const options: OptionsDatagridView = {
  gridType: "order",
  pagination: {
    pageSize: 10,
  },
};

const data = [
  {
    Customer: "Nguyễn Văn A",
    Product: "Iphone 12",
    OrderDate: "2021-10-10",
    PriceTotal: "10,000,000",
    Status: "pending",
    PaymentMethod: "Cash",
    Action: <AiOutlineExport />,
  },
  {
    Customer: "Nguyễn Văn A",
    Product: "Iphone 12",
    OrderDate: "2021-10-10",
    PriceTotal: "10000000",
    Status: "delivery",
    PaymentMethod: "Cash",
    Action: <AiOutlineExport />,
  },
  {
    Customer: "Nguyễn Văn A",
    Product: "Iphone 12",
    OrderDate: "2021-10-10",
    PriceTotal: "10000000",
    Status: "cancel",
    PaymentMethod: "Cash",
    Action: (
      <div className="w-full flex justify-center items-center" title="chi tiết">
        <AiOutlineExport />
      </div>
    ),
  },
  {
    Customer: "Nguyễn Văn A",
    Product: "Iphone 12",
    OrderDate: "2021-10-10",
    PriceTotal: "10000000",
    Status: "success",
    PaymentMethod: "Cash",
    Action: (
      <div className="" title="chi tiết">
        <button>Detail</button>
      </div>
    ),
  },
];

const onChangeOrderStatus = (value: string) => {
  //setFilter("category", value);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const FormOrder = ({
  onCloseModal,
  notification,
}: {
  onCloseModal: () => void;
  notification: any;
}): JSX.Element => {
  const [form] = Form.useForm();
  const [valueQuantity, setValueQuantity] = useState<number>(1);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [valuePrice, setValuePrice] = useState<number>(0);
  const { ProductState } = useProduct();
  const { reload } = useOrder();

  const ProductOptions = useMemo(
    () =>
      ProductState?.map((item) => ({
        label: item.Name,
        value: item._id,
      })),
    [ProductState]
  );

  const onChangeProduct = useCallback((value: string) => {
    const product = ProductState?.find((item) => item._id === value);
    if (product) {
      setValuePrice(product.Price);
      form.setFieldsValue({ Price: product.Price });
    }
  }, []);
  const onFinish = async (values: CreateOrderType) => {
    try {
      let res = await createOrder(values);
      notification.success({
        message: "Success",
        description: res || "Create order success",
      });
      form.resetFields();
      onCloseModal();
      reload();
    } catch (err: any) {
      notification.error({
        message: "Error",
        description: err.message || "Create order error",
      });
    }
  };

  const increaseQuantity = useCallback(() => {
    setValueQuantity((number) => number + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueQuantity]);

  const decreaseQuantity = useCallback(() => {
    if (valueQuantity > 1) {
      setValueQuantity((number) => number - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueQuantity]);

  useEffect(() => {
    let total =
      valueQuantity * form.getFieldValue("Price") -
      form.getFieldValue("ReducedAmount") +
      form.getFieldValue("ShippingAmount");
    setTotalAmount(total);
  }, [valueQuantity, form]);

  return (
    <ConfigProvider
      theme={{
        components: {
          InputNumber: {
            addonBg: "white",
          },
        },
      }}
    >
      <Form
        fields={[
          { name: "Quantity", value: valueQuantity },
          { name: "TotalAmount", value: totalAmount },
          { name: "Price", value: valuePrice },
        ]}
        form={form}
        style={{ maxWidth: "800px" }}
        name="basic"
        autoComplete="off"
        onFinish={onFinish}
        initialValues={{
          ReducedAmount: 0,
          TotalAmount: 0,
          ShippingAmount: 0,
          Price: 1000,
        }}
        {...styleVertical}
        onFieldsChange={(_, allFields) => {
          if (
            _[0]["name"][0] == "ShippingAmount" ||
            _[0]["name"][0] == "ReducedAmount" ||
            _[0]["name"][0] == "Quantity" ||
            _[0]["name"][0] == "ProductId"
          ) {
            const total =
              allFields[5]["value"] * allFields[4]["value"] -
              allFields[6]["value"] +
              allFields[7]["value"];
            setTotalAmount(total);
          }
        }}
      >
        <div className="w-full flex flex-row justify-around items-center">
          <Form.Item<CreateOrderType>
            label="Tên khách hàng"
            name="Name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên khách hàng",
              },
            ]}
            className="w-6/12"
          >
            <Input prefix={<FiUserCheck className="text-gray-500" />} />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="Phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại",
              },
            ]}
            className="ml-4 w-6/12"
          >
            <Input
              prefix={<MdOutlineSettingsPhone className="text-gray-500" />}
            />
          </Form.Item>
        </div>
        <Form.Item<CreateOrderType>
          label="Địa chỉ"
          name="Address"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ",
            },
          ]}
        >
          <Input prefix={<FaRegAddressBook className="text-gray-500" />} />
        </Form.Item>
        <div className="w-full flex flex-row justify-center items-center">
          <Form.Item<CreateOrderType>
            label="Sản phẩm"
            name="ProductId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn sản phẩm",
              },
            ]}
            className=" w-4/12"
          >
            <Select
              showSearch
              placeholder="Chọn sản phẩm"
              optionFilterProp="children"
              onChange={onChangeProduct}
              onSearch={onSearch}
              filterOption={filterOption}
              options={ProductOptions}
              notFoundContent="Không tìm thấy thể loại nào"
              suffixIcon={<VscListSelection className="text-gray-700" />}
            />
          </Form.Item>
          <Form.Item<CreateOrderType>
            label="Giá sản phẩm"
            name="Price"
            className="pl-4 w-4/12"
          >
            <InputNumber
              disabled
              addonBefore={<IoPricetagsOutline className="text-gray-600" />}
              formatter={(value) => {
                return `${onNumericInputChange(value)}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                );
              }}
            />
          </Form.Item>
          <Form.Item<CreateOrderType>
            label="Số lượng"
            name="Quantity"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng",
              },
              {
                type: "number",
                message: "Vui lòng nhập số lượng",
              },
            ]}
            className="pl-4 w-4/12"
            fieldId="Quantity"
          >
            <InputNumber
              width={"100%"}
              min={1}
              max={100}
              onChange={(value) => {
                const parsed = onNumericInputChange(value);
                if (parsed) {
                  setValueQuantity(parsed);
                }
              }}
              addonBefore={
                <FiMinus
                  className="text-red-500 hover:cursor-pointer"
                  onClick={decreaseQuantity}
                />
              }
              addonAfter={
                <FiPlus
                  className="text-blue-500 hover:cursor-pointer"
                  onClick={increaseQuantity}
                />
              }
            />
          </Form.Item>
        </div>
        <div className="w-full flex flex-row justify-center items-center">
          <Form.Item<CreateOrderType>
            label="Giảm giá"
            name="ReducedAmount"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số tiền",
              },
              {
                type: "number",
                message: "Vui lòng nhập số tiền",
              },
            ]}
            fieldId="Quantity"
            className="pl-4 w-4/12"
          >
            <InputNumber
              addonBefore={<FaSortAmountDownAlt className="text-gray-500" />}
              width={"100%"}
              min={0}
              formatter={(value) => {
                return `${onNumericInputChange(value)}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                );
              }}
            />
          </Form.Item>
          <Form.Item<CreateOrderType>
            label="Phí vận chuyển"
            name="ShippingAmount"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số tiền",
              },
              {
                type: "number",
                message: "Vui lòng nhập số tiền",
              },
            ]}
            className="pl-4 w-4/12"
          >
            <InputNumber
              addonBefore={
                <MdOutlineDeliveryDining className="text-gray-500" />
              }
              width={"100%"}
              min={0}
              formatter={(value) => {
                return `${onNumericInputChange(value)}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                );
              }}
            />
          </Form.Item>
          <Form.Item<CreateOrderType>
            label="Tổng giá tiền"
            name="TotalAmount"
            className="pl-4 w-4/12"
          >
            <InputNumber
              addonBefore={<FaRegMoneyBill1 className="text-gray-500" />}
              width={"100%"}
              min={0}
              formatter={(value) => {
                return `${onNumericInputChange(value)}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                );
              }}
              value={totalAmount}
              disabled
            />
          </Form.Item>
        </div>
        <div className="w-full flex flex-row justify-around items-center">
          <Form.Item<CreateOrderType>
            label="Phương thức thanh toán"
            name="PaymentMethod"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn phương thức thanh toán",
              },
            ]}
            className=" w-6/12"
          >
            <Select
              showSearch
              placeholder="Chọn phương thức thanh toán"
              optionFilterProp="children"
              onChange={onChangeProduct}
              onSearch={onSearch}
              filterOption={filterOption}
              options={[{ label: "Tiền mặt", value: "cash" }]}
              notFoundContent="Không tìm thấy thể loại nào"
              suffixIcon={<VscListSelection className="text-gray-700" />}
            />
          </Form.Item>
          <Form.Item<CreateOrderType>
            label="Mô tả"
            name="Description"
            className=" w-6/12 ml-4"
          >
            <Input
              prefix={<MdOutlineDescription className="text-gray-600" />}
            />
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-primary-1-color w-2/4 "
          >
            Thêm mới
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default function ProductPage(): JSX.Element {
  const { stateLink, dispatchLink } = useContext(NavLinkContext);
  const { apiNotification, contextHolder } = useContext(NotificationContext);
  const [modalVisible, setModalVisible] = useState(false);
  const { OrderState, sortItems } = useOrder();
  const onChangeSort = (value: string) => {
    sortItems(value);
  };

  const onChangeModal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  useEffect(() => {
    document.title = "Order";
    selectedPage(dispatchLink, 3);
  }, []);
  const handleDataSources = useMemo(
    () =>
      OrderState?.map((item: Order, key: number) => ({
        Customer: item.Customer,
        ProductName: item.ProductName,
        OrderDate: item.OrderDate,
        AmountTotal: item.AmountTotal,
        Status: item.Status,
        PaymentMethod: item.PaymentMethod,
        Action: (
          <div className="w-full flex flex-row justify-center items-center">
            <Tooltip title="Chi tiết" color={"blue"}>
              <AiOutlineExport className="hover:cursor-pointer" />
            </Tooltip>
          </div>
        ),
      })),
    [OrderState]
  );
  return (
    <>
      {contextHolder}
      <section className="w-full flex justify-center pb-10 ">
        <ModalPopUp open={modalVisible} onClose={onChangeModal}>
          <ProductProvider>
            {modalVisible && (
              <FormOrder
                onCloseModal={onChangeModal}
                notification={apiNotification}
              />
            )}
          </ProductProvider>
        </ModalPopUp>
        <div className="w-10/12 max-lg:w-full">
          <div className="w-full mt-10 md:flex md:flex-row-reverse md:items-center">
            <div className="w-8/12 flex flex-row md:justify-end max-md:w-full max-md:mb-6">
              <button
                className="py-2 px-5 bg-primary-1-color rounded-md flex justify-around items-center text-white shadow-md shadow-primary-2-color"
                onClick={onChangeModal}
              >
                <FiPlusCircle className="size-5" />
                <span className="font-medium ml-2">Thêm mới</span>
              </button>
            </div>
            <div className="w-4/12 max-md:w-full">
              <p>Đơn hàng</p>
            </div>
          </div>
          <div className="w-full bg-white mt-7 rounded-md shadow-md flex flex-row items-center py-2 px-4">
            <div className="w-9/12 flex flex-row justify-start items-center">
              <div className="w-4/12 flex flex-row justify-around items-center">
                <span className="text-gray-500 w-4/12">Trạng thái:</span>
                <Select
                  showSearch
                  placeholder="Trạng thái đơn hàng"
                  optionFilterProp="children"
                  onChange={onChangeOrderStatus}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={StatusOptions}
                  notFoundContent="Không tìm thấy thể loại nào"
                  suffixIcon={<VscListSelection />}
                  className="w-8/12"
                />
              </div>
              <div className="w-4/12 flex flex-row justify-around items-center pl-4">
                <span className="text-gray-500 w-4/12">Giá tiền:</span>
                <Select
                  placeholder="Sắp xếp theo giá"
                  onChange={onChangeSort}
                  options={SortOptions}
                  suffixIcon={<FaFilterCircleDollar />}
                  className="w-8/12"
                />
              </div>
            </div>
            <div className="w-3/12 hidden">
              <button>Lọc</button>
            </div>
          </div>

          <div className=""></div>
          <div className="">
            <DataGridView
              options={options}
              columns={columnsOrder}
              dataSources={handleDataSources}
            />
          </div>
        </div>
      </section>
    </>
  );
}
