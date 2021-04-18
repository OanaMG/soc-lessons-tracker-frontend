import React, { useState, useEffect } from "react";
import { Input, Box, Textarea } from "@chakra-ui/react";

// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
// Manage the state whether to show the label or the input box. By default, label will be shown.

const Editable = ({
  childRef,
  text,
  type,
  placeholder,
  children,
  inputWidth,
  ...props
}) => {
  const [isEditing, setEditing] = useState(false);

  /* 
    using use effect, when isEditing state is changing, check whether it is set to true, if true, then focus on the reference element
  */
  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  // Event handler while pressing any key while editing
  const handleKeyDown = (event, type) => {
    // Handle when key is pressed
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey]; // All keys array

    /* 
    - For textarea, check only Escape and Tab key and set the state to false
    - For everything else, all three keys will set the state to false
  */
    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
    }
  };

  /*
- It will display a label is `isEditing` is false
- It will display the children (input or textarea) if `isEditing` is true
- when input `onBlur`, we will set the default non edit mode
*/
  return (
    <Box {...props} width="100%">
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <Box width="100%" onClick={() => setEditing(true)}>
          {/* <span>
            {text || placeholder}
          </span> */}
          {type !== "textarea" ? (
            <Input
              placeholder={text}
              isReadOnly="true"
              variant="outline"
              colorScheme="blue"
              size="md"
              width={inputWidth}
            />
          ) : (
            <Textarea
              placeholder={text}
              isReadOnly="true"
              colorScheme="blue"
              size="md"
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default Editable;
