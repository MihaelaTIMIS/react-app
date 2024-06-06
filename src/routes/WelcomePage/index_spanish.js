import React from "react";
import { Row, Col, Layout } from "antd";
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
                    <h1 className="caption"> El mundo será más inteligente  <br /> si le vendes tus habilidades.</h1>
                </Col>
            </Row>
            <br />
            <Row span={20} type="flex" justify="center">
                <Col span={18} type="flex" justify="center" >
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontWeight: "bolder", fontSize: '24px' }}>
                            Transmita sus lecciones en modo paso a paso: rápido, simple y efectivo.
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
                    }}>SIMPLE</p>
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
                        Con solo unos pocos clics, crea su panel de control personal, desde el cual produce sus cursos y establece sus tarifas para recibir sus ganancias de inmediato.
            </p>
                </Col>
                <Col span={6} type="flex" justify="center" >
                    <p style={{ textAlign: "justify", padding: "0px 10px 0px 10px" }}>
                        Usted es guiado paso a paso a través del proceso. No puede equivocarse, incluso si nunca ha transmitido un curso en línea. Usted da a luz a sus talleres de capacitación.
            </p>
                </Col>
                <Col span={6} type="flex" justify="center" >
                    <p style={{ textAlign: "justify", padding: "0px 10px 0px 10px" }}>
                        Tus talleres van a lo esencial. Un máximo de información en un curso específico: sin adornos o digresiones, solo acción. Sus alumnos integran y aplican perfectamente el conocimiento que les da.
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
                            Creo mi espacio personal ahora</Link></div><br /><br />
                    <div style={{ color: '#262626' }}>(100% gratis)</div>
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
                                "Gracias a SpliiK, ya que está estructurado, mi trabajo está perfectamente organizado. Publico mis talleres con facilidad y puedo seguir la evolución de mis alumnos. Más que solo sesiones de aprendizaje, son relaciones reales que hago ".
                </p>
                        </Col>
                        <Col span={6} style={{ paddingLeft: "10px", paddingTop: "40px", textAlign: "justify", fontStyle: 'italic' }} >
                            <p >
                                "La capacitación que proporciono en las empresas es limitada, especialmente en términos de número de estudiantes y tiempo. SpliiK me permite multiplicarme de alguna manera, y cualquiera puede, en cualquier momento a cualquier hora, trabajar en mis talleres ".
            </p>
                        </Col>
                        <Col span={6} style={{ paddingLeft: "10px", paddingTop: "40px", textAlign: "justify", fontStyle: 'italic' }}>
                            <p >
                                "Como un ciudadano convencido del mundo, entreno a compañías en tecnologías diseñadas para un mayor respeto por nuestro planeta. El hecho de que mis talleres sean accesibles en todo el mundo me da esperanza para nuestro futuro ecológico ".
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
                                <Col >Experto en seguridad informática
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
                                <Col >Consultor de desarrollo sostenible
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
                        }} to="/project/create" rel="noopener noreferrer" color='-webkit-link'>Creo mi primer taller</Link></div><br /><br />
                    <div style={{ color: '#262626' }}>(100% gratis)</div>
                </Col>
            </Row>
            <br /><br />
            <Row span={20} type="flex" justify="center">x
                <Col span={18} type="flex" justify="center" >
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontWeight: "bolder", fontSize: '35px' }}>
                            Crea valor agregado real
            </h2><br />

                        <h3 style={{ fontSize: '22px' }}>
                            Cuando el conocimiento se comparte y se multiplica, el mundo mejora.
              <br />
                            Usted y sus estudiantes se están moviendo hacia los resultados concretos que busca. </h3>
                        <br /><br /><br />
                        <h2 style={{ fontWeight: "bolder", fontSize: '35px' }}>
                            Tu ingreso sube
              </h2><br />

                        <h3 style={{ fontSize: '22px' }}>
                            Su know-how se remunera a su valor razonable.
          <br />
                            Eres tú quien fija tu precio.</h3>
                        <br /><br /><br />

                        <h2 style={{ fontWeight: "bolder", fontSize: '35px' }}>
                            Nunca estas solo
              </h2><br />

                        <h3 style={{ fontSize: '22px' }}>
                            En cada etapa de su viaje como entrenador, estamos aquí para ayudarlo.
          <br />
                            Está en el ADN de SpliiK para guiarlo y aconsejarlo en todo momento.
              </h3>
                        <br /><br /><br />
                        <button>
                            <Link to="/signup" rel="noopener noreferrer">
                                Hoy me convierto en entrenador de SpliiK
                            </Link>
                        </button>
                        <br /><br /><br /><br /><br /><br />


                    </div>
                </Col>
            </Row>
        </Layout >

    );
};

export default WelcomePage;
