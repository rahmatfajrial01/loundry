import { Outlet } from "react-router-dom";
import WidgetNavigation from "../widgets/WidgetNavigation";

const LayoutMain = () => {
    return (
        <>
            <WidgetNavigation />
            <Outlet />
        </>
    );
};

export default LayoutMain;
