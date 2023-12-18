import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CgColorBucket } from "react-icons/cg";

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        solid: (props) => ({
          // bg: props.colorMode === "dark" ? "gray.800" : "blue",
          // color: props.colorMode === "dark" ? "white" : "white",
        }),
      },
    },
  },
  fonts: {
    body: "Poppins, sans-serif",
  },
  styles: {
    global: (props) => ({
      ".mdx-prose": {
        input: {
          bg: "white",
        },
      },
      body: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
      },
      footer: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
