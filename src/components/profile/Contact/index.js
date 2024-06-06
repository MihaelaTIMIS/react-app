import React from "react";
import Widget from "components/Widget";
import { contactList } from '../../../routes/Profile/data'

const Contact = (props) => {
  let user = {...props.user}
  return (
    <Widget title="Contact" styleName="gx-card-profile-sm">
        <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className={`icon icon-${contactList[0].icon} gx-fs-xxl gx-text-grey`} />
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">{user.email}</span>
            <p className="gx-mb-0">{}</p>
          </div>
        </div>
    </Widget>
  )
}

export default Contact;
