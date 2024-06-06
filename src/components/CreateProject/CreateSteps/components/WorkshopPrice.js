import React from "react";
import { Form, Radio, Input, InputNumber, Row, Col } from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import {
  getProject,
  getProjectPrice
} from "./../../../../appRedux/actions/projects";
import { connect } from "react-redux";
import { getUrlVars } from "../../../../library/urlVar";

class WorkshopPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: this.props.project,
      value: 1
    };
    this.changePriceTTC = this.changePriceTTC.bind(this);
  }
  componentDidMount() {
    let slug = getUrlVars()["id"];
    if (slug)
      this.props.getProject(slug).then(p => {
        this.setState({ projet: p });
        this.props.form.setFieldsValue({
          value: p.is_free ? 0 : 1
        });
        this.props.getProjectPrice(this.state.project);
      });
  }
  componentDidUpdate() {
    this.props.getProjectPrice(this.state.project);
  }
  onChange = e => {
    this.setState({
      value: e.target.value,
      project: {
        is_free: e.target.value === 0 ? true : false
      }
    });
  };
  financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  // changePrice(value) {
  //   let expert = Number.parseFloat(value);
  //   let commission = 0.4 * expert; // 28,5%
  //   let price_totalHT = expert + commission;
  //   let price_totalTTC = 1.20 * price_totalHT;
  //   this.setState({
  //     project: {
  //       ...this.state.project,
  //       price: value,
  //       commission: this.financial(commission),
  //       price_totalHT: this.financial(price_totalHT),
  //       price_totalTTC: this.financial(price_totalTTC)
  //     }
  //   });
  // }

  changePriceTTC(value) {
    let price_totalTTC = Number.parseFloat(value);
    let price_totalHT = price_totalTTC / 1.2; // TVA 20%
    let commission = price_totalHT * 0.285; // Commission 28.50%
    let expert = price_totalHT - commission;
    this.setState({
      project: {
        ...this.state.project,
        price_totalTTC: value,
        commission: this.financial(commission),
        price_totalHT: this.financial(price_totalHT),
        price: this.financial(expert)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // let { project } = this.state;
    return (
      <Form>
        {getFieldDecorator("slug", {
          initialValue: this.props.project && this.props.project.slug
        })(<Input type="hidden"></Input>)}

        <h3>
          <IntlMessages id="miuwi.project.tarif.title" />
        </h3>
        {getFieldDecorator("value", {
          rules: [
            {
              required: true,
              message: <IntlMessages id="miuwi.errorInput.title" />
            }
          ]
        })(
          <Radio.Group onChange={this.onChange}>
            <Radio value={0}>
              <IntlMessages id="miuwi.project.tarif.free" />
            </Radio>
            <Radio value={1}>
              <IntlMessages id="miuwi.project.tarif.paying" />
            </Radio>
          </Radio.Group>
        )}
        <br />
        <br />
        
          <Row span={24} hidden={this.state.project.is_free}>
            <Col md={12} xs={24}>
              {/* price TTC */}
              <Row type="flex" justify="end" span={24} className="price-row">
                <Col span={18}>
                  <IntlMessages id="miuwi.project.tarif.shownPrice" /> TTC (TVA:
                  20%)
                </Col>
                <Col md={4} xs={5}>
                  <p style={{ float: "right" }}>
                    {getFieldDecorator("priceTTC", {
                      initialValue: this.state.project.price_totalTTC,
                      rules: [
                        {
                          required: !this.state.project.is_free,
                          message: <IntlMessages id="muwi.errorInput.title" />
                        }
                      ]
                    })(
                      <InputNumber
                        min={0}
                        size="small"
                        type="string"
                        precision="2"
                        decimalSeparator=","
                        style={{ textAlign: "right" }}
                        formatter={value =>
                          this.state.project.price_totalTTC || value
                        }
                        className="input-price-number"
                        //parser={value => value}
                        onChange={this.changePriceTTC}
                      />
                    )}
                  </p>
                </Col>
                <Col span={1}>€</Col>
              </Row>

              {/* price HT */}
              <Row type="flex" justify="end" span={24} className="price-row">
                <Col span={18}>
                  <label>
                    <IntlMessages id="miuwi.project.tarif.shownPrice" />
                  </label>{" "}
                  HT
                </Col>
                <Col md={4} xs={5}>
                  <p style={{ float: "right" }}>
                    {`${this.financial(
                      this.state.project.price_totalHT
                        ? this.state.project.price_totalHT
                        : 0
                    )}`}
                  </p>
                </Col>
                <Col span={1}>€</Col>
              </Row>

              {/* price Expert */}
              <Row type="flex" justify="end" span={24} className="price-row">
                <Col span={18}>
                  <label>
                    <IntlMessages id="miuwi.project.tarif.price" />{" "}
                  </label>{" "}
                </Col>
                <Col md={4} xs={5}>
                  <p style={{ float: "right" }}>
                    {`${this.financial(
                      this.state.project.price ? this.state.project.price : 0
                    )}`}
                  </p>
                </Col>
                <Col span={1}>€</Col>
              </Row>

              {/* commission */}
              <Row type="flex" justify="end" span={24} className="price-row">
                <Col span={18}>
                  <label>
                    <IntlMessages id="miuwi.project.tarif.commission" />{" "}
                    (28,50%)
                  </label>
                </Col>
                <Col md={4} xs={5}>
                  <p style={{ float: "right" }}>
                    {this.financial(
                      this.state.project.commission
                        ? this.state.project.commission
                        : 0
                    )}
                  </p>
                </Col>
                <Col span={1}>€</Col>
              </Row>
            </Col>
          </Row>
       
        <div hidden={!this.state.project.is_free}>
          <IntlMessages id="miuwi.project.tarif.shownPrice" />:{" "}
          <IntlMessages id="miuwi.project.tarif.offered" />
        </div>
      </Form>
    );
  }
}

const WrappedForm = Form.create({ name: "worksop-price" })(WorkshopPrice);

const mapStateToProps = state => {
  return {
    project: state.projects.project,
    project_price: state.projects.project_price
  };
};

export default connect(
  mapStateToProps,
  { getProject, getProjectPrice }
)(WrappedForm);
