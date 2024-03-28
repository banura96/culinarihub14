import { useLoaderData } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import Button from "react-bootstrap/esm/Button";
import { Button as ButtonCustom } from "./UIs/Button";
import { default as Buttonb } from "react-bootstrap/Button";
import { default as Modalb } from "react-bootstrap/Modal";
import { useState } from "react";
import Input from "./UIs/Input";
import { getAuthToken } from "../utils/auth";

const requestConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer ",
  },
};

export default function ProductManagement() {
  const user = useLoaderData();

  const [show, setShow] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const [selectedAddNewModal, setSelectedAddNewModal] = useState(null);

  const [proccessing, setProccesseing] = useState(false);
  const [file, setFile] = useState(null);

  const handleClose = () => {
    setSelectedAddNewModal(null);
    setSelectedModal(null);
    setShow(false);
    setFile(null);
  };
  const handleAddNewShow =() => {
    setShow(true);
    setSelectedAddNewModal(true);
  }

  const handleShow = (id) => {
    setSelectedModal(id);
    setShow(true);
  };
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const { data, isLoading, error, sendRequest } = useHttp(
    `http://54.179.42.252:8080/api/v1/product`,
    requestConfig,
    []
  );

  async function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  async function handleStockUpdate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const regFormData = Object.fromEntries(formData.entries());
    let submitionForm = { ...regFormData };
    await getBase64(submitionForm.imageBase64String, async (result) => {
      console.log(result);
      submitionForm.imageBase64String = result;

      setProccesseing(true);

      await fetch(`http://54.179.42.252:8080/api/v1/product/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAuthToken(),
        },
        body: JSON.stringify(submitionForm),
      });
      setProccesseing(false);
      handleClose();
      sendRequest();
    });
  }

  if (isLoading) {
    return (
      <div>
        <p>Fetching product details...</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <div>
          <ButtonCustom onClick={handleAddNewShow} className="float-end mt-2 mb-2">Add New</ButtonCustom>
          <Modalb
                  keyboard={false}
                  backdrop="static"
                  show={show && selectedAddNewModal}
                  onHide={handleClose}
                >
                  <Modalb.Header closeButton>
                    <Modalb.Title>Add New Stock</Modalb.Title>
                  </Modalb.Header>
                  <form onSubmit={handleStockUpdate}>
                    <Modalb.Body>

                      <label>Update Image</label>
                      <div className="row">
                        <div className="col-6">
                          <Input
                            type="file"
                            name="imageBase64String"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={handleChange}
                          />
                        </div>
                        {file && (
                          <div className="col-6">
                            <img width="100px" src={file} />
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <Input
                            placeholder="Food Name"
                            name="productName"
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            placeholder="Food Description"
                            name="description"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <Input
                            placeholder="Available Quentity"
                            name="availableQuantity"
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            placeholder="Buying Price"
                            name="buyingPrice"
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            placeholder="Selling Price"
                            name="sellingPrice"
                          />
                        </div>
                      </div>
                    </Modalb.Body>
                    <Modalb.Footer>
                      <Buttonb
                        type="button"
                        variant="secondary"
                        onClick={handleClose}
                        disabled={proccessing}
                      >
                        Close
                      </Buttonb>
                      <Buttonb disabled={proccessing} type="submit" variant="secondary">
                      {proccessing && <i className="fa fa-spinner fa-spin"></i>}Add New Stock
                      </Buttonb>
                    </Modalb.Footer>
                  </form>
                </Modalb>
        </div>
        <table className="table table-bordered table-responsive-lg">
          <thead>
            <tr>
              <td>Menu Item</td>
              <td>Food Name</td>
              <td>Buying Price</td>
              <td>Selling Price</td>
              <td>Available Quentity</td>
              <td>Update Stock</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    width="45px"
                    height="45px"
                    src={item.imageBase64String}
                    alt=""
                  />
                </td>
                <td>{item.productName}</td>
                <td>{item.buyingPrice}</td>
                <td>{item.sellingPrice}</td>
                <td>{item.availableQuantity}</td>
                <td>
                  <Button textOnly onClick={() => handleShow(item.id)}>
                    stock update
                  </Button>
                </td>
                <Modalb
                  keyboard={false}
                  backdrop="static"
                  show={show && item.id === selectedModal}
                  onHide={handleClose}
                >
                  <Modalb.Header closeButton>
                    <Modalb.Title>Update Stock</Modalb.Title>
                  </Modalb.Header>
                  <form onSubmit={handleStockUpdate}>
                    <Modalb.Body>
                      <Input hiddenElement={true} value={item.id} name="id" />

                      <label>Update Image(Optional)</label>
                      <div className="row">
                        <div className="col-6">
                          <Input
                            required={false}
                            type="file"
                            name="imageBase64String"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={handleChange}
                          />
                        </div>
                        {file && (
                          <div className="col-6">
                            <img width="100px" src={file} />
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <Input
                            placeholder="Food Name"
                            defaultValue={item.productName}
                            name="productName"
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            placeholder="Food Description"
                            defaultValue={item.description}
                            name="description"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <Input
                            placeholder="Available Quentity"
                            defaultValue={item.availableQuantity}
                            name="availableQuantity"
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            placeholder="Buying Price"
                            defaultValue={item.buyingPrice}
                            name="buyingPrice"
                          />
                        </div>
                        <div className="col-6">
                          <Input
                            placeholder="Selling Price"
                            defaultValue={item.sellingPrice}
                            name="sellingPrice"
                          />
                        </div>
                      </div>
                    </Modalb.Body>
                    <Modalb.Footer>
                      <Buttonb
                        type="button"
                        variant="secondary"
                        onClick={handleClose}
                        disabled={proccessing}
                      >
                        Close
                      </Buttonb>
                      <Buttonb disabled={proccessing} type="submit" variant="secondary">
                      {proccessing && <i className="fa fa-spinner fa-spin"></i>}Update Stock
                      </Buttonb>
                    </Modalb.Footer>
                  </form>
                </Modalb>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
