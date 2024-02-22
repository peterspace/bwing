import React, { useEffect, useState } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import SupportModel from "../../components/SupportModel";

export const Support = (props) => {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("prevLocation", JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SupportModel />
    </>
  );
};
