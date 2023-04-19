import React, { useEffect, useRef, useState } from "react";

export default function useClikedOn(ref, onChange) {
  let [element, setElement] = useState(null);
  let [match, setMatch] = useState(false);
  let clickRef = useRef(true);

  useEffect(() => {
    if (!match) {
      document.addEventListener("click", setClickedItem);
    }
  }, []);

  useEffect(() => {
    if (element != null) {
      if (ref != null && !ref.current.contains(element)) {
        onChange();
        onChange = null;
        ref = null;
      }
    }
  }, [element]);

  /**
   * Sets the clicked item.
   * @param {element} item the item.
   */
  function setClickedItem(item) {
    if (ref.current == null) {
      document.removeEventListener("click", setClickedItem);
    } else {
      if (!clickRef.current) {
        setElement(item.target);
      } else {
        clickRef.current = false;
      }
    }
  }
  return null;
}
