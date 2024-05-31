import axios from "axios";
import { useCallback, useEffect, useState } from "react"
import { Badge, Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import useFormatter from "../../hooks/useFormatter";
import { FaCartPlus, FaTrash } from "react-icons/fa";

const PageProduct = () => {
    const formatter = useFormatter();

    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState({
        total: 0,
        dibayar: 0,
        kembali: 0
    })

    const [orderValidator, setOrderValidator] = useState({
        total: "",
        dibayar: "",
        kembali: ""
    })

    const onGetProducts = () => {
        axios.get(`https://664b3d4aa300e8795d44c2b0.mockapi.io/product`)
            .then((response) => {
                setProducts(response.data);
            }).catch((error) => {
                alert(`Error ${error}`);
            })
    }

    const onAddItem = (value) => {

        // ambil data item yang ada, jadi kalo tidak ada, item akan undefined
        let item = items.find((val) => val.id === value.id);

        if (item) {
            item.qty += 1;
            item.subtotal = item.qty * item.price;
            let index = items.findIndex((val) => val.id === value.id);

            setItems((values) => {
                let itemsCopy = [...values];
                itemsCopy.splice(index, 1, item);
                return itemsCopy
            })
        } else {
            value.qty = 1;
            value.subtotal = value.qty * Number(value.price);
            setItems([...items, value])
        }
    }

    const onRemoveItem = (index) => {
        // TODO: bos que tambahin remove item cuma satu...
        setItems((values) => {
            let itemsCopy = [...values];
            itemsCopy.splice(index, 1);
            return itemsCopy
        })
    }

    const calculateTotal = useCallback(() => {
        /**
         * useCallback adalah cara memoisasi (teknik memoisasi) sebagai penyimpanannilai di dalam cache
         * sehingga tidak perlu di evaluasi ulang.
         * 
         * useMemo mirip seperti useCallback, hanya saja fungsionalitasnya berbeda.
         * useMemo mengembambalikan value (cocok untuk perhitungan yang membutuhkan data eksternal)
         * sedangkan useCallback mengembalikan sebuah function agar tidak dibuat ulang jika dependensinya 
         * tidak berubah. Cocok untuk digunakan dalam menge-set nilai pada state dan tepat digunakan
         * di dalam useEffect dengan dependensi nama fungsinya sendiri.
         */
        const subtotals = items.map((value) => value.subtotal);
        let count = 0;
        for (let subtotal of subtotals) {
            count += subtotal;
        }

        console.log(count)
        setOrder((values) => ({ ...values, total: count, dibayar: 0 }));
    }, [items])

    const onHandlerOrder = (e) => {
        const name = e.target.name;
        const type = e.target.type;
        let value = e.target.value;
        if (type === 'number') {
            value = Number(value.replace(/\D/g, ''))
        }

        setOrderValidator((values) => ({ ...values, [name]: e.target.validationMessage }))
        setOrder((values) => ({ ...values, [name]: value }))

    }

    useEffect(() => {
        console.log("Efek 1")
        onGetProducts()
    }, []);

    useEffect(() => {
        console.log("Efek 2")
        calculateTotal();
    }, [calculateTotal]);

    useEffect(() => {
        console.log("Efek 3")
        if (order.dibayar >= order.total) {
            setOrder((values) => ({ ...values, kembali: Math.abs(order.total - order.dibayar) }))
        } else {
            setOrder((values) => ({ ...values, kembali: 0 }))
        }

    }, [order.dibayar, order.total])

    return (
        <>
            <Container className="mt-4">
                <Row className="mb-4">
                    <Col className="d-flex justify-content-between">
                        <h4>Simple POS</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            {products.map((value) => (
                                <Col md={4} key={value.id} className="mb-4">
                                    <Card >
                                        <Card.Img variant="top" src={`${value.iamge},pizza?random${value.id}`} />
                                        <Card.Body>
                                            <Card.Title>{value.title}</Card.Title>
                                            <Card.Text>
                                                <small className="text-muted">{value.description}</small>
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="d-flex justify-content-between align-items-end">
                                            <Badge>{formatter.toCurrency(value.price)}</Badge>
                                            <Button onClick={() => onAddItem(value)} size="sm">
                                                <FaCartPlus /> Add
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Items</Card.Title>
                            </Card.Body>
                            <Table hover striped>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Subtotal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((value, index) => (
                                        <tr key={value.id}>
                                            <td>{value.title}</td>
                                            <td>{formatter.toCurrency(value.price)}</td>
                                            <td>{value.qty}</td>
                                            <td>{formatter.toCurrency(value.subtotal)}</td>
                                            <td>
                                                <Button onClick={() => onRemoveItem(index)} size="sm" variant="danger">
                                                    <FaTrash />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={3}>Total</td>
                                        <th >
                                            {formatter.toCurrency(order.total)}
                                        </th>
                                    </tr>
                                    <tr>
                                        <td >Dibayar</td>
                                        <td colSpan={3}>
                                            <Form.Group>
                                                <Form.Control
                                                    name="dibayar"
                                                    type="number"
                                                    value={order.dibayar ? order.dibayar.toString() : ""}
                                                    min={order.total}
                                                    required
                                                    onChange={onHandlerOrder}
                                                />
                                                {orderValidator.dibayar && (
                                                    <small className="text-danger">{orderValidator.dibayar}</small>
                                                )}
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan={3}>Kembali</td>
                                        <th >
                                            {formatter.toCurrency(order.kembali)}
                                        </th>
                                    </tr>
                                </tfoot>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default PageProduct;