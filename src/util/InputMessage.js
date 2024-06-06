import React from "react";
import {FormattedMessage, injectIntl} from "react-intl";

class InputForm extends React.Component {
  render() {
      const {getFieldDecorator} = this.props.form;
      const {intl} = this.props;
      const placeholder = intl.formatMessage({id:this.props.id});

      return (
            getFieldDecorator(this.props.name,)(<Input placeholder={placeholder}/>)
      )
 }
}
export const InputForm = injectIntl(Form.create()(InputForm));