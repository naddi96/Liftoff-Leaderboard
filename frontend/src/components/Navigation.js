import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import file from '../maps.json';
import { NavLink } from "react-router-dom";
import packageJson from '../../package.json';
function Navigation(){
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
           
            {
              
              Object.keys(file.MAPS).map((item,index) => (
                <NavLink key={index}  className={"nav"} to={packageJson.base_path+item}>
                 {item}
                  </NavLink>
              ))



            }          
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}


export default Navigation;