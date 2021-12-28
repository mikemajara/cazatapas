import React from "react";
import { Box, useBreakpoint } from "@chakra-ui/react";
import Head from "next/head";
import Navbar, { navbarHeight } from "./navbar";
import Sidebar from "./sidebar";
import { Footer, footerHeight, footerHeightBase } from "./footer";

export function Layout(props) {
  const isDesktop = useBreakpoint("sm");
  const navbarAndFooterHeight =
    navbarHeight + (isDesktop ? footerHeight : footerHeightBase);
  return (
    <Box>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Navbar session={props.session} />
      <Box
        style={{
          minHeight: `calc(100vh - ${navbarAndFooterHeight}px)`,
        }}
      >
        {props.children}
      </Box>
      <Footer />
    </Box>
  );
}
