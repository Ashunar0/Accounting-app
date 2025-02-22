import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./sections/Home";
import Report from "./sections/Report";
import NoMatch from "./sections/NoMatch";
import AppLayout from "./components/layout/AppLayout";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="/*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
