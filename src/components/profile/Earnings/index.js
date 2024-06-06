import React from "react";
import Widget from "../../Widget/index";
import { Badge } from "antd";


const Earnings = () => {
  return (
    <Widget styleName="gx-card-profile-sm"
      title={<span>Gains acquis<span className="gx-text-grey" style={{float: "right"}}>Total : 300.00€</span></span>}>
      
      <div  className="gx-pt-2" style={{fontWeight:"100"}}>
        Ceux sont les gains déjà versés sur votre compte bancaire.
      </div>
      <div className="gx-pt-2">
        <ul className="gx-fnd-list gx-mb-0">
         <li style={{width:"100%"}}><Badge status="success"/> Atelier : Test...<span style={{"float":"right"}}>100.00€</span></li>
         <li style={{width:"100%"}}><Badge status="success"/> Atelier : Test...<span style={{"float":"right"}}>100.00€</span></li>
         <li style={{width:"100%"}}><Badge status="success"/> Atelier : Test...<span style={{"float":"right"}}>100.00€</span></li>
        </ul>
      </div>
    </Widget>
  )
};
export default Earnings;
