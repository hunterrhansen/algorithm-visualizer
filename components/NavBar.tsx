import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

export default function NavBar() {
  const githubLink = "https://github.com/hunterrhansen";
  const linkedinLink = "https://www.linkedin.com/in/hunterrhansen/";

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Image
            alt=""
            src="/favicon.ico"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Pathfinding Visualizer
        </Navbar.Brand>
        <Nav>
          <Nav.Link href={ githubLink }>
            <FaGithub />
          </Nav.Link>
          <Nav.Link href={ linkedinLink }>
            <FaLinkedin />
          </Nav.Link>          
        </Nav>

      </Container>
    </Navbar>
  );
}
