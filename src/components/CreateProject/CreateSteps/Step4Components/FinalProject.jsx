import React from "react"
import { Layout, Icon } from "antd";
import IntlMessages from "../../../../util/IntlMessages";
const { Content } = Layout

const ShareProject = () => {
    return (
        <div >
            <Layout>
                <Content>
                    <div className="btnCentered">
                        <h1><IntlMessages id="miuwi.project.bravoTitle" /> </h1>
                    </div>
                    <div className="btnCentered" style={{marginBottom:"30px"}}>
                        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{fontSize:"45px"}} />
                    </div>
                    <div className="btnCentered">
                        <h3><IntlMessages id="miuwi.project.bravoText" /> </h3>
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default ShareProject