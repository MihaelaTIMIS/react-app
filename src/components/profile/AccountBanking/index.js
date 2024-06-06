import React from "react";
import Widget from "../../Widget/index";
import { Button, Modal, Tag, Input, Icon } from "antd";
import { FormattedMessage } from "react-intl";
import IntlMessages from "../../../util/IntlMessages";
import { iban, userEarnings } from "./../../../appRedux/actions/users";
import { connect } from "react-redux";

import { validateIBAN } from "lc-validator-iban";
import { FieldValidationResult } from "lc-form-validation";

class AccountBanking extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      loading: false,
      validIban: false,
      valueIban: ""
    }
  }
  showModal(){
    this.setState({loading:false, modal:true, errorMessage: ""})
  }
  update () {
    if( this.props.user && !this.props.user.iban ){
      let result = new FieldValidationResult();
      result = validateIBAN(this.state.valueIban);
      if(!result.succeeded){
        this.setState({loading:false, errorMessage: "L'IBAN que vous avez saisi semble incomplet ou en erroné."});
      } else {
        this.setState({loading:true});
        this.props.iban(this.state.valueIban).then(result => {
          this.setState({loading:false, modal: false});
        });
      }
    } else {
      this.setState({loading:false, modal: false});
    }
  }
  cancel(){
    this.setState({modal:false})
  }
  handleChange = (evt) => {
    this.setState({valueIban: evt.target.value, validIban:false});
    if(validateIBAN(evt.target.value)){
      this.setState({valueIban: evt.target.value, validIban:true})
    }
  };
  
  componentWillMount(){
    this.props.userEarnings();
  }

  render(){
    return (
      <Widget styleName="gx-card-profile-sm"
        title={<FormattedMessage id="spliik.earnings.title" />}>
        <div  className="gx-pt-2" style={{fontWeight:"100"}}>
         <FormattedMessage id="spliik.earnings.line1" />&nbsp;<Tag color="#2db7f5" >{this.props.earnings && this.props.earnings.sum}</Tag><br/>
         <FormattedMessage id="spliik.earnings.line2" />&nbsp;<Tag color="#2db7f5" >{this.props.earnings && this.props.earnings.sum}</Tag>
        </div>
        <div  className="gx-pt-2" style={{fontWeight:"100"}}>
          <FormattedMessage id="spliik.earnings.line3" />
        </div>
        <div className="gx-pt-2">
         <Button onClick={() => this.showModal()}>
           {this.props.user && this.props.user.iban ? <FormattedMessage id="spliik.earnings.iban.preview" /> : <FormattedMessage id="spliik.earnings.iban.add" />}
         </Button>
        </div>  
        <Modal title={<IntlMessages  id="spliik.accountbanking.add" />} visible={this.state.modal}
          onOk={() => this.update()}
          onCancel={() => this.cancel()} 
          okText={this.props.user && this.props.user.iban ? <IntlMessages id="spliik.earnings.iban.close" /> : <IntlMessages id="spliik.earnings.iban.add" />}
          okType="primary"
          confirmLoading={this.state.loading}
          >
            
            <div  className="gx-pt-2" style={{fontWeight:"100"}}>
            <FormattedMessage id="spliik.earnings.line5" />
            </div>
            <Input
              prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />}
              name="iban"
              placeholder="IBAN"
              defaultValue={this.props.user && this.props.user.iban ? this.props.user.iban : ""}
              disabled={this.props.user && this.props.user.iban ? true : false}
              onChange={this.handleChange}
            />
            { this.props.user && this.props.user.iban && 
            <div  className="gx-pt-2" style={{color: "#FB6116", fontWeight:"100", marginTop:"20px"}}>
              <IntlMessages id="spliik.earnings.iban.validated" />
            </div>
            }
            <div  className="gx-pt-2" style={{color: "red", fontWeight:"100", marginTop:"20px"}}>
              {this.state.errorMessage} 
            </div>
        </Modal>
        
      </Widget>
    )
  }
};

const mapStateToProps = state => {
  return {
      user: state.user.user,
      earnings: state.user.earnings
  }
}
export default connect(mapStateToProps, {
  iban, userEarnings
})(AccountBanking)
