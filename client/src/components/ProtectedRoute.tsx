// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";

// function ProtectedRoute(props: { children: any }) {
//   const { user } = useContext(AuthContext);
//   return <>{user ? props.children : <Navigate to={"/login"} />}</>;
// }

// export default ProtectedRoute;

import React, { ReactNode, useContext } from "react";
// import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

type Props = {
  children: ReactNode;
};

function ProtectedRoute(props: Props) {
  const { user } = useContext(AuthContext);
  return <>
  {/* {user !== null ? props.children : <Navigate to={"/login"} />} */}

  {user !== null  ? props.children : <h1>This page is restricted.</h1>}
  </>;
}

export default ProtectedRoute;
