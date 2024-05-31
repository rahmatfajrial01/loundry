import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPencil } from "react-icons/fa6";
import { productInit } from "../data";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import useInput from "../../../hooks/useInput";
import useMessage from "../../../hooks/useMessage";

const AppProductWidgetDetail = ({ id, callback }) => {
  const message = useMessage();
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(productInit);
  const inputProduct = useInput(setProduct);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onGetProduct = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/products/${id}`;
    axios
      .get(url)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onProductUpdate = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/products/${id}`;
    axios
      .put(url, product)
      .then(() => {
        handleClose();
        callback();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onProductDelete = () => {
    message.confirmRemove(() => {
      const url = `${import.meta.env.VITE_BASE_URL}/products/${id}`;
      axios
        .delete(url)
        .then((response) => {
          message.success(response);
          handleClose();
          callback();
        })
        .catch((error) => {
          message.error(error);
        });
    });
  };

  return (
    <>
      <Button size="sm" variant="warning" onClick={handleShow}>
        <FaPencil />
      </Button>

      <Modal show={show} onHide={handleClose} onShow={onGetProduct}>
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={product.name}
              required
              maxLength={100}
              minLength={5}
              onChange={inputProduct.handler}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={onProductDelete}>
            Delete
          </Button>
          <Button onClick={onProductUpdate} variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AppProductWidgetDetail.propTypes = {
  id: PropTypes.number,
  callback: PropTypes.func,
};

export default AppProductWidgetDetail;
