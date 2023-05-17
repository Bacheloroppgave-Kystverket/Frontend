import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Makes support item card
 * @param {supportItem} supportItem support item
 * @param {supportCategory} supportCategory support category
 * @param {Array} supportCategoryArray array of support categories
 * @returns the support item card
 */
export default function SupportitemCard({
  supportItem,
  supportCategory,
  supportCategoryArray,
}) {
  let navigate = useNavigate();

  /**
   * Goes to the support item of this card.
   */
  function goToSupportItem() {
    supportCategoryArray.push(supportItem.supportItemName);
    navigate("/support/category/supportItem", {
      state: {
        supportCategory: supportCategory,
        supportItem: supportItem,
        supportArray: supportCategoryArray,
      },
    });
  }

  return (
    <div className="support-item" onClick={goToSupportItem}>
      <p className="support-item-title">{supportItem.supportItemName}</p>
    </div>
  );
}
