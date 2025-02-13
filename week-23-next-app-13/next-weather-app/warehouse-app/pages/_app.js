import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import AuthProvider from "../providers/AuthProvider";

export default function App({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <ReactQueryProvider>
      <Layout>
        <AuthProvider>
          <div className="background-wrapper">
            <div className="background"></div>
          </div>
          <Component {...pageProps} />
          <ToastContainer />
        </AuthProvider>
      </Layout>
    </ReactQueryProvider>
  );
}
