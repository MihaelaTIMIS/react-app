import React from "react"
import { Layout } from "antd";
import FinalProject from "./Step4Components/FinalProject";
import { MODE_EXPERT } from "../../ReadProject/ProjectInfos";
import RealizeProjectHeader from "../../RealizeProject/RealizeProjectHeader";
const { Content } = Layout

class Step6 extends React.Component {
    render() {
        return (
            <div className="steps-content">
                <Layout>
                    <Content>
                        {/* <ProjectInfos mode={MODE_EXPERT} /> */}
                        <RealizeProjectHeader mode={MODE_EXPERT} whenEditProject={true} />
                        <FinalProject />
                    </Content>
                </Layout>
            </div>
        )
    }
}

export default Step6;


