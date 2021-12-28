import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Footer } from "./footer";

export function Layout(props) {
  return (
    <Box>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Navbar session={props.session} />
      {props.children}

      <Footer />
    </Box>
  );
}
