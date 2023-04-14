import React from "react";
import NormalTextField from "../components/input/NormalTextField";
import NormalButton from "../components/openBridge/NormalButton";
import SupportButton from "../components/openBridge/SupportButton";
import "./support.css";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Support() {
  const [supportCategories, setSupportCategories] = useState([]);
  const navigate = useNavigate();

  //Does this once when the page is refreshed.
  useEffect(() => {
    getSupportCategories();
  }, []);

  /**
   * Nagivates to the support category.
   * @param {supportCategory} supportCategory the support category.
   */
  function navigateToSupportCategory(supportCategory) {
    let supportCategoryArray = [];
    supportCategoryArray.push(supportCategory.categoryName);
    navigate("/support/category", {
      state: {
        //Transfers the support category to the next page.
        supportCategory: supportCategory,
        //Is the text that comes up on the appbar.
        //Must be done in order to update it. EACH NEW ">" should BE ITS OWN ITEM.
        supportArray: supportCategoryArray,
      },
    });
  }

  /**
   * Gets the session form the server
   */
  async function getSupportCategories() {
    fetch("http://localhost:8080/supportCategory")
      .then((res) => res.json())
      .then((result) => {
        setSupportCategories(result);
      });
  }

  /**
   * Makes the support buttons.
   * @returns a array of all the support buttons.
   */
  function makeSupportButtons() {
    return supportCategories.map((category) => {
      return (
        <SupportButton
          supportCategory={category}
          onClick={navigateToSupportCategory}
        />
      );
    });
  }

  return (
    <div className="support-page">
      <NormalTextField
        placeholder={"search"}
        style={{ display: "flex", justifyContent: "center" }}
      />
      <div className="support-page-buttons">{makeSupportButtons()}</div>
    </div>
  );
}
