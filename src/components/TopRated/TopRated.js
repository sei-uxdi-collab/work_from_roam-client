import React, { useState, useRef } from "react";

import "./TopRated.scss";

function TopRated(props) {
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
    <div className="toprated-section"  onClick={toggleInfo}>
      <div className={`toprated toprated-title ${setActive}`}>
        {props.title}
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="toprated-content"
      >
        <div
          className="toprated-text"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
}

export default TopRated;
