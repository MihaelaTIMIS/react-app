import React from "react";
import { Badge, Layout } from "antd";
const { Content } = Layout
const OverflowCount = (props) => {
  return (
    <Layout >
      <Content>
        {/*
        <Badge count={<Avatar icon="user" />} >
        </Badge>
        <Badge count={<Avatar icon="user" />} showZero>
        </Badge>
        <Badge count={<Avatar icon="user" />} showZero>
        </Badge>
        &nbsp;&nbsp;
        */}
        <Badge className="gx-mt-3" count={props.nbStudents} overflowCount={props.nbStudents}>
          <span className="head-example" />
        </Badge>
      </Content>
    </Layout>
  );
};

export default OverflowCount;
