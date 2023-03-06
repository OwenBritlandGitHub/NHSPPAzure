import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './css/BSTFooter.css'

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
                                <h5>TRAFFORD CCG AND COUNCIL BED STATE</h5>
                            </Col>
                                <Col xs={12} md={5} className="d-flex flex-column title-box">
                                <h5>ABOUT THE SYSTEM</h5>
                                <p>The Bed State system has been provided to help nursing 
                                    homes provide accurate and real time information to the clinical resources that need them.
                                    <br/> This can system can be updated any time day or night from any device.</p>
                            </Col>
                            <Col xs={12} md={3} className= "d-flex flex-column contact-box">
                                <h5>CONTACT US</h5>
                                <p>For Clinical assistance please contact :  <a href="Tel:01618736070">0161 8736070</a><br/>For Technical assisstance please contact : <a href="mailto:support@sundownsolutions.co.uk?subject=GDPR Opt Out"a>support@sundownsolutions.co.uk</a>
                                </p>
                                <h5>CCG Address</h5>
                                <span>Trafford Town Hall</span>
                                <span>Talbot Road</span>
                                <span>Stretford</span>
                                <span>Greater Manchester</span>
                                <span>M32 0TH</span>
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
