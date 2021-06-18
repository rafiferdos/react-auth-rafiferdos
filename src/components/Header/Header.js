import React, { useContext } from "react";
import {
    Button,
    Container,
    Image,
    Nav,
    Navbar,
    OverlayTrigger,
    Popover
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { handleSignOut, initializeLoginFramework } from "../Login/LoginManager";
import './Header.css';

const Header = () => {
  const { loggedInUser, setLoggedInUser, setNewUser } = useContext(UserContext);

  initializeLoginFramework();
  const signOut = () => {
    handleSignOut().then((res) => {
      setLoggedInUser(res);
    });
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand
          className="px-2"
          as={Link}
          to="/"
          style={{ fontSize: "1.5rem", fontWeight: "bold", backgroundColor: "red", borderRadius: "10px" }}
        >
          Rail Rover
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" />
          <Nav>
            <Nav.Link as={Link} to="/" className = "mr-3" style={{ fontWeight: "500", backgroundColor: "#eb2f06", borderRadius: "18px", color: "white" }}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/destination" className = "mr-3" style={{ fontWeight: "500", backgroundColor: "#eb2f06", borderRadius: "18px", color: "white"}}>
              Travel To
            </Nav.Link>
            {loggedInUser?.isSignedIn ? (
              <>
                {
                  <OverlayTrigger
                    trigger="click"
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Popover id="popover-positioned-bottom">
                        <div className="d-flex justify-content-center mt-1">
                          <Image
                            style={{ maxWidth: "60px" }}
                            src={loggedInUser.photo}
                            roundedCircle
                          />
                        </div>
                        <Popover.Content>
                          <strong className="text-center">
                            {loggedInUser.email}
                          </strong>
                          <div className="d-flex justify-content-center mt-1">
                            <Button style = {{backgroundColor: "#eb2f06", borderRadius: "18px", color: "white"}}
                              onClick={signOut}
                              variant="outline-danger"
                              className="shadow-none py-0 px-1 mr-3 ml-3"
                              size="sm"
                            >
                              Sign Out
                            </Button>
                          </div>
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    <Nav.Link style={{ fontWeight: "700", color: "white" }}>
                      {loggedInUser.name}
                    </Nav.Link>
                  </OverlayTrigger>
                }
              </>
            ) : (
              <>
                <Nav.Link
                  onClick={() => setNewUser(false)}
                  as={Link}
                  to="/login" className = "mr-3"
                  style={{ fontWeight: "500", backgroundColor: "#eb2f06", borderRadius: "18px", color: "white" }}
                >
                  Sign in
                </Nav.Link>
                <Nav.Link
                  onClick={() => setNewUser(true)}
                  as={Link}
                  to="/login"
                  style={{ fontWeight: "500", backgroundColor: "#eb2f06", borderRadius: "18px", color: "white"}}
                >
                  Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
