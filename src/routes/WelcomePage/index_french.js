import React from "react";
import { Row, Col, Layout } from "antd";
import "./index.css";
import { Link } from "react-router-dom";

const { Content } = Layout;
const WelcomePage = () => {
  return (
    <Layout >
      <Content >
        <Row type="flex" justify="center" >
          <Col>
            <img alt="" src="https://spliik-asset.s3.eu-central-1.amazonaws.com/LogoSPLIIK_final.png" width="200" />
          </Col>
        </Row>
        <Row span={20} type="flex" justify="center" >
          <Col span={20} className="thumbnail">
            <img className="img" alt="" src="https://spliik-asset.s3.eu-central-1.amazonaws.com/img1.jpg" />

            <h1 className="caption" > Le monde sera plus intelligent <br />si vous lui vendez vos compétences.</h1>

          </Col>
        </Row>
        <br />
        <Row span={20} type="flex" justify="center" >
          <Col span={18} type="flex" justify="center" >
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontWeight: "bolder", fontSize: '24px' }}>
                Diffusez vos cours en mode step by step : rapide, simple et efficace.
            </h2>
            </div>
          </Col>
        </Row>
        <br />
        <Row type="flex" justify="center" className="gutter-ex" gutter={8} >
          <Col span={6} type="flex" justify="center" style={{ textAlign: "center", backgroundSize: "100%", height: "40px" }}  >
            <p className="gutter-box" style={{
              fontFamily: 'Gill Sans; Gill Sans MT; Myriad Pro; DejaVu Sans Condensed; Helvetica; Arial; sans-serif'
            }} > RAPIDE </p>
          </Col>
          <Col span={6} type="flex" justify="center" style={{ textAlign: "center", backgroundSize: "100%", height: "40px" }}  >
            <p className="gutter-box" style={{
              fontFamily: 'Gill Sans; Gill Sans MT; Myriad Pro; DejaVu Sans Condensed; Helvetica; Arial; sans-serif'
            }}>SIMPLE</p>
          </Col>
          <Col span={6} type="flex" justify="center" style={{ textAlign: "center", backgroundSize: "100%", height: "40px" }} >
            <p className="gutter-box" style={{
              fontFamily: 'Gill Sans; Gill Sans MT; Myriad Pro; DejaVu Sans Condensed; Helvetica; Arial; sans-serif'
            }}>  EFFICACE</p>
          </Col>
        </Row>
        <Row span={20} type="flex" justify="center">
          <Col span={6} type="flex" justify="center" >
            <p style={{ textAlign: "justify", padding: "0px 10px 0px 10px" }}>
              En à peine quelques clics, vous créez votre tableau de bord personnel, à partir duquel vous produisez vos cours et paramétrez vos tarifs pour percevoir immédiatement vos gains.
            </p>
          </Col>
          <Col span={6} type="flex" justify="center" >
            <p style={{ textAlign: "justify", padding: "0px 10px 0px 10px" }} >Vous êtes guidé pas à pas tout au long du processus. Vous ne pouvez pas vous tromper, même si vous n'avez jamais diffusé de cours en ligne. Vous donnez ainsi naissance à vos ateliers de formation.</p>
          </Col>
          <Col span={6} type="flex" justify="center" >
            <p style={{ textAlign: "justify", padding: "0px 10px 0px 10px" }}>
              Vos ateliers vont à l'essentiel. Un maximum d'informations dans un cours spécifique : sans fioritures ni digressions, que de l'action. Vos étudiants intègrent et appliquent ainsi parfaitement le savoir que vous leur délivrez.
            </p>
          </Col>
        </Row>
        <Row span={20} type="flex" justify="center">
          <Col span={20} style={{
            background: "#EEB708", backgroundSize: "100%", height: "120px", textAlign: "center", fontWeight: "bolder", fontSize: '24px',
          }}><div>
              <Link style={{
                position: "absolute", top: "30%", bottom: ' 0', left: '0', right: ' 0', width: ' 50 %', height: ' 30 %', color: '-webkit-link', textDecoration: 'underline', fontFamily: 'Gill Sans; Gill Sans MT; Myriad Pro; DejaVu Sans Condensed; Helvetica; Arial; sans-serif'
              }} to="/signup" rel="noopener noreferrer" color='-webkit-link'>Je crée mon espace personnel maintenant</Link></div><br /><br />
            <div style={{ color: '#262626' }}>(100% gratuit)</div>
          </Col>
        </Row>
        <br />
        <Row span={18} type="flex">
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
                  "Grâce à SpliiK tel qu'il est structuré, mon travail est parfaitement organisé. Je publie mes ateliers en toute simplicité, et par ailleurs je peux suivre l'évolution de mes étudiants. Bien plus que de simples sessions d'apprentissage, ce sont de véritables relations que je noue."</p>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px", paddingTop: "40px", textAlign: "justify", fontStyle: 'italic' }} >
                <p >
                  "Les formations que je dispense en entreprises sont limitantes, notamment en nombre d'étudiants et en temps. SpliiK me permet en quelque sorte de me démultiplier, et toute personne peut, n'importe quel jour à n'importe quelle heure, travailler sur mes ateliers."
            </p>
              </Col>
              <Col span={6} style={{ paddingLeft: "10px", paddingTop: "40px", textAlign: "justify", fontStyle: 'italic' }}>
                <p >
                  "En tant que citoyenne du monde convaincue, je forme les entreprises aux technologies conçues pour un plus grand respect de notre planète. Le fait que mes ateliers soient accessibles dans le monde entier me donne espoir pour notre avenir écologique."
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
                  <Col >Intégrateur Wordpress
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
                  <Col >Expert en Sécurité Informatique
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
                  <Col >Consultante Développement Durable
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
              <Link style={{
                position: "absolute", top: "30%", bottom: ' 0', left: '0', right: ' 0', width: ' 50 %', height: ' 30 %', color: '-webkit-link', textDecoration: 'underline', fontFamily: 'Gill Sans; Gill Sans MT; Myriad Pro; DejaVu Sans Condensed; Helvetica; Arial; sans-serif'
              }} to="/project/create" rel="noopener noreferrer" color='-webkit-link'>Je crée mon premier atelier</Link></div><br /><br />
            <div style={{ color: '#262626' }}>(100% gratuit)</div>
          </Col>
        </Row>
        <br /><br />
        <Row span={20} type="flex" justify="center">
          <Col span={18} type="flex" justify="center" >
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontWeight: "bolder", fontSize: '35px' }}>Vous créez une réelle valeur ajoutée </h2><br />

              <h3 style={{ fontSize: '22px' }}>
                Quand la connaissance se partage et se multiplie, le monde s'améliore.
              <br />
                Vous et vos étudiants avancez vers les résultats concrets que vous visez. </h3>
              <br /><br /><br />
              <h2 style={{ fontWeight: "bolder", fontSize: '35px' }}>Vos revenus augmentent </h2><br />

              <h3 style={{ fontSize: '22px' }}>
                Votre savoir-faire est rémunéré à sa juste valeur.
          <br />
                C'est vous qui fixez votre prix.</h3>
              <br /><br /><br />

              <h2 style={{ fontWeight: "bolder", fontSize: '35px' }}>Vous n'êtes jamais seul </h2><br />

              <h3 style={{ fontSize: '22px' }}>
                A chaque étape de votre parcours de formateur, nous sommes là pour vous.
          <br />
                Il est dans l'ADN de SpliiK de vous guider et de vous conseiller à tout moment.</h3>
              <br /><br /><br />

              <Link to="/project/create" rel="noopener noreferrer">
              <button style={{"minHeight":"30px", "border":"2px solid #E9630E", "padding":"10px", "backgroundColor":"#E9630E", "color":"#FFF"}}>
                  Je deviens formateur SpliiK aujourd'hui
              </button>
              </Link>
              <br /><br /><br /><br /><br /><br />
            </div>
          </Col>
        </Row>
      </Content>
    </Layout >
  );
};

export default WelcomePage;
