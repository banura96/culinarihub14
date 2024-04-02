import useHttp from "../hooks/useHttp";
import { Button } from "./UIs/Button";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { default as Buttonb } from "react-bootstrap/Button";
import { default as Modalb } from "react-bootstrap/Modal";
import { getAuthToken } from "../utils/auth";
import { useLoaderData, useLocation } from "react-router-dom";
import { currencyFormater } from "../utils/numberFormatting";

const requestConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer ",
  },
};

export default function OrderManagement() {
  const loggedUser = useLoaderData();
  const adminUser = loggedUser.user.userRole.find((role) => role === "ADMIN");
  const employeeUser = loggedUser.user.userRole.find((role) => role === "EMPLOYEE");

  const [show, setShow] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const [proccessing, setProccesseing] = useState(false);
  const [proccessingId, setProccessingId] = useState(null);
  const [orderMaster, setOrderMaster] = useState([]);

  const { data, isLoading } = useHttp(
    `http://54.179.42.252:8080/api/v1/order/customer-orders?${
      (!adminUser && !employeeUser) ? "customerId=" + loggedUser.customer.id : ""
    }&orderStatus=`,
    requestConfig,
    []
  );

  useEffect(() => {
    if(employeeUser) {
      const filter = data.filter((item) => {
        if(item.orderStatus === String('Processing').toUpperCase()) {
          return true
        }
      });
      setOrderMaster(filter);
    } else {
      setOrderMaster(data);
    }
 
  }, [data])

  async function changeOrderStatus(status, item, id) {
    setProccesseing(true);
    setProccessingId(id);
    const res = await fetch(
      `http://54.179.42.252:8080/api/v1/order/update-order-status?orderId=${id}&orderStatus=${status}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAuthToken(),
        },
      }
    );
    if (res.ok) {
      item.orderStatus = status;
    }
    setProccesseing(false);
    setProccessingId(null);
  }

  const handleClose = () => {
    setSelectedModal(null);
    setShow(false);
  };
  const handleShow = (id) => {
    setSelectedModal(id);
    setShow(true);
  };
  //    const loc = useLocation();
  //    console.log(loc)

  function handleFilter(event) {
    const status = event.target.value;
    const fillteredData = data.filter((item) => {
      if(status === 'All') {
        return true
      }
      if(item.orderStatus === String(status).toUpperCase()) {
        return true
      }
    });
    setOrderMaster(fillteredData);
  }

  if (isLoading) {
    return (
      <div className="dotted-loader"></div>
    );
  }



  // console.log(data)
  return (
    <div className="p-3">
      <div className="col-12">
        <select className="select-c" hidden={employeeUser} onChange={handleFilter}>
          <option>All</option>
          <option>Placed</option>
          <option>Processing</option>
          <option>Delivered</option>
        </select>
        <table className="table table-bordered table-responsive-lg">
          <thead>
            <tr>
              <td>Order Date</td>
              <td>Delivery Address</td>
              {(adminUser || employeeUser) &&  <td>Customer Code</td>}
              {(adminUser || employeeUser) &&  <td>Customer Name</td>}

              <td>Order Status</td>
              <td>Total (LKR)</td>
              <td>Details</td>
              {adminUser && <td style={{'min-width': '235px'}}>Activity</td>}
            </tr>
          </thead>
          <tbody>
            {orderMaster.map((item) => (
              <tr key={item.id}>
                <td>
                  {format(item.orderPlacedDate, "yyyy MMMM do , h:mm:ss a")}
                </td>
                <td>{item.deliveryAddress || "N/A"}</td>
                {(adminUser || employeeUser) && <td>{item.customerId}</td>}
                {(adminUser || employeeUser) && <td>{item.customerName}</td>}
                <td>{item.orderStatus}</td>
                <td>{currencyFormater.format(item.orderTotal)}</td>
                <td>
                  <Button textOnly onClick={() => handleShow(item.id)}>
                    Details
                  </Button>
                </td>
                {adminUser && (
                  <td>
                    {item.orderStatus === "PLACED" ? (
                      <Button
                        disabled={proccessing}
                        onClick={() =>
                          changeOrderStatus("PROCESSING", item, item.id)
                        }
                      >
                        {proccessing && proccessingId === item.id ? (
                          <i className="fa fa-spinner fa-spin"></i>
                        ) : (
                          ""
                        )}
                        Mark as Procees
                      </Button>
                    ) : item.orderStatus === "PROCESSING" ? (
                      <Button
                        className="delivered-btn"
                        disabled={proccessing}
                        onClick={() =>
                          changeOrderStatus("DELIVERED", item, item.id)
                        }
                      >
                        {proccessing && proccessingId === item.id ? (
                          <i className="fa fa-spinner fa-spin"></i>
                        ) : (
                          ""
                        )}
                        Mark as Delivered
                      </Button>
                    ) : (
                      "Delivered"
                    )}
                  </td>
                )}

                <Modalb
                key={item.id}
                  show={show && item.id === selectedModal}
                  onHide={handleClose}
                >
                  <Modalb.Header closeButton>
                    <Modalb.Title>Order Details</Modalb.Title>
                  </Modalb.Header>
                  <Modalb.Body>
                    <ul>
                      {item.orderItems.map((food, index) => (
                        <li key={index} className="cart-item">
                          <p>
                            {food.product.productName} - {food.soldPrice} *{" "}
                            {food.quantity}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </Modalb.Body>
                  <Modalb.Footer>
                    <Buttonb variant="secondary" onClick={handleClose}>
                      Close
                    </Buttonb>
                  </Modalb.Footer>
                </Modalb>
              </tr>
            ))}
          </tbody>
        </table>
        {orderMaster.length === 0 ? 'You dont have any orders yet!' : ''}
      </div>
    </div>
  );
}
