import * as React from "react"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarFilterButton
} from "@mui/x-data-grid"
import { useDemoData } from "@mui/x-data-grid-generator"
import ClearIcon from "@mui/icons-material/Clear"
import SearchIcon from "@mui/icons-material/Search"
import { createTheme } from "@mui/material/styles"
import { createStyles, makeStyles } from "@mui/styles"

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

const defaultTheme = createTheme()
const useStyles = makeStyles(
  theme =>
    createStyles({
      root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: "space-between",
        display: "flex",
        alignItems: "flex-start",
        flexWrap: "wrap"
      },
      textField: {
        [theme.breakpoints.down("xs")]: {
          width: "100%"
        },
        margin: theme.spacing(1, 0.5, 1.5),
        "& .MuiSvgIcon-root": {
          marginRight: theme.spacing(0.5)
        },
        "& .MuiInput-underline:before": {
          borderBottom: `1px solid ${theme.palette.divider}`
        }
      }
    }),
  { defaultTheme }
)

function QuickSearchToolbar(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        className={classes.textField}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          )
        }}
      />
    </div>
  )
}

export default function QuickFilteringGrid() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6
  })
  const [searchText, setSearchText] = React.useState("")
  const [rows, setRows] = React.useState(data.rows)

  const requestSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i")
    const filteredRows = data.rows.filter(row => {
      return Object.keys(row).some(field => {
        return searchRegex.test(row[field].toString())
      })
    })
    setRows(filteredRows)
  }

  React.useEffect(() => {
    setRows(data.rows)
  }, [data.rows])

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        components={{ Toolbar: QuickSearchToolbar }}
        rows={rows}
        columns={data.columns}
        
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: event => requestSearch(event.target.value),
            clearSearch: () => requestSearch("")
          }
        }}
      />
    </div>
  )
}

// useEffect(() => {
    //   setRows();
    // }, []);
  
    // const searchPost =  (e) => {
    //   const searchValue = e.target.value;
    //   const  resp=  axios.get(`${baseURL}/searching?search=${searchValue}`);
    //   // The subset of posts is added to the state that will trigger a re-render of the UI
    //   console.log (resp.data)
    //   setPageState(resp.data); 
    // };

    // const requestsearch = async(searchvalue) => {
    //   setSearchText(searchvalue);
    //   const  response = await axios.get(`${baseURL}/searching?search=${searchvalue}`);
    //   console.log(response.data)
    //   setSearchText(searchvalue);
    //   setPageState(response.data)
    //   setRows(filteredrows);
    //   setPageState(response.data)
    //   setShowSearch(response.data)
    // };

   
    // const requestsearch = (searchvalue) => {
    //   setsearchtext(searchvalue);
    //   const searchregex = new RegExp(escapeRegExp(searchvalue), 'i');
    //   const filteredrows = data.rows.filter((row) => {
    //     return object.keys(row).some((field) => {
    //       return searchregex.test(row[field].tostring());
    //     });
    //   });
    //   setRows(filteredrows);
    // }
 
     // useEffect(() => {
  //   searchProducts(searchText)
  // }, [searchText])

  // const handleSearch = (event) =>{
  //   setSearchText(event.target.value)
  // }


//   import React,{useState,useEffect} from 'react'
// import Box from '@mui/material/Box';
// import IconButton from "@mui/material/IconButton"
// //import Button from '@mui/material/Button';
// //import Button from '@mui/joy/Button';
// import TextField from "@mui/material/TextField"
// import {
//   DataGrid,
//   GridToolbarDensitySelector,
//   GridToolbarExport 
// } from '@mui/x-data-grid';

