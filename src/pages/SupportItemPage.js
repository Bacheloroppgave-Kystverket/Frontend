import React from "react";
import { useLocation } from "react-router-dom";

/**
 * Makes the support item page.
 * @returns the support item page.
 */
export default function SupportItemPage() {
  let location = useLocation();
  let supportItem = location.state.supportItem;
  return (
    <div className="support-item-show-container">
      <h1>{supportItem.supportItemName}</h1>
      <p>{supportItem.explanation}</p>
    </div>
  );
}
