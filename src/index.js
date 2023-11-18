import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./views/List";
import Create from "./views/Create";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="create" element={<Create />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