// import ClearIcon from '@mui/icons-material/Clear';
//  import SearchIcon from '@mui/icons-material/Search';
// // import { createTheme } from '@mui/material/styles';
// // import { createStyles, makeStyles } from '@mui/styles';
// import axios from 'axios'

  //import { DataGrid, GridToolbar } from '@mui/x-data-grid';

  //GridToolbarFilterButton,<GridToolbarFilterButton />

  // function QuickSearchToolbar(props) {


  //   return (
  //     <div >
  //       <div>
  //         <GridToolbarDensitySelector />
  //         <GridToolbarExport />
  //       </div>
  //       <TextField
  //         variant="standard"
  //         value={props.value}
  //         onChange={props.onChange}
  //         placeholder="Search Products…"
  //         //className={classes.textField}
  //         InputProps={{
  //           startAdornment: <SearchIcon fontSize="small" color='primary'  />,
  //           endAdornment: (
  //             <IconButton
  //               title="Clear"
  //               aria-label="Clear"
  //               size="small"
  //               //style={{ visibility: searchText ? 'visible' : 'hidden', borderRadius: "57%", paddingRight: "1px", margin: "0", fontSize: "1.25rem" }
  //               style={{ visibility: props.value ? "visible" : "hidden" }}
  //               onClick={props.clearSearch}
  //                >
  
  //                {/* <Button variant="soft">Search</Button> */}
  //               <ClearIcon fontSize="small" color="error"   />
  //               {/* <Button variant="outlined" size="small" style={{textTransform: 'none', height: '20px'}}>
  //              Check General Reference
  //            </Button> */}
            
  //             </IconButton>
              
               
  //           )
  //         }}
  //       />
  //     </div>
  //   )
  // }

  // function GridTable() {

  //   const [pageState,setPageState]=useState({
  //     isLoading:false,
  //     data:[],
  //     total:0,
  //     page:0,
  //    pageSize:3
  
  //   })
  
  //   const [searchText, setSearchText] = useState("");
  //   const [showSearch, setShowSearch] = useState({})
  
  //   // function escapeRegExp(value) {
  //   //   return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
  //   // }
  
  //   //const [queryOptions, setQueryOptions] = useState({});
  
  //   const [sortModel, setSortModel] = useState([
  //     {
  //         field: 'name',
  //         sort: 'asc',
  //     }
  // ])
  
  //   const baseURL = 'http://localhost:1026'
  
  //   const fetchProducts =  async(page,pageSize) => {
  //     try {
  //       setPageState(old=>({...old,isLoading:true}))
  //       const response =  await axios.get(`${baseURL}/datagrid?page=${page}&pageSize=${pageSize}`)
  //       const { products,totalProducts } = response.data
        
  //       console.log(products)
  //       console.log(totalProducts)
       
  //       setPageState(old=>({...old,isLoading:false,data:products,total:totalProducts}))
  //       setShowSearch(products)
  //     }
  //     catch (error) {
  //       console.log(error)
  //     }
  //   } 
  
  
  //   useEffect(()=>{
  //     fetchProducts(pageState.page,pageState.pageSize)
  //   },[pageState.page,pageState.pageSize])
  
  
  //   // const searchProducts =  async(searchvalue) => {
  //   //   try {
       
  //   //     const response =  await axios.get(`${baseURL}/searching?search=${searchvalue}`)
  //   //     const product = response.data
  //   //     console.log(product)
       
  //   //   }
  //   //   catch (error) {
  //   //     console.log(error)
  //   //   }
  //   // }
  
   
  
   
    
    
  
  //   // const handleSortModelChange = React.useCallback((sortModel) => {
  //   //   // Here you save the data you need from the sort model
  //   //   setQueryOptions({ sortModel: [...sortModel] });
  //   // }, []);
    
  //     // const handleSortChange = () => {
  //     //     /* if statement to prevent the infinite loop by confirming model is 
  //     //      different than the current sortModel state */
  //     //     if (JSON.stringify(model) !== JSON.stringify(sortModel)) {
  //     //         setSortModel(model);
  //     //     }
  //     // };
  
  
  
  //     // const requestsearch = async(searchvalue) => {
  //     //   setSearchText(searchvalue);
  //     //   const  response = await axios.get(`${baseURL}/searching?search=${searchvalue}`);
  //     //   console.log(response.data)
  //     //  setShowSearch(response.data)
  //     // };
  
  
    
      
  
  
  
  
  // //   return (
  // //     <>
  // //       <div className="container" >
  
  
  // //         {/* <h3 align='center'>Cartshop</h3> */}
  
  
  // //         <h4 align='center'>Products Page</h4>
  
  
  // //         <Box sx={{ height: 450, width: '100%' }}>
         
  // //         <DataGrid
  
  // //             //rows={rows}
  // //             headerHeight={95}
  // //             rowHeight={65}
  // //             getRowId={(row) => row._id}
  // //             //rows={pageState.data}
  // //             rows={showSearch}
  // //             //components={{ Toolbar: GridToolbar }}
              
  // //             // components={{ Toolbar:()=>{
              
  // //             // return <GridToolbarContainer style={{justifyContent:'flex-end'}> 
  // //             // <GridToolbarExport />
  // //             // <GridToolbarContainer/>
  // //             // 
  // //             // }}})
  
  // //            //rows={pageState.data}
  // //            //checkboxSelection
             
  // //            //autoHeight
  // //            rowCount={pageState.total}
  // //            loading={pageState.isLoading}
  // //            rowsPerPageOptions={[3,5,7]}
  
  
  // //            pagination
  // //           //pageSizeOptions={[3,5,7,10,15,100]}
  // //            page={pageState.page-1}
  // //            pageSize={pageState.pageSize}
  // //            paginationMode="server"
  // //            onPageChange={(newPage) => setPageState(old=>({...old,page:newPage+1}))}
  // //            onPageSizeChange={(newPageSize) => setPageState(old=>({...old,pageSize:newPageSize}))}
  // //            columns={columns}
             
  // //            //initialState={initialState}
  
  
  // //            server side sorting
  
  // //            sortingMode="server"
  // //            //onSortModelChange={handleSortModelChange}
  // //            sortModel={sortModel}
  // //            onSortModelChange={(model) => setSortModel(model)}
  // //            //loading={isLoading}
  
  // //           //server side filtering
  
  // //           // filterMode="server"
  
  // //           // filterModel={{ 
  // //           //   items: [ 
  // //           //     { columnField: 'name', 
  // //           //       operatorValue: 'contains',  
  // //           //       value: '' }, 
  // //           //       { columnField: 'image', 
  // //           //       operatorValue: 'contains',  
  // //           //       value: '' }, 
  // //           //       { columnField: 'brand', 
  // //           //       operatorValue: 'contains',  
  // //           //       value: '' }, 
  // //           //       { columnField: 'rating', 
  // //           //       operatorValue: 'contains',  
  // //           //       value: '' },
  // //           //       { columnField: 'price', 
  // //           //       operatorValue: 'contains',  
  // //           //       value: '' },   
  // //           //   ]
  // //           // }}
  // //           //onFilterModelChange={onFilterChange}
  // //          //loading={isLoading}
  
  // //           //  initialState={{
  // //           //   sorting: { sortModel: [{ field: "name", sort: "asc" }] }
            
  // //           // }}
  
  // //         //   components={{
  // //         //     Toolbar: QuickSearchToolbar,
  // //         //     LoadingOverlay: LinearProgress
  // //         // }}
  
  // //         components={{ Toolbar: QuickSearchToolbar }}
  // //           componentsProps={{
  // //             toolbar: {
  // //                 value: searchText,
  // //                 showQuickFilter: true,
  // //                 quickFilterProps: { debounceMs: 500 }, 
  // //                 onChange: (event) =>
  // //                 requestsearch(event.target.value),
  // //                 clearSearch: () => requestsearch(''),
  // //                 //onChange:{searchPost}
  // //                 //onChange:{handleSearch}
  // //              }
  // //           }}
  // //         />
  // //          </Box>
  // //       </div>
  // //     </>
  // //   )
  //  }
