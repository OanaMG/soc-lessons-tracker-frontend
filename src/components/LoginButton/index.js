import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = ({textDisplay}) => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>{textDisplay}</button>;
};

export default LoginButton;