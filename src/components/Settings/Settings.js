import React, { useRef } from "react";
import { Row } from 'react-bootstrap';

import "./Settings.scss";

function Settings(props) {
  const { isExpanded, toggleExpand } = props
  const content = useRef(null);
  const maxHeight = isExpanded ? `${content.current.scrollHeight}px` : "0px"

  return (
    <div className="settings-section"  onClick={toggleExpand}>
      <div className={`settings settings-title ${isExpanded ? 'active' : ''}`}>
        Settings
      </div>
      <div ref={content} style={{ maxHeight }} className="settings-content" >
        <div className="settings-text">
          <Row>
            <a href="#change-password" className="settings-options"><u>Change Password</u></a>
          </Row>
          <Row>
            <a href="#avatar" className="settings-options"><u>Update Avatar</u></a>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Settings;
