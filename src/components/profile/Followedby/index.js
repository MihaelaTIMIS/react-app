import React from "react";
import Widget from "../../Widget/index";
import { Avatar } from "antd";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';


class Followedby extends React.Component {
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
        title={<FormattedMessage id="spliik.followedby" />}>
          {this.props.followedby && this.props.followedby.map((f, key) => {
            return (<div key={key} className="gx-pt-2" style={{fontWeight:"100"}}>
              <Link to={`/profile/?slug=${f.follower.slugUser}`} style={{color:"#535353"}} >
                {f.follower && f.follower.mediaProfile && f.follower.mediaProfile && <Avatar src={f.follower.mediaProfile.path} className="gx-size-40" alt={""} style={{marginRight:"10px"}} /> }
                {f.follower.firstname ? f.follower.firstname : f.follower.pseudo }
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

})(Followedby)
