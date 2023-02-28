import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import file from '../maps.json';
function Navigation(props) {
  return (
    <>
      <Navbar collapseOnSelect bg="navbar navbar-dark bg-dark" expand="xl">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav  className="me-auto">
            {
              Object.keys(file.MAPS).map((item, index) => (
                <Nav.Link style={{fontSize:"13px"}}  key={index} onClick={(value) => props.topMenuClicked(item)} >
                  {item}
                </Nav.Link >
              ))

            }
          </Nav>
        </Navbar.Collapse>


      </Navbar>
    </>
  );
}


export default Navigation;