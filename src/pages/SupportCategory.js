import React from "react";
import { useLocation } from "react-router-dom";

export default function SupportCategory() {
  const location = useLocation();
  //Takes out the support category on this page that needs it.
  let supportCategory = location.state.supportCategory;
  return <div>{supportCategory.categoryName}</div>;
}
