import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider as AuthProvider } from "next-auth/react";
import theme from "../theme";
import { AppProps } from "next/app";
import { Global, css } from "@emotion/react";

import "focus-visible/dist/focus-visible";
import { QueryClient, QueryClientProvider } from "react-query";

// Create a client

const queryClient = new QueryClient();

const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <ChakraProvider resetCSS theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
