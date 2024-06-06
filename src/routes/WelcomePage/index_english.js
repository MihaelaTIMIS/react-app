import React from "react";
import { Row, Col, Layout } from "antd";
import "./index.css";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <Layout >
      <Row type="flex" justify="center">
        <Col>
          <img alt="" src="https://spliik-asset.s3.eu-central-1.amazonaws.com/LogoSPLIIK_final.png" width="200" />
        </Col>
      </Row>
      <Row span={20} type="flex" justify="center">
        <Col span={20} className="thumbnail">
          <img className="img" alt="" src="https://spliik-asset.s3.eu-central-1.amazonaws.com/img1.jpg" />

          <h1 className="caption"> The world will be smarter  <br /> if you sell him your skills.</h1>
        </Col>
      </Row>
      <br />
      <Row span={20} type="flex" justify="center">
        <Col span={18} type="flex" justify="center" >
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontWeight: "bolder", fontSize: '24px' }}>
              Broadcast your lessons in step by step mode: fast, simple and effective.
            </h2>
          </div>
        </Col>
      </Row>
      <br />
      <Row type="flex" justify="center" className="gutter-ex" gutter={8} >
        <Col span={6} type="flex" justify="center" style={{ textAlign: "center", backgroundSize: "100%", height: "40px" }}>
          <p className="gutter-box" style={{
            fontFamily: 'Gill Sans; Gill Sans MT; Myriad Pro; DejaVu Sans Condensed; Helvetica; Arial; sans-serif'
          }}> RAPIDE </p>
        </Col>
        <Col span={6} type="flex" justify="center" style={{ textAlign: "center", backgroundSize: "100%", height: "40px" }} >
          <p className="gutter-box" style={{
            fontFamily: 'Gill Sans; Gill Sans MT; Myriad Pro; DejaVu Sans Condensed; Helvetica; Arial; sans-serif'
          }}>
            SIMPLE
          </p>
        </Col>
        <Col span={6} type="flex" justify="center" style={{ textAlign: "center", backgroundSize: "100%", height: "40px" }} >
          <p className="gutter-box" style={{
            fontFamily: 'Gill Sans; Gill Sans MT; Myriad Pro; DejaVu Sans Condensed; Helvetica; Arial; sans-serif'
          }}>  EFFICACE</p>
        </Col>
      </Row>
      <Row span={20} type="flex" justify="center">
        <Col span={6} type="flex" justify="center">
          <p style={{ textAlign: "justify", padding: "0px 10px 0px 10px" }}>
            In just a few clicks, you create your personal dashboard, from which you produce your courses and set your rates to receive your winnings immediately.
            </p>
        </Col>
        <Col span={6} type="flex" justify="center">
          <p style={{ textAlign: "justify", padding: "0px 10px 0px 10px" }}>
            You are guided step by step through the process. You can not go wrong, even if you have never broadcast a course online. You give birth to your training workshops.
            </p>
        </Col>
        <Col span={6} type="flex" justify="center">
          <p style={{ textAlign: "justify", padding: "0px 10px 0px 10px" }}>
            Your workshops are going to the essentials. A maximum of information in a specific course: no frills or digressions, only action. Your students integrate and apply perfectly the knowledge you give them.
            </p>
        </Col>
      </Row>
      <Row span={20} type="flex" justify="center">
        <Col span={20} style={{
          background: "#EEB708", backgroundSize: "100%", height: "120px", textAlign: "center", fontWeight: "bolder", fontSize: '24px',
        }}><div>
            <Link style={{
              position: "absolute", top: "30%", bottom: ' 0', left: '0', right: ' 0', width: ' 50 %', height: ' 30 %', color: '-webkit-link', textDecoration: 'underline', fontFamily: 'Gill Sans; Gill Sans MT; Myriad Pro; DejaVu Sans Condensed; Helvetica; Arial; sans-serif'
            }} to="/signup" rel="noopener noreferrer" color='-webkit-link'>
              I create my personal space now</Link></div><br /><br />
          <div style={{ color: '#262626' }}>(100% free)</div>
        </Col>
      </Row>
      <br />
      <Row span={18}>
        <Col>
          <Row type="flex" justify="center">
            <Col span={6} type="flex" justify="center" style={{ paddingLeft: "30px", paddingTop: "10px" }}>
              <img alt="" src='https://spliik-asset.s3.eu-central-1.amazonaws.com/img2.jpg' width='274' height="233" />
            </Col>
            <Col span={6} type="flex" justify="center" style={{ paddingLeft: "30px", paddingTop: "10px" }}>
              <img alt="" src='https://spliik-asset.s3.eu-central-1.amazonaws.com/img4.jpg' width='274' height="233" />
            </Col>
            <Col span={6} type="flex" justify="center" style={{ paddingLeft: "30px", paddingTop: "10px" }}>
              <img alt="" src='https://spliik-asset.s3.eu-central-1.amazonaws.com/img3.jpg' width='274' height="233" />
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span={6} style={{ paddingLeft: "10px", paddingTop: "40px", textAlign: "justify", fontStyle: 'italic' }}>
              <p >
                "Thanks to SpliiK as it is structured, my work is perfectly organized. I publish my workshops with ease, and I can follow the evolution of my students. More than just learning sessions, they are real relationships that I make. "
                </p>
            </Col>
            <Col span={6} style={{ paddingLeft: "10px", paddingTop: "40px", textAlign: "justify", fontStyle: 'italic' }} >
              <p >
                "The training I provide in companies is limiting, especially in terms of number of students and time. SpliiK allows me somehow to multiply myself, and anyone can, any day at any time, work on my workshops. "
            </p>
            </Col>
            <Col span={6} style={{ paddingLeft: "10px", paddingTop: "40px", textAlign: "justify", fontStyle: 'italic' }}>
              <p >
                "As a convinced citizen of the world, I train companies in technologies designed for greater respect for our planet. The fact that my workshops are accessible around the world gives me hope for our ecological future. "
          </p>
            </Col>
          </Row>
          <Row type="flex" justify="center" >
            <Col span={6} >
              <Row type="flex" justify="end" >
                <Col >Jean-Pierre K.
            </Col>
              </Row>
              <Row type="flex" justify="end">
                <Col >Wordpress Integrator
            </Col>
              </Row>
              <Row type="flex" justify="end" >
                <Col >Dijon (21)
            </Col>
              </Row>
            </Col>
            <Col span={6} >
              <Row type="flex" justify="end" >
                <Col >Alain T.
            </Col>
              </Row>
              <Row type="flex" justify="end">
                <Col >Expert in Computer Security
            </Col>
              </Row>
              <Row type="flex" justify="end">
                <Col > Toulouse (31)
            </Col>
              </Row>
            </Col>
            <Col span={6} >
              <Row type="flex" justify="end">
                <Col >Alicia C.
            </Col>
              </Row>
              <Row type="flex" justify="end">
                <Col >Sustainable Development Consultant
            </Col>
              </Row>
              <Row type="flex" justify="end">
                <Col > Paris (75)
            </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row span={20} type="flex" justify="center">
        <Col span={20} style={{
          background: "#EEB708", backgroundSize: "100%", height: "120px", textAlign: "center", fontWeight: "bolder", fontSize: '24px',
        }}><div>
            <a style={{
              position: "absolute", top: "30%", bottom: ' 0', left: '0', right: ' 0', width: ' 50 %', height: ' 30 %', color: '-webkit-link', textDecoration: 'underline', fontFamily: 'Gill Sans; Gill Sans MT; Myriad Pro; DejaVu Sans Condensed; Helvetica; Arial; sans-serif'
            }} href="/project/create" rel="noopener noreferrer" color='-webkit-link'>I create my first workshop</a></div><br /><br />
          <div style={{ color: '#262626' }}>(100% free)</div>
        </Col>
      </Row>
      <br /><br />
      <Row span={20} type="flex" justify="center">
        <Col span={18} type="flex" justify="center" >
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontWeight: "bolder", fontSize: '35px' }}>
              You create real added value
            </h2><br />

            <h3 style={{ fontSize: '22px' }}>
              When knowledge is shared and multiplies, the world improves.
              <br />
              You and your students are moving towards the concrete results you are aiming for. </h3>
            <br /><br /><br />
            <h2 style={{ fontWeight: "bolder", fontSize: '35px' }}>
              Your income goes up
              </h2><br />

            <h3 style={{ fontSize: '22px' }}>
              Your know-how is remunerated at its fair value.
          <br />
              It is you who set your price.</h3>
            <br /><br /><br />

            <h2 style={{ fontWeight: "bolder", fontSize: '35px' }}>
              You are never alone
              </h2><br />

            <h3 style={{ fontSize: '22px' }}>
              At each stage of your trainer journey, we are here for you.
          <br />
              It is in SpliiK's DNA to guide and advise you at all times.
              </h3>
            <br /><br /><br />
            <button>
              <Link to="/signup" rel="noopener noreferrer">I become SpliiK trainer today</Link>
            </button>
            <br /><br /><br /><br /><br /><br />


          </div>
        </Col>
      </Row>
    </Layout >

  );
};

export default WelcomePage;
