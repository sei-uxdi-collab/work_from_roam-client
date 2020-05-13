import React, { useRef } from "react";

import "./Info.scss";

function Info(props) {
  const { isExpanded, toggleExpand } = props

  const content = useRef(null);
  const maxHeight = isExpanded ? `${content.current.scrollHeight}px` : "0px"

  return (
    <div className="info-section"  onClick={toggleExpand}>
      <div className={`info info-title ${isExpanded ? 'active' : ''}`}>
        {props.title}
      </div>
      <div
        ref={content}
        style={{ maxHeight }}
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
