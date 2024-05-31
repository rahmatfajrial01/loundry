import { Nav } from "react-bootstrap";
import { MdOutlineLocalLaundryService } from "react-icons/md";

const WidgetSideNavigation = () => {
    return (
        <>
            {/* <h4 style={{ color: "#a88748" }} className="mb-4 fw-normal">
        BOTO Laundry
      </h4> */}
            <h4 className="mb-4 d-flex align-items-center gap-1 fw-normal text-primary">
                <MdOutlineLocalLaundryService /> BOTO Laundry
            </h4>

            <h6>Master</h6>
            <ul className="list-unstyled">
                <li>
                    <Nav.Link href="#">Products</Nav.Link>
                </li>
            </ul>

            <h6>Transaksi</h6>
            <ul className="list-unstyled">
                <li>
                    <Nav.Link href="#orders">Orders</Nav.Link>
                </li>
                <li>
                    <Nav.Link href="#pos">POS Laundry</Nav.Link>
                </li>
            </ul>
        </>
    );
};

export default WidgetSideNavigation;
