import type { AppProps } from "next/app";

import Layout from "../components/layout/Layout";
import "../styles/globals.css";

// For Calendar input
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

// Context Provider for passing values down
import { DataProvider } from "../contexts/DataContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DataProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataProvider>
    </LocalizationProvider>
  );
}

export default MyApp;
