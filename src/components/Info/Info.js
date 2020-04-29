import React, { useState, useRef } from "react";

import "./Info.scss";

function Info(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");

  const content = useRef(null);

  function toggleView() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
  }

  return (
    <div className="info-section"  onClick={toggleView}>
      <div className={`info info-title ${setActive}`}>
        {props.title}
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="info-content"
      >
        <div
          className="info-text"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
}

export default Info;
