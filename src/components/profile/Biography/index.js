import React from "react";
import Widget from "components/Widget";
import IntlMessages from '../../../util/IntlMessages'
const Biography = (props) => {

  let description = props.headline

  return (
    <Widget styleName="gx-card-profile">
      <div className="ant-card-head">
        <span className="ant-card-head-title gx-mb-2"><IntlMessages id="miuwi.user.description"/></span>
        <p className="gx-text-grey gx-fs-sm gx-mb-0"></p>
      </div>
      {/* <h3 className="gx-font-weight-light">Donec dignissim gravida sem, ut cursus dolor hendrerit et. Morbi
        volutpat.</h3> */}
      <p style={{whiteSpace:'pre-line'}}>
      {description}
      </p>
      

    </Widget>
    
 
  )
}


export default Biography;
