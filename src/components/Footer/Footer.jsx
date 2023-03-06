import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Footer.css'

export default function Footer() {
    return (
    <footer>
    <Container fluid className='mx-0 px-0'>
        <div className="bg-main">
            <Row className="p-0 m-0">
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center px-0">
                    <Col xs={8}>
                        <div className="text-break d-flex justify-content-around flex-column flex-md-row">
                            <Col xs={12}  md={2}className= "d-flex flex-column main-title">
                                <h2>CCG BED STATE</h2>
                            </Col>
                                <Col xs={12} md={5} className="d-flex flex-column title-box">
                                <h2>ABOUT THE SYSTEM</h2>
                                <p>The Bed State system has been provided to help nursing 
                                    homes provide accurate and real time information to the clinical resources that need them.
                                    <br/> This can system can be updated any time day or night from any device.</p>
                            </Col>
                            <Col xs={12} md={3} className= "d-flex flex-column contact-box">
                                <h2>CONTACT US</h2>
                                <p>For Clinical assistance please contact :  <a href="Tel:442087980525">02087 980525</a><br/>For Technical assisstance please contact : <a href="mailto:support@sundownsolutions.co.uk?subject=GDPR Opt Out"a>support@sundownsolutions.co.uk</a>
                                </p>
                                <h3>CCG Address</h3>
                                <span>Test house</span>
                                <span>Demo Rd</span>
                                <span>Test Town</span>
                                <span>TE5 7AD</span>
                            </Col>
                        </div>
                    </Col>
                </div>
            </Row>
        </div>
    </Container>
</footer>
    )
}
