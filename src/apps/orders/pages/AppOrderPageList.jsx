import { useEffect, useRef, useState } from "react";
import useFormat from "../../../hooks/useFormat";
import useInitialData from "../../../hooks/useInitialData";
import axios from "axios";
import useMessage from "../../../hooks/useMessage";
import { Badge, Button, Card, Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import WidgetLimit from "../../../widgets/WidgetLimit";
import WidgetSearch from "../../../widgets/WidgetSearch";
import { STATUS_DICUCI, STATUS_DIKEMBALIKAN, STATUS_SELESAI } from "../data";

const AppOrderPageList = () => {
    const navigate = useNavigate();
    const message = useMessage();
    const format = useFormat();
    const initialData = useInitialData();

    const [orders, setOrders] = useState([]);
    const filterOrders = useRef(initialData.filterInit("customerName"));

    const onGetOrders = () => {
        const url = `${import.meta.env.VITE_BASE_URL}/orders`;
        const config = {
            params: { ...filterOrders.current },
        };
        axios
            .get(url, config)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                message.error(error);
            });
    };

    const onChangeStatusOrder = (order, status) => {
        const url = `${import.meta.env.VITE_BASE_URL}/orders/${order.id}`;
        const config = {
            params: { ...filterOrders.current },
        };

        // order.status = status;
        axios
            .put(url, { status }, config)
            .then((response) => {
                onGetOrders();
                message.success(response);
            })
            .catch((error) => {
                message.error(error);
            });
    };

    const onSearchOrders = (value) => {
        filterOrders.current.search = value;
        onGetOrders();
    };

    const onLimitOrders = (value) => {
        filterOrders.current.limit = value;
        onGetOrders();
    };

    useEffect(() => {
        onGetOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Row className="mb-3">
                <Col className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-normal">Orders</h5>
                    <Button onClick={() => navigate("/pos")}>New Order</Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Card>
                        <Card.Body className="w-50 d-flex gap-2">
                            <WidgetLimit callback={onLimitOrders} />
                            <WidgetSearch callback={onSearchOrders} />
                        </Card.Body>
                        <Table responsive hover striped borderless>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Customer Address</th>
                                    <th>Total</th>
                                    <th>Dibayar</th>
                                    <th>Kembali</th>
                                    <th>Status</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.id}</td>
                                        <td>
                                            {value.customerName} {value.customerPhone}
                                        </td>
                                        <td>{value.customerAddress}</td>
                                        <td>{format.toCurrency(value.total)}</td>
                                        <td>{format.toCurrency(value.dibayar)}</td>
                                        <td>{format.toCurrency(value.kembali)}</td>
                                        <td>
                                            {value.status === STATUS_DICUCI && (
                                                <Badge bg="warning" text="dark">
                                                    {value.status}
                                                </Badge>
                                            )}
                                            {value.status === STATUS_SELESAI && (
                                                <Badge bg="primary">{value.status}</Badge>
                                            )}
                                            {value.status === STATUS_DIKEMBALIKAN && (
                                                <Badge bg="success">{value.status}</Badge>
                                            )}
                                        </td>
                                        <td>
                                            {value.status === STATUS_DICUCI && (
                                                <Button
                                                    onClick={() =>
                                                        onChangeStatusOrder(value, STATUS_SELESAI)
                                                    }
                                                    variant="primary"
                                                    size="sm"
                                                >
                                                    Selesai
                                                </Button>
                                            )}
                                            {value.status === STATUS_SELESAI && (
                                                <Button
                                                    onClick={() =>
                                                        onChangeStatusOrder(value, STATUS_DIKEMBALIKAN)
                                                    }
                                                    variant="success"
                                                    size="sm"
                                                >
                                                    Kembalikan
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default AppOrderPageList;
