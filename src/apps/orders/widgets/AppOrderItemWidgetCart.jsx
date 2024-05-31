import PropTypes from "prop-types";
import { Button, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";

const AppOrderItemWidgetCart = ({ items, callback }) => {
    return (
        <>
            <Table responsive striped borderless>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Avatar</th>
                        <th>Qty</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((value, index) => (
                        <tr key={value.id}>
                            <td>{value.id}</td>
                            <td>{value.name}</td>
                            <td>
                                <img style={{ width: "7%" }} src={value.avatar} />
                            </td>
                            <td>{value.qty}</td>
                            <td>
                                <Button
                                    onClick={() => {
                                        callback(index);
                                    }}
                                    size="sm"
                                    variant="danger"
                                >
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

AppOrderItemWidgetCart.propTypes = {
    items: PropTypes.array,
    callback: PropTypes.func,
};

export default AppOrderItemWidgetCart;
