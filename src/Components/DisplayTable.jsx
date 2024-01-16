import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
//import styled from 'styled-components';
import axios from 'axios'






const columns = [
  {
    name: `name`,
    selector: row => (row.name),
     sortable: true,
     sortField: `name`
  },
  {
    name: 'Image',
    selector: row => (row.image),
     sortable: true,
     sortField: `image`
  },
  {
    name: 'Brand',
    selector: row => (row.brand),
     sortable: true,
     sortField: `brand`
  },
  {
    name: 'Rating',
    selector: row => (row.rating),
    sortable: true,
     sortField: `rating`
  },
  {
    name: `Price`,
    selector: row => (row.price),
    sortable: true,
     sortField: `price`
  }

]




function DisplayTable() {

  

  const [products, setProducts] = useState([])
  const [totalRows, setTotalRows] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState([])
 // const [currentPage, setCurrentPage] = useState(1);
  //const [filter, setFilter] = useState('')
  //const [fields,setFields] = useState([])
  // const [products, setData] = useState(data);
  const countPerPage = 4;

 
  const baseURL = 'http://localhost:1026'



  const getProducts = async (page) => {
    try {
        const response = await axios.get(`${baseURL}/displaytable`) //?page=${page}&pageSize=${countPerPage}`)
      const { products,totalProducts } = response.data
      
      console.log(products)
      //console.log(prod)
      setProducts(products)
     // setFilter(prod)
      setTotalRows(totalProducts)
      //setFields(products)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts(page)
  }, [page])

  const  handleSearch =(e)=>{
    setSearch(e.target.value)
  } 
 

  // useEffect(() => {
    
  //   const result =products.filter((item) => {
  //     return item.name.toLowerCase().match(search.toLocaleLowerCase())
  //   })
  //   setFilter(result)

  // }, [search,products])




  const handlePageChange = page => {
   
    setPage(page);
  }

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   getProducts(page,newPerPage);
  //   //setPerPage(newPerPage);
  // };


  return (
    <>

      <div className='container'>
        <h3 className="text-center"> Products Page</h3>

        <DataTable 

        //datas from server
        columns={columns}


         data={products}
        //data={filter}
          
        // columns.push({ "tittle": keys[x] });

        subHeader
        subHeaderComponent={
          <input type='text'
            className='searchBar'
            placeholder='Search...'
            value={search}
           onChange={handleSearch}
          />
        }
        
        highlightOnHover

          //server side pagination
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={countPerPage}
        onChangePage={handlePageChange}

        //onChangeRowsPerPage={handlePerRowsChange}

          //dont want to show RoWs Per Page
        paginationComponentOptions={{
            noRowsPerPage: false
          }}

          //sorting of data
          //defaultSortFieldId={name}
          //onSort={fields}
          //sortServer

          //stripe odd rows
          //striped

          //if no data present to show
          noDataComponent="No records to display"



        />
      </div>


    </>
  )
}



export default DisplayTable

