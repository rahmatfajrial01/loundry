import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { PiShieldWarningDuotone } from "react-icons/pi";

const WidgetClientValidation = ({ dataValidation, field }) => {
    return (
        <>
            {dataValidation[field]?.message && (
                <Form.Text className="text-muted">
                    <PiShieldWarningDuotone className="text-success" />
                    {" Tips: "}
                    {dataValidation[field]?.message}
                </Form.Text>
            )}
        </>
    );
};

WidgetClientValidation.propTypes = {
    dataValidation: PropTypes.object,
    field: PropTypes.string,
};

export default WidgetClientValidation;
