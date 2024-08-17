import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { lazy, Suspense } from "react";
import Spinner from "./components/UI/Spinner.jsx";

const LazyApp = lazy(() => import("./App.jsx"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <LazyApp />
    </Suspense>
  </React.StrictMode>,
);
