import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { productInit } from "../data";
import axios from "axios";
import useMessage from "../../../hooks/useMessage";
import useInput from "../../../hooks/useInput";

const AppProductWidgetCreate = ({ callback }) => {
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState(productInit);
    const message = useMessage();
    const inputProduct = useInput(setProduct);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onCreateProduct = () => {
        const url = `${import.meta.env.VITE_BASE_URL}/products`;
        axios
            .post(url, product)
            .then((response) => {
                message.success(response);
                callback();
                handleClose();
            })
            .catch((error) => {
                message.error(error);
            });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                New Product
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            required
                            maxLength={100}
                            minLength={5}
                            value={product.name}
                            onChange={inputProduct.handler}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>URL Image</Form.Label>
                        <Form.Control
                            type="text"
                            name="avatar"
                            required
                            value={product.avatar}
                            onChange={inputProduct.handler}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onCreateProduct}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

AppProductWidgetCreate.propTypes = {
    callback: PropTypes.func,
};

export default AppProductWidgetCreate;
