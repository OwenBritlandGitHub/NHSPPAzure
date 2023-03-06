import './css/BSTNav.css';
import BSTLogo from '../images/BSTLogo_200.png';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.css';
const BSTNav = () => {

    return (
        // Bootstrap nav
        <div id="BSTNav">

            <nav className="navbar navbar-expand-lg navbar-light p-4">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img src={BSTLogo} style={{"maxHeight": "100px"}}/></a>
                    <div id="navbarSupportedContent">
                        <ul className="navbar-nav navbar-nav-float-right mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Help</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div id='LowerNav'>
            <Navbar bg="white" expand="lg">
                <div className="m-2">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">PST</Nav.Link>
                        <NavDropdown title="Contacts" id="basic-nav-dropdown">
                        <NavDropdown.Item href="mailto:support@sundownsolutions.co.uk?subject=CCG%20Bed%20State%20Tracker%20Clinical%20Request">CCG</NavDropdown.Item>
                        <NavDropdown.Item href="mailto:support@sundownsolutions.co.uk?subject=CCG%20Bed%20State%20Tracker%20Support%20Request">
                            Technical Support
                        </NavDropdown.Item>
                        <NavDropdown.Item href="Tel:+442087980525">Call Tech Support</NavDropdown.Item>
                        <NavDropdown.Item href="https://tawk.to/chat/5b047f5f13d5ab375e377bc1/default">
                            Tech Support Web Chat
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
            </div>
        </div>

    )
}

export default BSTNav;