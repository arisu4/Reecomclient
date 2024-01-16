import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Cartshop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link  href="/">Home</Nav.Link>
            <Nav.Link  href="/category">Category</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>  
            <Nav.Link href="/productstab">Product Tab</Nav.Link>
            <Nav.Link href="/namefilter">CatProduct Tab</Nav.Link>
            <Nav.Link href="/paginatetable">Paginate Tab</Nav.Link>
            <Nav.Link href="/paginatelib">Paginate Lib</Nav.Link>
            <Nav.Link href="/displaytable">Datatable </Nav.Link>
            <Nav.Link href="/materialtable">Material Datatable </Nav.Link>
            <Nav.Link href="/datagrid">Datagrid </Nav.Link>
            {/* <Nav.Link href="/servertable">Server Datatable </Nav.Link> */}
            
          </Nav>
        </Container>
      </Navbar>
      <br />
     
    
      
    </>
  );
}



export default NavBar;