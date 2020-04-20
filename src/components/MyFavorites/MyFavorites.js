import React, { useState, useRef } from "react";

import "./MyFavorites.scss";

function MyFavorites(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");

  const content = useRef(null);

  function toggleInfo() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
  }

  return (
    <div className="myfavorites-section"  onClick={toggleInfo}>
      <div className={`myfavorites myfavorites-title ${setActive}`}>
        {props.title}
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="myfavorites-content"
      >
        <div
          className="myfavorites-text"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
}

export default MyFavorites;
