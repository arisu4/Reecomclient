import { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table'
import ReactPaginate from 'react-paginate';



function PaginateLib() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0)
    //const [totalPages, setTotalPages] = useState(0)
    const itemsPerPage = 5;

    const baseURL = 'http://localhost:1026'

    useEffect(() => {
        axios.get(`${baseURL}/paginatelib`)
        .then((response) => {
          console.log(response)
        setData(response.data);
       
       })
        
       //setTotalPages(Math.ceil(data.length / itemsPerPage));
      },[])
       //console.log(`completedatais`,data)
    
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const subset = data.slice(startIndex, endIndex);
    
      const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
      }

  const items = [];


  let num = 1
  for (const input of subset ) {

    items.push(<tr >
      <td>{num++}</td>
      <td>{input.name}</td>
      <td>{input.brand}</td>
      <td>{input.image}</td>
      <td>{input.rating}</td>
      <td>{input.price}</td>
    </tr>)
   }

    
  return (
   <>
    
    <div className="container">
                <h3>Product table</h3>

                <Table responsive="sm" variant="dark" >
                    <thead className='mb-3'>
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
                
  
    <ReactPaginate
       breakLabel={"..."}
       nextLabel={"next>>"}
       previousLabel={"<<previous"}  
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        forcePage={currentPage}
        //pageCount={totalPages}
        containerClassName={"pagination-container"}
        activeClassName={"active-page"}
        // containerClassName={'pagination'} /* as this work same as bootstrap class */
        //  subContainerClassName={'pages pagination'} /* as this work same as bootstrap class */
        //    activeClassName={'active'} /* as this work same as bootstrap class */
     />
  
    
   </div>
  
  </>
  )
}

export default PaginateLib
