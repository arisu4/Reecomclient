import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid';

//GridSortModel,
//GridSortDirection[]

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'


const columns = [
  {
    field: `name`,
    headerName: `Product name`,
    width: 220,
    sortable: true,
    //sortingOrder: ['asc', 'desc', null] 
  },
  {
    field: `image`,
    headerName: `Image`,
    width: 220,
    sortable: false
  },
  {
    field: `brand`,
    headerName: `Brand`,
    width: 220,
    sortable: false,
  },
  {
    field: `rating`,
    headerName: `Rating`,
    width: 220,
    sortable: false
  },
  {
    field: `price`,
    headerName: `Price`,
    width: 220,
    sortable: false
  },
  // {
  //   field: 'actions',
  //   headerName: 'Actions',
  //   editable: false,
  //   renderCell: (params: GridRenderCellParams) => (
  //     <Edit
  //       onClick={() => {
  //         params.api.setRowMode(params.id, 'edit');
  //       }}
  //       sx={{ cursor: 'pointer' }}
  //     />
  //   )
  // }
];


function QuickSearchToolbar(props) {

  return (
    <div >
      <div>
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </div>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search Products…"

        InputProps={{
          startAdornment: <SearchIcon fontSize="small" color='primary' />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" color="error" />
            </IconButton>
          )
        }}
      />
    </div>
  )
}



function GridTable() {

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 0,
    pageSize: 5

  })

  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState({})
  // const [sortModel, setSortModel] = useState([
  //   {
  //     field: 'name',
  //     sort: 'asc',
  //   },
  // ])


  const [sortModel, setSortModel] = useState([]) 

  const baseURL = 'http://localhost:1026'

  const fetchProducts = async (page, pageSize) => {
    try {
      setPageState(old => ({ ...old, isLoading: true }))
      const response = await axios.get(`${baseURL}/datagrid?page=${page}&pageSize=${pageSize}`)
      const { products, totalProducts } = response.data

      console.log(products)
      console.log(totalProducts)

      setPageState(old => ({ ...old, isLoading: false, data: products, total: totalProducts }))
      setShowSearch(products)

      setSortModel(products)
    }
    catch (error) {
      console.log(error)
    }
  }

  console.log()


  useEffect(() => {
    fetchProducts(pageState.page, pageState.pageSize)
  }, [pageState.page, pageState.pageSize])



  const requestsearch = async (searchvalue) => {
    setSearchText(searchvalue);
    const response = await axios.get(`${baseURL}/searching?search=${searchvalue}`);
    console.log(response.data)
    setShowSearch(response.data)
  };



  const handleSortChange = async (model,page) => {

    // console.log(`sorting model`,model)

    // console.log(`field`,model[0].field)
    // 



  //   if (JSON.stringify(model) !== JSON.stringify(sortModel)) {
  //     setSortModel(model);
  // }

  console.log(`model`,model)
  console.log(`sorting`,model[0].sort)

  const order = model[0].sort


    const response = await axios.get(`${baseURL}/sorting?page=${page}sorted=${order}`)
    try{
      //const sortData = response.data
      console.log(response.data)
      setSortModel(response.data)
    }
    catch(error){
      console.log(error)
    }
     
  };

  // const handleSortChange = (event) => {
    
     
  // };




  // const handleSortModelChange = React.useCallback((sortModel) => {
  //   // Here you save the data you need from the sort model
  //   setQueryOptions({ sortModel: [...sortModel] });
  // }, []);

  // const handleSortChange = () => {
  //     /* if statement to prevent the infinite loop by confirming model is 
  //      different than the current sortModel state */
  //     if (JSON.stringify(model) !== JSON.stringify(sortModel)) {
  //         setSortModel(model);
  //     }
  // };

  return (
    <>
      <div className="container" >


        {/* <h3 align='center'>Cartshop</h3> */}


        <h4 align='center'>Products Page</h4>


        <Box sx={{ height: 400, width: '100%' }}>

          <DataGrid

            //rows={rows}
            headerHeight={73}
            rowHeight={50}
            getRowId={(row) => row._id}
            //rows={pageState.data}
            //rows={showSearch}
            rows={sortModel}


            //server side searching
            components={{ Toolbar: QuickSearchToolbar }}
            componentsProps={{
              toolbar: {
                value: searchText,
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
                onChange: (event) =>
                  requestsearch(event.target.value),
                clearSearch: () => requestsearch(''),
                //onChange:{searchPost}
                //onChange:{handleSearch}
              }
            }}


            //autoHeight
            rowCount={pageState.total}
            loading={pageState.isLoading}


            //server side pagination
            pagination
            paginationMode="server"
            page={pageState.page - 1}
            pageSize={pageState.pageSize}
            rowsPerPageOptions={[3, 5, 7]}
            onPageChange={(newPage) => setPageState(old => ({ ...old, page: newPage + 1 }))}
            onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
            columns={columns}

            //server side sorting

            sortingMode="server"
            //onSortModelChange={model=>console.log(model)}
            onSortModelChange={model=>handleSortChange(model)}
            //sortingOrder={['asc', 'desc']}
            //onSortModelChange={handleSortModelChange}
            // onSortModelChange={handleSortChange(model)}

            //onSortModelChange={(event)=>{handleSortChange(event.value)}}
            // sortModel={sortModel}
            // onSortModelChange={(model) => setSortModel(model)}
           
            //  initialState={{
            //   sorting:{
            //   sortModel:[{field:"name",sort:"asc"}]
            //   }
            //  }}
          />
        </Box>
      </div>
    </>
  )
}

//model: GridSortModel
//<GridSortModel>
export default GridTable