import React, { useState } from 'react';
import axios from 'axios'

function Category() {
  const [input, setInput] = useState({});



  const handleSubmit = async (e) => {
     e.preventDefault()
    console.log("input", input)
    const baseURL = 'http://localhost:1026'

    await axios.post(`${baseURL}/categor`, input)
      .then(() => {
        console.log("ghasd")
      }).catch((error) => {
        console.log(error)
      })

      alert(`Category Added`)
  }

  const textHandle = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const refresh = () => window.location.reload(true)


  return (
    <div className="container">
      <div className="catSub">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label>Category Name</label>
            <input
              type="text"
              name="name"

              onChange={textHandle}
            />
          </div>
          <div className="form-control">
            <label>Category Icon</label>
            <input
              type="text"
              name="icon"

              onChange={textHandle}
            />
          </div>
          <div className="form-control">
            <label></label>
            <button onClick={refresh} >Add category</button>
          </div>
        </form>
      </div>


    </div>
  )
}


export default Category
