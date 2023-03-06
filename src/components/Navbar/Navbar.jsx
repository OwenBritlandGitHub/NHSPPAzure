import React from 'react'
import { Container, Col, Dropdown } from 'react-bootstrap'
import './Navbar.css'
import MyImage from '../../../public/BSTFavicon.png' 

export default function Navbar() {
    return (
    <header class="px-0 mx-0 border-bottom border-dark fixed-top">
    <nav class="navbar">
        <Container>
            <Col xs={12}>
                <img src={MyImage} alt="bst" width="100" height="80"/>
            </Col>
        </Container>
    </nav>
    <nav class="navbar">
        <Container>
            <Col xs={4}>
                <div class="list-div">
                    <ul class="d-flex nav-list">
                        <li className='navbar-links'>Home</li>   
                    <li><Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            Contacts
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item><a className='dropdown-item' href="mailto:support@sundownsolutions.co.uk?subject=CCG Bed State Tracker Clinical Request">CCG</a></Dropdown.Item>
                            <Dropdown.Item href="mailto:support@sundownsolutions.co.uk?subject=CCG Bed State Tracker Support Request">Technical
									Support</Dropdown.Item>
                            <Dropdown.Item href="https://tawk.to/chat/5b047f5f13d5ab375e377bc1/default">Tech Support Web Chat</Dropdown.Item>
                            <Dropdown.Item href="https://tawk.to/chat/5b047f5f13d5ab375e377bc1/default">Tech Support Web Chat</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </li>
                        {/* <li className="navbar-links nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" id="navdropdown" role="button" data-bs-toggle="dropdown" aria-expanded="true" aria-haspopup="true"
                            >Contacts</a>

                            <ul class="dropdown-menu" aria-labelledby="navdropdown">
                                <li><a class="dropdown-item" href="mailto:support@sundownsolutions.co.uk?subject=CCG Bed State Tracker Clinical Request">CCG</a></li>
                                <li><a class="dropdown-item" href="mailto:support@sundownsolutions.co.uk?subject=CCG Bed State Tracker Support Request">Technical
									Support</a></li>
                                <li><a class="dropdown-item" href="Tel:+442087980525">Call Tech Support</a></li>
                                <li><a class="dropdown-item" href="https://tawk.to/chat/5b047f5f13d5ab375e377bc1/default">Tech Support Web Chat</a></li>
                            </ul>
                        </li> */}
                        <li ClassName='navbar-links'>PST</li>
                    </ul>
                </div>
            </Col>
        </Container>
    </nav>
</header>

    )
}
