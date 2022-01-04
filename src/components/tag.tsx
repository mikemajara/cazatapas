import { Tag as ChakraTag, useToken } from "@chakra-ui/react";
import { logger } from "@lib/logger";
import React from "react";

var getContrast = function (hexcolor) {
  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === "#") {
    hexcolor = hexcolor.slice(1);
  }

  // Convert to RGB value
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);

  // Get YIQ ratio
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? "black" : "white";
};

export const Tag = (props) => {
  const color = useToken("colors", props.color);
  return (
    <ChakraTag bgColor={props.color} color={getContrast(color)}>
      #{props.name.split(" ").join("-")}
    </ChakraTag>
  );
};
