import React, { forwardRef,useState,useEffect} from "react";
import MaterialTable from "@material-table/core";
import {Container} from "@material-ui/core"
import axios from 'axios'
//import { DataGrid } from '@mui/x-data-grid';




import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
//import { blueGrey } from "@material-ui/core/colors";


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};


const columns = [

  {
    title: `Product name`,
    field: `name`,
  
  },

  {
    title: `Image`,
    field: `image`,
   
  },

  {
    title: `Brand`,
    field: `brand`,
    
  },

  {
    title: `Rating`,
    field: `rating`,
   
  },

  {
    title: `Price`,
    field: `price`,
    
  }
]


 function ServerTable() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProd,setTotalProd] = useState(0)
  //const [rowsPerPage, setRowsPerPage] = useState(5);


    const baseURL = 'http://localhost:1026'

    const fetchProducts =  async(page) => {
      try {
        const response =  await axios.get(`${baseURL}/servertable?page=${page}&pageSize=3`)
        const { products,totalProducts } = response.data
        
        console.log(products)
        console.log(totalProducts)
        //console.log(prod)
        setProducts(products)
        setTotalProd(totalProducts)

      }
      catch (error) {
        console.log(error)
      }
    } 
   
     
       
   

  useEffect(() => {
     fetchProducts(currentPage);
 }, [currentPage]);



 const handlePageChange = page => {
  setCurrentPage(page);
}



  return (
    <>
  <div className="container">

 <h3 align='center'>Cartshop</h3>

 <h4 align='center'>Products Page</h4>


  <Container>
 <MaterialTable 
 title="Products Table"
 icons={tableIcons} 
 columns={columns} 
 data={products}
 //totalCount={totalProd}
 
 
 

//  data={query =>
//   new Promise((resolve, reject) => {
//     console.log(query)
     
//       let url = 'http://localhost:1025/servertable?'

//       if(query.search){
//                url+=`q=${query.search}`
//       }
//       // if(query.orderBy){
//       //   url+=`&_sort=${query.orderBy.field}&_order=${query.orderDirection}`
//       // }
//      if(query.filters.length){
//       const filter = query.filters.map(filter=>{
//         return `&${filter.column.field}${filter.operator}${filter.value}`
//       })
//       url+= filter.join('')
//      }
    
//       url+=`_&page=${query.page+1}`
//       url+=`_&limit=${query.pageSize}`
//       fetch(url)
//       .then(response => response.json())
//       .then(result=>{
//       resolve({
//           data:result.data,
//           page:query.page,
//           totalCount:20
//       })
//     })
//   })
// }


 options={{
//  debounceInterval:700,
//  padding:"dense",
//{ value: data.length > 0 ? data.length : 1, label: 'All' }
 selection:true,
 filtering:true,


 paging:true,
 pageSizeOptions:[3,5,7,9,],
 pageSize:3,
 paginationType:"stepped",
 showFirstLastPageButtons:false,
 paginationPosition:"bottom",



 showSelectAllCheckbox:false,
 headerStyle:{background:"lightgreen",fontStyle:"italic"}
 }} 

  onChangePage={handlePageChange}
 //onChangeRowsPerPage={setRowsPerPage}
 totalRows={totalProd}
 />
</Container>
  </div> 
    </>
  )   
  
}


export default ServerTable
