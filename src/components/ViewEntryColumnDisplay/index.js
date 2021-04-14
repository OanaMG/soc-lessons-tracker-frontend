import React from "react";
import {
  Heading,
  GridItem,
} from "@chakra-ui/react";

function ViewEntryColumnDisplay({keyText, valueText, visibility}) {
  return (
    <>
      <GridItem colSpan={3}>
        <Heading size="md">{keyText}</Heading>
      </GridItem>
      <GridItem colSpan={4} color="blue.500">
        <Heading size="sm">{valueText}</Heading>
      </GridItem>
    </>
  );
}

export default ViewEntryColumnDisplay;
