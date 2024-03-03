import { useState, useEffect } from "react";
import _ from "lodash";
import { toast } from "react-toastify";

const CreateOrder = () => {
  const [productData, setDataProduct] = useState([]);
  const [methodPayment, setMethodPayment] = useState([]);
  const [statusOrder, setStatusOrder] = useState([]);
  const [productPrice, setProductPrice] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  // Set nút tăng giảm số lượng sản phẩm
  const [quantity, setQuantity] = useState(1);

  // State hóa
  const defaultOrderData = {
    Name: "",
    Phone: "",
    Address: "",
    Product: "",
    Description: "",
    AmountReduced: 0,
    ShippingAmount: 0,
    PaymentMethod: "",
    TotalAmount: 0,
    Quantity: 0,
    Price: 0,
  };
  const validInputsDefault = {
    Name: true,
    Gender: true,
    Phone: true,
    Address: true,
    Product: true,
    quantity: true,
    Description: true,
    AmountReduced: true,
    ShippingAmount: true,
    PaymentMethod: true,
  };

  const [orderData, setOrderData] = useState(defaultOrderData);
  const [validInputs, setValidInput] = useState(validInputsDefault);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      orderData.Quantity = quantity - 1;
      let total =
        productPrice * orderData.Quantity +
        orderData.ShippingAmount -
        orderData.AmountReduced;
      setTotalAmount(total);
    }
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    orderData.Quantity = quantity + 1;
    let total =
      productPrice * orderData.Quantity +
      orderData.ShippingAmount -
      orderData.AmountReduced;
    setTotalAmount(total);
  };

  const handleOnchangeInput = (value: any, name: any) => {
    let _orderData = _.cloneDeep(orderData);
    _orderData[name] = value;
    setOrderData(_orderData);
    let total =
      productPrice * quantity +
      parseInt(_orderData.ShippingAmount.toString()) -
      parseInt(_orderData.AmountReduced.toString());
    setTotalAmount(total);
  };

  const handleOnChangeSelectPrice = (value, name) => {
    let _orderData = _.cloneDeep(orderData);
    _orderData[name] = value;
    setOrderData(_orderData);
    let idProductSelect = value;
    const selectProduct = productData.find(
      (Product) => Product._id === idProductSelect
    );
    const productPrice = selectProduct ? (selectProduct as any)?.Price : 0; // Sử dụng trạng thái productPrice
    setProductPrice(productPrice);
    let total =
      productPrice * quantity +
      parseInt(_orderData.ShippingAmount.toString()) -
      parseInt(_orderData.AmountReduced.toString());
    setTotalAmount(total);
  };

  const validateOrderInput = () => {
    setValidInput(validInputsDefault);
    let arr = ["Name", "Phone", "Address", "Product", "PaymentMethod"];
    let check = true;
    for (let item of arr) {
      if (!orderData[item]) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[item] = false;
        setValidInput(_validInputs);
        toast.error(`${item} không được bỏ trống`);
        check = false;
        break;
      }
    }
    return check;
  };

  // Các nút button
  const handleRefreshData = () => {
    setQuantity(1);
    setOrderData(defaultOrderData);
    setValidInput(validInputsDefault);
    setProductPrice();
    setTotalAmount();
  };

  const handleCreateOrder = async () => {
    orderData.Quantity = quantity;
    orderData.Price = productPrice;
    orderData.TotalAmount = totalAmount;
    console.log("Check Data Create Order: ", orderData);
    let check = validateOrderInput();
    if (check === true) {
      let response = await createOrder(orderData);
      if (response && response.Success === true) {
        toast.success(response.Mess);
        handleRefreshData();
        console.log("Check data respone create order: ", response);
      } else {
        toast.error(response.Mess);
      }
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    fetchMethodPayment();
  }, []);

  const fetchProduct = async () => {
    let response = await getProduct();
    console.log("asdasda", response);
    if (response && response.Success === true) {
      setDataProduct(response.Mess);
    } else {
      toast.error(response.Mess);
    }
  };

  const fetchMethodPayment = async () => {
    let response = await getMethodPayment();
    if (response && response.Success === true) {
      setMethodPayment(response.allMethod);
    } else {
      toast.error(response.Mess);
    }
  };
  return (
    <div className="backgroud">
      <div className="container">
        <div className="form-create">
          <h3>Tạo đơn hàng</h3>
          <div className="line-header"></div>
          <div className="form-create-order">
            <div className="row">
              <div className="col-6 mb-3">
                <label>
                  Tên khách hàng <span className="red">(*)</span> :
                </label>
                <input
                  type="text"
                  className={
                    validInputs.Name
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  id="name"
                  placeholder="Tên khách hàng"
                  required
                  value={orderData.Name}
                  onChange={(event) =>
                    handleOnchangeInput(event.target.value, "Name")
                  }
                />
              </div>
              <div className="col-6 mb-3">
                <label>
                  Số điện thoại<span className="red">(*)</span> :
                </label>
                <input
                  type="text"
                  className={
                    validInputs.Phone
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Số điện thoại"
                  required
                  value={orderData.Phone}
                  onChange={(event) =>
                    handleOnchangeInput(event.target.value, "Phone")
                  }
                />
              </div>
            </div>
            <div className="mb-3">
              <label>
                Địa chỉ<span className="red">(*)</span> :
              </label>
              <input
                type="text"
                className={
                  validInputs.Address
                    ? "form-control"
                    : "form-control is-invalid"
                }
                id="Name"
                placeholder="Địa chỉ"
                required
                value={orderData.Address}
                onChange={(event) =>
                  handleOnchangeInput(event.target.value, "Address")
                }
              />
            </div>

            <div className="row ">
              <div className="col-12 col-sm-4 form-group">
                <label>Sản phẩm</label>
                <select
                  className="form-select"
                  onChange={(event) =>
                    handleOnChangeSelectPrice(event.target.value, "Product")
                  }
                >
                  <option defaultValue={1}>----Chọn sản phẩm----</option>
                  {productData.length > 0 &&
                    productData.map((item, index) => {
                      return (
                        <option key={`group-${index}`} value={item._id}>
                          {item.Name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-12 col-sm-4 form-group ">
                <label>Giá sản phẩm</label>
                <div>
                  <p className="p-price-product">
                    {productPrice ?? "Giá sản phẩm"}
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-4 form-group">
                <label>Số lượng</label>
                <div className="d-flex">
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    className="form-control text-center"
                    readOnly
                    onChange={(event) =>
                      handleOnchangeInput(event.target.value, "Quantity")
                    }
                  />
                  <button
                    className="btn btn-outline-secondary ms-2"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-4 form-group">
                <label>Giảm giá</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  placeholder="Giảm giá"
                  value={orderData.AmountReduced}
                  onChange={(event) =>
                    handleOnchangeInput(event.target.value, "AmountReduced")
                  }
                />
              </div>
              <div className="col-12 col-sm-4 form-group">
                <label>Chi phí vận chuyển</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  placeholder="Chi phí vận chuyển"
                  value={orderData.ShippingAmount}
                  onChange={(event) =>
                    handleOnchangeInput(event.target.value, "ShippingAmount")
                  }
                />
              </div>
              <div className="col-12 col-sm-4 form-group">
                <label>Tổng tiền</label>
                <p className="p-price-product">
                  {totalAmount ? totalAmount : "Tổng tiền"}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-4 form-group">
                <label>Phương thức thanh toán</label>
                <select
                  className="form-select"
                  value={orderData.PaymentMethod}
                  onChange={(event) =>
                    handleOnchangeInput(event.target.value, "PaymentMethod")
                  }
                >
                  <option value={null}>
                    ----Chọn phương thức thanh toán----
                  </option>
                  {methodPayment.length > 0 &&
                    methodPayment.map((item, index) => {
                      return (
                        <>
                          <option key={`group-${index}`} value={item.IdMethod}>
                            {item.Name}
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label>Ghi chú</label>
              <input type="text" className="form-control" id="ShopAddress" />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-success "
                onClick={() => handleCreateOrder()}
              >
                Xác nhận
              </button>
              <button
                type="submit"
                className="btn btn-primary mx-3"
                onClick={() => handleRefreshData()}
              >
                Làm mới
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
