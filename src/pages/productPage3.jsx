import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react"
import { Badge, Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import useFormatter from "../../hooks/useFormatter";
import { FaArrowAltCircleRight, FaCartPlus, FaPauseCircle, FaSave, FaTrash } from "react-icons/fa";

const PageProduct = () => {
    const formatter = useFormatter();

    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState({
        total: 0,
        dibayar: 0,
        kembali: 0,
        pajak: 11 / 100,
        totalBeforePajak: 0
    })

    const [orderValidator, setOrderValidator] = useState({
        total: "",
        dibayar: "",
        kembali: ""
    })

    const [limit, setLimit] = useState(2);
    const [search, setSearch] = useState("");

    const onGetProducts = () => {
        const config = {
            params: {
                limit,
                page: 1,
                search
            }
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/product`, config)
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
        // 
        // DONE: mas gimana buat Harga yang dibayar ada tanda titiknya misal 200.000 ?
        setItems((values) => {
            let itemsCopy = [...values];
            itemsCopy.splice(index, 1);
            return itemsCopy
        })
    }

    const onCreateOrder = (status) => {
        let payload = {
            ...order,
            status,
            items
        }

        console.log(payload);

        axios.post(`${import.meta.env.VITE_BASE_URL}/orders`, payload)
            .then((response) => {
                alert("Sukses!!!")
            }).catch((error) => {
                alert(`Error ${error}`);
            })
    }

    const calculateTotal = useCallback(() => {
        console.log("ini hitung total")
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

        let totalBeforePajak = count.toFixed();

        count = count + (count * order.pajak)
        setOrder((values) => ({ ...values, total: count.toFixed(), dibayar: 0, totalBeforePajak }));
    }, [items, order.pajak])

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


    const onSearch = (e) => {
        let value = e.target.value;
        setSearch(value)
        setTimeout(() => {
            onGetProducts();
        }, 300);
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

    useEffect(() => {
        onGetProducts(limit);
    }, [limit])

    return (
        <>
            <Container className="mt-4">
                <Row className="mb-4">
                    <Col className="d-flex justify-content-between">
                        <h4>Simple POS</h4>
                        <div className="d-flex gap-3">
                            <Form.Group>
                                <Form.Select onChange={(e) => setLimit(e.target.value)}>
                                    <option>Open this select limit</option>
                                    <option value="2">2</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control value={search} onChange={onSearch} placeholder="Pencarian" />
                            </Form.Group>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row >
                            {products.map((value) => (
                                <Col md={4} key={value.id} className="mb-4">
                                    <Card >
                                        <Card.Img variant="top" src={`${value.image},pizza?random${value.id}`} />
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
                                        <td colSpan={3}>Total Sebelum Pajak</td>
                                        <th colSpan={2}>
                                            {formatter.toCurrency(order.totalBeforePajak)}
                                        </th>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>Pajak</td>
                                        <th colSpan={2}>
                                            {order.pajak * 100}%
                                        </th>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>Total</td>
                                        <th colSpan={2}>
                                            {formatter.toCurrency(order.total)}
                                        </th>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>Dibayar</td>
                                        <td colSpan={2}>
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
                                        <th colSpan={2}>
                                            {formatter.toCurrency(order.kembali)}
                                        </th>
                                    </tr>
                                    <tr>
                                        <td colSpan={5} >
                                            <div className="d-flex justify-content-between gap-2">
                                                <Button className="w-100" variant="warning" onClick={() => onCreateOrder(import.meta.env.VITE_STATUS_HOLD)}>
                                                    <FaPauseCircle /> Hold Order
                                                </Button>
                                                <Button className="w-100" variant="success" onClick={() => onCreateOrder(import.meta.env.VITE_STATUS_FINISH)}>
                                                    <FaArrowAltCircleRight /> Process
                                                </Button>
                                            </div>
                                        </td>
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