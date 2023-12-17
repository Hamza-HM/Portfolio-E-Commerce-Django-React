import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CgColorBucket } from "react-icons/cg";

const theme = extendTheme({
  fonts: {
    body: 'Poppins, sans-serif',
  },
  styles: {
    global: {
      // body: {bg:'red' },
      ".mdx-prose": {
        input: {
          bg: "white",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
