import React, { useState } from "react";
import axios from 'axios'
import Table from 'react-bootstrap/Table';


function ProductTable() {

  const [input, setInput] = useState([])

  const baseURL = 'http://localhost:1026'

  const clickShow = (e) => {


    e.preventDefault()

    
     
     axios.get(`${baseURL}/showprod`)
      .then(response => {
        console.log(response)
        setInput(response.data)
      })
      .catch(error => {
        console.log(error)
      })
      
      console.log(input)

   
    

  }

  const items = [];


  let num = 1
  for (const inputs of input) {

    items.push(<tr >
      <td>{num++}</td>
      <td>{inputs.name}</td>
      <td>{inputs.category.name}</td>
      <td>{inputs.brand}</td>
      <td>{inputs.image}</td>
      <td>{inputs.rating}</td>
      <td>{inputs.price}</td>
    </tr>)
  }

  return (

    <>

      <div className="container">
        <button className="bg bg-primary mb-3" onClick={clickShow} >Display Products</button>

        <Table responsive="sm" variant="dark" >
          <thead>
            <tr>
              <th>Sl no</th>
              <th>Product</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Image</th>
              <th>Rating</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>

            {items}

          </tbody>
        </Table>
      </div>
    </>
  )
}

 
export default ProductTable;
