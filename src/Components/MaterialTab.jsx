import React, { forwardRef,useState,useEffect} from "react";
import MaterialTable from "@material-table/core";
import {Container} from "@material-ui/core"
//import Paper from "@material-ui/core/Paper";
//import MaterialTable from "material-table"
import axios from 'axios'




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
    searcheable: true,
    filterPlaceholder:"filter by name",
    //accessor: 'name',
    
    // selector: row => (row.name),
     sortable: true,
    // sortField: `name`
  },
  {
    title: `Image`,
    field: `image`,
    searcheable: true,
    filterPlaceholder:"filter by image",
    //accessor: 'image'
    // name: 'Image',
    // selector: row => (row.image),
    sortable: true,
    // sortField: `image`
  },
  {
    title: `Brand`,
    field: `brand`,
    searcheable: true,
    filterPlaceholder:"filter by brand",
    //accessor: 'brand'
    // name: 'Brand',
    // selector: row => (row.brand),
     sortable: true,
    // sortField: `brand`
  },
  {
    title: `Rating`,
    field: `rating`,
    searcheable: true,
    filterPlaceholder:"filter by rating",
    //accessor:'rating'
    // name: 'Rating',
    // selector: row => (row.rating),
     sortable: true,
    // sortField: `rating`
  },
  {
    title: `Price`,
    field: `price`,
    searcheable: true,
    filterPlaceholder:"filter by price",
    //accessor:'price',
    // type:currency,
    // currencySetting:{currencyCode:"INR"},
    //name: `Price`,
    // selector: row => (row.price),
     sortable: true,
    // sortField: `price`
  }
]

//const rows = [];

function MaterialData() {

 
  

  const [products, setProducts] = useState([])
  //const [page, setPage] = useState(1);
  //const countPerPage = 4;


   const baseURL = 'http://localhost:1026'


  const getProducts = async() => {
    try {
      const response =  await axios.get(`${baseURL}/materialtable`)
      const { products } = response.data
      
      console.log(products)
      //console.log(prod)
      setProducts(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

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

//  data={query =>
//   new Promise((resolve, reject) => {
//     console.log(query)
//       // prepare your data and then call resolve like this:
//       const baseURL = 'http://localhost:1025/materialtable'
//       fetch(baseURL)
//       //.then(response=>response.json())
//       .then(response=>{
//       resolve({
//           data:{response}// your data array
//           //page: // current page number
//           //totalCount: // total row number
//       })
//     })
//   })
// }


 options={{
 
  sorting:true,
  search:true,
  searchAutoFocus:true,
  searchFieldVariant:"outlined",

  filtering:true,


  paging:true,
  pageSizeOptions:[3,5,7,9],
  pageSize:3,
  paginationType:"stepped",
  showFirstLastPageButtons:false,
  paginationPosition:"bottom",
  

  exportButton:true,

 selection:true,
 showSelectAllCheckbox:false,
 showTextRowsSelected:false,
 grouping:true,
 columnsButton:true,
 headerStyle:{background:"turquoise",fontStyle:"italic"}
 }} 
 />
</Container>
  </div>
    </>
  ) 
}

export default MaterialData

