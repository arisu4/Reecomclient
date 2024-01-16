import React, { useState,useEffect } from 'react';
import axios from 'axios';

function Products() {
  const [input, setInput] = useState({
    name: "",
    image: "",
    shortdesc: "",
    largedesc:"",
    brand: "",
    category: [],
    rating:"",
    price:""
  });

  const [cats, setCats] = useState([]);


  const baseURL = 'http://localhost:1026'

  
  const handleSubmit = async (e) => {

    e.preventDefault()

    console.log("input", input)
   
    
    await axios.post(`${baseURL}/saveprod`,input)
      .then(() => {
        console.log("dfgh")
      }).catch((error) => {
        console.log(error)
      })

      alert(`Preoduct Added`)

   

  }
 

  const textHandle = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
    
  }

 
  const fetchData = () => {
    return fetch(`${baseURL}/addprod`)
          .then((response) => response.json())
          .then((data) => setCats(data));
  }
   
  useEffect(() => {
    fetchData();
  },[]) 
 
  const refresh = () => window.location.reload(true)
  return (
    <div className=" container">

      <div className="catSub">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              onChange={textHandle}
            />
          </div>


          <div className="form-control">
            <label>Product Image</label>
            <input
              type="text"
              name="image"
              onChange={textHandle}
            />
          </div>


          <div className="form-control">
            <label>Short Description</label>
            <input
              type="text"
              name="shortdesc"
              onChange={textHandle}
            />
          </div>


          <div className="form-control">
            <label>Large  Description</label>
            <input
              type="text"
              name="largedesc"
              onChange={textHandle}
            />
          </div>

          <div className="form-control">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              onChange={textHandle}
            />
          </div>



          <div className="form-control">
            <label>Category</label>
            <select name="category"  onChange={textHandle}>
            <option>Select</option>
               {cats.map(catsVal => (
              <option  value={catsVal._id}>{catsVal.name}</option>
               ))} 
               </select>
          </div>
          
         

          <div className="form-control">
            <label>Rating</label>
            <input
              type="Number"
              name="rating"
              onChange={textHandle}
            />
          </div>


          <div className="form-control">
            <label>Pricing</label>
            <input
              type="Number"
              name="price"
              onChange={textHandle}
            />
          </div>


          <div className="form-control">
            
            <button onClick={refresh} >Add Product</button>
          </div>
        </form>
      </div>


    </div>
  )
}



export default Products;