import React from "react";
import Widget from "../../Widget/index";
import { Badge } from "antd";


const EarningsProgress = () => {
  return (
    <Widget styleName="gx-card-profile-sm"
      title={<span>Gains en cours<span className="gx-text-grey" style={{float: "right"}}>Total : 300.00€</span></span>}>
      
      <div  className="gx-pt-2" style={{fontWeight:"100"}}>
        Ceux sont les gains qui seront versés après le délai légal du consommateur, si ce dernier ne se rétracte pas.
      </div>
      <div className="gx-pt-2">
        <ul className="gx-fnd-list gx-mb-0">
         <li style={{width:"100%"}}><Badge status="warning"/>12/10/19 Test...<span style={{"float":"right"}}>100.00€</span></li>
         <li style={{width:"100%"}}><Badge status="warning"/>20/10/19 Test...<span style={{"float":"right"}}>100.00€</span></li>
         <li style={{width:"100%"}}><Badge status="warning"/>25/10/19 Test...<span style={{"float":"right"}}>100.00€</span></li>
        </ul>
      </div>
    </Widget>
  )
};
export default EarningsProgress;
