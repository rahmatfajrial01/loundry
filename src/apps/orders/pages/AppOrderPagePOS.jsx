import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import AppProductWidgetCardChoice from "../../products/widgets/AppProductWidgetCardChoice";
import { useEffect, useState } from "react";
import { orderInit } from "../data";
import AppOrderItemWidgetCart from "../widgets/AppOrderItemWidgetCart";
import useFormat from "../../../hooks/useFormat";
import useInitialData from "../../../hooks/useInitialData";
import useInput from "../../../hooks/useInput";
import WidgetClientValidation from "../../../widgets/WidgetClientValidation";
import axios from "axios";
import useMessage from "../../../hooks/useMessage";

const AppOrderPagePOS = () => {
  const format = useFormat();
  const message = useMessage();
  const intialData = useInitialData();
  const [order, setOrder] = useState(orderInit);
  const [items, setItems] = useState([]);
  const [orderClientValidation, setOrderClientValidation] = useState(
    intialData.clientValidation([
      "dibayar",
      "totalKg",
      "customerName",
      "customerPhone",
      "customerAddress",
    ])
  );
  const orderInput = useInput(setOrder, setOrderClientValidation);

  const onAddItem = (value) => {
    // ambil data item yang ada, jadi kalo tidak ada, item akan undefined
    let item = items.find((val) => val.id === value.id);

    if (item) {
      item.qty += 1;
      let index = items.findIndex((val) => val.id === value.id);

      setItems((values) => {
        let itemsCopy = [...values];
        itemsCopy.splice(index, 1, item);
        return itemsCopy;
      });
    } else {
      value.qty = 1;
      setItems([...items, value]);
    }
  };

  const onRemoveItem = (index) => {
    setItems((values) => {
      let itemsCopy = [...values];
      itemsCopy.splice(index, 1);
      return itemsCopy;
    });
  };

  const onCreateOrder = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/orders`;
    const payload = {
      ...order,
      items,
    };
    axios
      .post(url, payload)
      .then((response) => {
        message.success(response);
        setItems([]);
        setOrder(orderInit);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  useEffect(() => {
    setOrder((values) => {
      const valuesCopy = { ...values };
      console.log(valuesCopy.totalKg * valuesCopy.hargaPerKg);
      valuesCopy.total = valuesCopy.totalKg * valuesCopy.hargaPerKg;
      let kembali = valuesCopy.dibayar - valuesCopy.total;
      valuesCopy.kembali = kembali < 0 ? 0 : kembali;
      return valuesCopy;
    });
  }, [order.totalKg, order.dibayar]);

  return (
    <>
      <Container className="mb-3 mt-5">
        {/* <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h5 className="fw-normal">POS Laundry</h5>
          </Col>
        </Row> */}
        <Row>
          <Col>
            <AppProductWidgetCardChoice callback={onAddItem} />
          </Col>
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body></Card.Body>
              <AppOrderItemWidgetCart items={items} callback={onRemoveItem} />
            </Card>
            <Card className="mb-3">
              <Table striped borderless responsive>
                <tbody>
                  <tr>
                    <th>Customer Name</th>
                    <td>
                      <Form.Control
                        name="customerName"
                        required
                        maxLength={50}
                        value={order.customerName}
                        onChange={orderInput.handler}
                      />
                      <WidgetClientValidation
                        dataValidation={orderClientValidation}
                        field={"customerName"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Customer Phone</th>
                    <td>
                      <Form.Control
                        name="customerPhone"
                        required
                        maxLength={13}
                        minLength={12}
                        value={order.customerPhone}
                        onChange={orderInput.handler}
                      />
                      <WidgetClientValidation
                        dataValidation={orderClientValidation}
                        field={"customerPhone"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Customer Address</th>
                    <td>
                      <Form.Control
                        as={"textarea"}
                        name="customerAddress"
                        required
                        maxLength={100}
                        minLength={10}
                        value={order.customerAddress}
                        onChange={orderInput.handler}
                      />
                      <WidgetClientValidation
                        dataValidation={orderClientValidation}
                        field={"customerAddress"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Total Kg</th>
                    <td>
                      <Form.Control
                        name="totalKg"
                        max={30}
                        min={1}
                        type="number"
                        value={order.totalKg.toString()}
                        onChange={orderInput.handler}
                      />
                      <WidgetClientValidation
                        dataValidation={orderClientValidation}
                        field={"totalKg"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Harga/Kg</th>
                    <td>{format.toCurrency(order.hargaPerKg)}</td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td>{format.toCurrency(order.total)}</td>
                  </tr>
                  <tr>
                    <th>Dibayar</th>
                    <td>
                      <Form.Control
                        name="dibayar"
                        min={order.total}
                        type="number"
                        value={order.dibayar.toString()}
                        onChange={orderInput.handler}
                      />
                      {/* alternative own masking */}
                      {/* <Form.Control
                        name="dibayar"
                        required
                        value={orderInput.numberValueMask(
                          order.dibayar || order.total
                        )}
                        onChange={orderInput.numberMaskHandler}
                      /> */}
                      <WidgetClientValidation
                        dataValidation={orderClientValidation}
                        field={"dibayar"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Kembali</th>
                    <td>{format.toCurrency(order.kembali)}</td>
                  </tr>
                </tbody>
              </Table>
              <Card.Footer>
                <Button onClick={onCreateOrder}>Save Order</Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AppOrderPagePOS;
