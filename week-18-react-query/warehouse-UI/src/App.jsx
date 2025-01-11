import TanstackQueryProvider from "./Providers/TanstackQueryProvider";
import { ToastContainer } from "react-toastify";

import Router from "./router/Router";

import "./App.css";

function App() {
  return (
    <TanstackQueryProvider>
      <Router />
      <ToastContainer />
    </TanstackQueryProvider>
  );
}

export default App;
