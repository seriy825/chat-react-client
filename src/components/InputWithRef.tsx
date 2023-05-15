import React from "react";
import { Form } from "react-bulma-components";


export const InputWithRef = React.forwardRef<"input", any>((props, ref) => {
  return <Form.Input {...props} domRef={ref} />;
});