import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
//import ListRoom from "./componants/listroom";
import CreateRoom from "./componants/CreateRoom";
import EditRoom from "./componants/Editroom";
import LoginEmp from "./componants/LoginEmp";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginEmp />} />
            <Route path="listroom/create" element={<CreateRoom />} />
            <Route path="listroom/:id/update" element={<EditRoom />} />
            <Route
              path="*"
              element={<h2>404 Page Not Found. Please check the URL.</h2>}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
