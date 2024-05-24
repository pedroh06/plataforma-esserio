import { type AppType } from "next/dist/shared/lib/utils";

import "@/components/modules/styles.scss";
import { AppProvider } from "@/contexts/AppProvider";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </AppProvider>
  );
};

export default MyApp;
