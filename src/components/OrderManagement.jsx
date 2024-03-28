import useHttp from "../hooks/useHttp";
import { Button } from "./UIs/Button";
import { format } from "date-fns";
import { useState } from "react";
import { default as Buttonb } from "react-bootstrap/Button";
import { default as Modalb } from "react-bootstrap/Modal";
import { getAuthToken } from "../utils/auth";
import { useLoaderData, useLocation } from "react-router-dom";

const requestConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer ",
  },
};

export default function OrderManagement({ customer }) {
  const loggedUser = useLoaderData();
  console.log(loggedUser)
  const adminUser = loggedUser.user.userRole.find((role) => role === "ADMIN");

  const [show, setShow] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const [proccessing, setProccesseing] = useState(false);
  const [proccessingId, setProccessingId] = useState(null);

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
  const { data, isLoading, error, sendRequest } = useHttp(
    `http://54.179.42.252:8080/api/v1/order/customer-orders?${
      !adminUser ? "customerId=" + loggedUser.customer.id : ""
    }&orderStatus=`,
    requestConfig,
    []
  );

  if (isLoading) {
    return (
      <div>
        <p>Fetching order details...</p>
      </div>
    );
  }

  // console.log(data)
  return (
    <div className="">
      <div className="col-12">
        <table className="table table-bordered table-responsive-lg">
          <thead>
            <tr>
              <td>Order Date</td>
              <td>Delivery Address</td>
              <td>Customer Code</td>
              <td>Order Status</td>
              <td>Total (LKR)</td>
              <td>Details</td>
              {adminUser && <td>Activity</td>}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  {format(item.orderPlacedDate, "yyyy MMMM do , h:mm:ss a")}
                </td>
                <td>{item.deliveryAddress || "N/A"}</td>
                <td>{item.customerId}</td>
                <td>{item.orderStatus}</td>
                <td>{item.orderTotal}</td>
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
                  show={show && item.id === selectedModal}
                  onHide={handleClose}
                >
                  <Modalb.Header closeButton>
                    <Modalb.Title>Order Details</Modalb.Title>
                  </Modalb.Header>
                  <Modalb.Body>
                    <ul>
                      {item.orderItems.map((food) => (
                        <li key={item.id} className="cart-item">
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
      </div>
    </div>
  );
}
