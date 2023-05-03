import React from "react";
import NormalCard from "./NormalCard";

/**
 * Makes a card and its title.
 * @param {html} content the content of the card.
 * @param {string} title the title of the card
 * @param {string} extraClass the extra class.
 * @returns the card with its contents and title.
 */
export default function Card({ content, title, extraClass }) {
  let headerContent = <div className="ob-card-header-title">{title}</div>;
  return (
    <NormalCard
      content={content}
      headerContent={headerContent}
      extraClass={extraClass}
    />
  );
}
