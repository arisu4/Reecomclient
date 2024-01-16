import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'


function PaginateTable() {
    const [products, setProducts] = useState([]);
    //const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
   
        
    const baseURL = 'http://localhost:1026'

    // const showItems =(e)=>{
    //    e.preventDefault()   
            
    //  axios.get(`${baseURL}/paginatetable?page=${page}&pageSize=5`)
    //             const { products, totalPages } = response.data;
    //             console.log(response.data)
    //             setProducts(products);
    //             setTotalPages(totalPages);
          
    //     }
        
     
    // }


    const fetchProducts =  (page) => {
        
         axios.get(`${baseURL}/paginatetable?page=${page}&pageSize=4`)
         .then(response=>{
            console.log(response)
            const { products, totalPages } = response.data;
            setProducts(products);
            setTotalPages(totalPages);
         })
         .catch(error=>{
            console.log(error)
         })
       
    }

     useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

  
    const items = [];

    let num = 1
    for (const datas of products) {

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

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>

            <div className="container">
                <h3>Product table</h3>
                {/* <button className="bg bg-primary mb-3" >Display Products</button> */}

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
                        {/* Display the products */}
                        {/* {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))} */}

                        {items}


                    </tbody>
                </Table>

                {/* Pagination controls */}
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Prev Page
                </button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next Page
                </button>
            </div>

        </>
    )

    // const fetchProducts = async (page) => {
    //     try {
    //         const response =await axios.get(`${baseURL}/paginatetable?page=${page}&pageSize=5`)
    //         const { products, totalPages } = response.data;
    //         console.log(response.data)
    //         setProducts(products);
    //         setTotalPages(totalPages);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    


    // useEffect(() => {
    //     fetchProducts(currentPage);
    // }, [currentPage]);
}

export default PaginateTable
