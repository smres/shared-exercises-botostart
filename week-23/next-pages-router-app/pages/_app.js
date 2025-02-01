import Layout from "../components/layout/Layout";

import { ToastContainer } from "react-toastify";

import "../styles/globals.css";
import TanstackQueryProvider from "../providers/TanstackQueryProvider";
import AuthProvider from "../providers/AuthProvider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <TanstackQueryProvider>
        <Layout>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
          <ToastContainer />
        </Layout>
      </TanstackQueryProvider>
    </>
  );
}

export default MyApp;
