import React from "react";
import { Card, Modal, Button } from "antd"
import { connect } from 'react-redux'
import IntlMessages from "util/IntlMessages";
import { getUrlVars } from "../../library/urlVar"
import SwitchStep from "../../components/CreateProject/SwitchStep";
import { getProject } from "../../appRedux/actions/projects"
import { Link } from "react-router-dom";
import CircularProgress from "../../components/CircularProgress";
class UpdateProject extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      loading: false
    }
  }


  componentWillMount() {
    this.setState({
      loading: true
    })
  }

  componentWillUnmount() {
    this.mounted = false;
  }



  componentDidMount() {
    this.mounted = true
    
    if (this.mounted) {
      this.props.getProject(getUrlVars()['id'])
        .then((project) => {
          if (project.submitted_project || project.online)
            this.setState({
              showModal: true
            })
        })
        .catch((e) => console.log(e))
      this.setState({ loading: false })
    }
  }

  render() {
    if (this.state.loading) return <CircularProgress />
    else {
      let slug = getUrlVars()['id'];
      if (this.state.showModal)
        return (
          <Modal
            visible={this.state.showModal}
            onCancel={() => this.setState({ showModal: false })}
            footer={[null,
              <Link key="submit" to={`/user?view=owner`}>
                <Button type="primary">
                  OK
                  </Button>
              </Link>
            ]}
          >
            {<div>
              <br />
              <p>{<IntlMessages id="miuwi.project.edit.error" />}</p>
            </div>}
          </Modal>
        )

      else
        return (
          <div>
            <h1 className="title gx-mb-4" style={{ textAlign: "center" }}>
              {slug && <IntlMessages id="miuwi.sidebar.editProject" />}
            </h1>
            {this.props.project && this.props.project.comment_rejected &&
              <Card style={{ color: "orange", whiteSpace:'pre-line' }}>
                <IntlMessages id="miuwi.project.rejectedReason" />: {this.props.project.comment_rejected}
              </Card>
            }
            <SwitchStep slug={slug} />
          </div>
        );
    }
  };
}

const mapStateToProps = (state) => {
  return {
    project: state.projects.project,
  }
};
export default connect(mapStateToProps, { getProject })(UpdateProject)
