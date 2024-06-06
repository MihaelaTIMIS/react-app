import React from "react";
import { Layout, Form, Tag, Icon } from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import { ReactMultiEmailCustom } from "react-multi-email-custom";
import "react-multi-email-custom/style.css";
import { MODE_EXPERT } from "../../../RealizeProject/RealizeProjectHeader";

class ShareProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: []
    };
    this.getLabel = this.getLabel.bind(this);
  }

  getLabel = (email, index, removeEmail) => {
    return (
      <div data-tag key={index}>
        {email}
        <span data-tag-handle onClick={() => removeEmail(index)}>
          ×
        </span>
      </div>
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { emails } = this.state;
    return (
      <Layout>
       
          {this.props.mode === MODE_EXPERT && (
            <>
              <h3>
                <IntlMessages id="miuwi.project.diffusionBis.shareTitle" />
              </h3>
              <p>
                <IntlMessages id="miuwi.project.diffusionBis.shareText1" />
              </p>
            </>
          )}

          <p>
            <IntlMessages id="miuwi.project.diffusionBis.shareText2" />
          </p>
        
        {getFieldDecorator(
          "emails",
          {}
        )(
          <ReactMultiEmailCustom
            emails={emails}
            onChange={_emails => {
              if (_emails.length <= 5) this.setState({ emails: _emails });
            }}
            getLabel={(email, index, removeEmail) => {
              return (
                <Tag key={index}>
                  {email}
                  <Icon type="close" onClick={() => removeEmail(index)} />
                </Tag>
              );
            }}
          />
        )}

        <br />
      </Layout>
    );
  }
}

const WrappedForm = Form.create({ name: "project-share" })(ShareProject);

export default WrappedForm;
