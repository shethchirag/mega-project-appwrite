import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
  const naviate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authstatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (authentication && authstatus !== authentication) {
      naviate("/login");
    } else if (!authentication && authstatus !== authentication) {
      naviate("/");
    }
    setLoader(false);
  }, [authstatus, naviate, authentication]);
  return loader ? <h1>loading....</h1> : <>{children}</>;
}

export default Protected;
