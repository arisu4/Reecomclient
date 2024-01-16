import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';

function FilterTable() {

  const [categories, setCategories] = useState([])
  const [input, setInput] = useState([])
  const [results, setResults] = useState([])

  const baseURL = 'http://localhost:1026'

  useEffect(() => {

    axios.get(`${baseURL}/showcategors`)

      .then(response => {
        setCategories(response.data)
      })

      .catch(error => {
        console.log(error)
      })
  }, [])


  const handleChange = (e) => {

    setInput({ [e.target.name]: e.target.value })

  }

  useEffect(() => {
    axios.post(`${baseURL}/namefilter`, input)
      .then(response => {
        console.log(`data send`, response)
        setResults(response.data)
      })
      .catch(error => {
        console.log(`error`, error)
      })
  }, [input])


  console.log("input", input)

  console.log("results", results)

  const items = [];

  let num = 1
  for (const datas of results) {

    items.push(<tr >
      <td>{num++}</td>
      <td>{datas.name}</td>
      <td>{datas.brand}</td>
      <td>{datas.image}</td>
      <td>{datas.rating}</td>
      <td>{datas.price}</td>
    </tr>
    )
  }



  return (
    <>

      <div className="container">


        <label className='mb-3 '>
          Select a category : {""}

          <select name="id" onChange={handleChange}>
            <option>Select</option>
            {categories.map(category => (
              <option value={category._id}>{category.name}</option>
            ))}
          </select>
        </label>



        <Table responsive="sm" variant="dark" >
          <thead>
            <tr>
              <th>Sl no</th>
              <th>Product</th>
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




export default FilterTable