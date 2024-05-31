import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import WidgetSideNavigation from "../widgets/WidgetSideNavigation.jsx";

const LayoutSide = () => {
  return (
    <>
      <Container className="mt-5 mb-3">
        <Row>
          <Col md={3}>
            <WidgetSideNavigation />
          </Col>
          <Col>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LayoutSide;
