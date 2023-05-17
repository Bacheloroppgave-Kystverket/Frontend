import React from "react";
import { useLocation } from "react-router-dom";
import SupportitemCard from "../components/SupportItemCard";

/**
 * Represents the support category page.
 * @returns the support category page.
 */
export default function SupportCategory() {
  const location = useLocation();
  //Takes out the support category on this page that needs it.
  let supportCategory = location.state.supportCategory;
  let supportCategoryArray = location.state.supportArray;

  /**
   * Makes the support items.
   * @returns the support items.
   */
  function makeSupportItems() {
    let supportItems = [];
    for (let i = 0; i < supportCategory.listOfItems.length; i++) {
      let supportItem = supportCategory.listOfItems[i];
      supportItems.push(
        <SupportitemCard
          supportItem={supportItem}
          key={supportItem.supportItemName}
          supportCategory={supportCategory}
          supportCategoryArray={supportCategoryArray}
        />
      );
    }
    return supportItems;
  }

  return <div className="support-items-container">{makeSupportItems()}</div>;
}
