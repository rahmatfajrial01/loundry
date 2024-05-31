import { HashRouter, Route, Routes } from "react-router-dom";
import AppProductPageList from "./apps/products/pages/AppProductPageList";
import LayoutMain from "./layouts/LayoutMain";
import AppOrderPageList from "./apps/orders/pages/AppOrderPageList";
import LayoutSide from "./layouts/LayoutSide";
import AppOrderPagePOS from "./apps/orders/pages/AppOrderPagePOS";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LayoutSide />}>
          <Route index element={<AppProductPageList />} />
        </Route>
        <Route path="/orders" element={<LayoutSide />}>
          <Route index element={<AppOrderPageList />} />
        </Route>
        <Route path="/pos" element={<LayoutMain />}>
          <Route index element={<AppOrderPagePOS />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
