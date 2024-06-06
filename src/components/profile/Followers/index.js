import React from "react";
import Widget from "../../Widget/index";
import { Avatar } from "antd";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';


class Followers extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  componentWillMount(){
  }

  render(){
    return (
      <Widget styleName="gx-card-profile-sm"
        title={<FormattedMessage id="spliik.followed" />}>
          {this.props.followers && this.props.followers.map((f, key) => {
            return (<div key={key} className="gx-pt-2" style={{fontWeight:"100"}}>
              <Link to={`/profile/?slug=${f.followed.slugUser}`} style={{color:"#535353"}} >
                {f.followed && f.followed.mediaProfile && f.followed.mediaProfile && <Avatar src={f.followed.mediaProfile.path} className="gx-size-40" alt={""} style={{marginRight:"10px"}} /> }
                {f.followed.firstname ? f.followed.firstname : f.followed.pseudo }
              </Link>
            </div>)
          })}
      </Widget>
    )
  }
};

const mapStateToProps = state => {
  return {
  }
}
export default connect(mapStateToProps, {

})(Followers)
