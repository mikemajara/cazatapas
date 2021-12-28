import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Footer from "./footer";

export function MainPageLayout(props) {
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

// export function DashboardLayout(props) {
//   return (
//     <Box>
//       <Head><title>{props.title}</title></Head>
//       {/* <Navbar/> */}
//       <Sidebar>
//         {props.children}
//       </Sidebar>

//       <Footer/>
//     </Box>
//   )
// }
