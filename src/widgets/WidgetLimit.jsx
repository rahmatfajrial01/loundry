import { useRef } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const WidgetLimit = ({ callback }) => {
    const limit = useRef(10);

    const onLimit = () => {
        callback(limit.current.value);
    };

    return (
        <>
            <Form.Select ref={limit} onChange={onLimit}>
                <option>Choose limit</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="100">100</option>
            </Form.Select>
        </>
    );
};

WidgetLimit.propTypes = {
    callback: PropTypes.func,
};

export default WidgetLimit;
