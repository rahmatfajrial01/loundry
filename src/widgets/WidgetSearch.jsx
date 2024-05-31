import { useRef } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const WidgetSearch = ({ callback }) => {
  const search = useRef({ value: "" });

  const onSearch = (e) => {
    if (e.key === "Enter") {
      callback(search.current.value);
    }
  };

  return (
    <>
      <Form.Control
        type="text"
        ref={search}
        placeholder="Search product (enter for search..)"
        onKeyUp={onSearch}
      />
    </>
  );
};

WidgetSearch.propTypes = {
  callback: PropTypes.func,
};

export default WidgetSearch;
