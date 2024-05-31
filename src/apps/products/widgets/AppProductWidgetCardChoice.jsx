import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import WidgetSearch from "../../../widgets/WidgetSearch";
import WidgetLimit from "../../../widgets/WidgetLimit";
import PropTypes from "prop-types";
import { FaCartPlus } from "react-icons/fa6";

const AppProductWidgetCardChoice = ({ callback }) => {
    const [products, setProducts] = useState([]);
    const filterProducts = useRef({
        search: "",
        limit: 10,
        page: 1,
        sortBy: "name",
        order: "desc",
    });

    const onGetProducts = () => {
        const url = `${import.meta.env.VITE_BASE_URL}/products`;
        const config = {
            params: { ...filterProducts.current },
        };
        axios
            .get(url, config)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                // TODO: buat otomatis menggunakan custom hooks
                alert(error);
            });
    };

    const onSearchProducts = (value) => {
        filterProducts.current.search = value;
        onGetProducts();
    };

    const onLimitProducts = (value) => {
        filterProducts.current.limit = value;
        onGetProducts();
    };

    useEffect(() => {
        onGetProducts();
    }, []);

    return (
        <>
            <Row className="mb-3">
                <Col className="d-flex gap-3">
                    <WidgetLimit callback={onLimitProducts} />
                    <WidgetSearch callback={onSearchProducts} />
                </Col>
            </Row>
            <Row>
                {products.map((product) => (
                    <Col md={4} key={product.id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={`${product.avatar}`} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                            </Card.Body>
                            <Card.Footer>
                                <Button
                                    onClick={() => {
                                        callback(product);
                                    }}
                                    size="sm"
                                >
                                    <FaCartPlus /> Add
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};

AppProductWidgetCardChoice.propTypes = {
    callback: PropTypes.func,
};

export default AppProductWidgetCardChoice;
