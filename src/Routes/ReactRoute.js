import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
//Import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
//Import {BrowserRouter , Routes, Route} from "react-router-dom";

import NavBar from '../Components/NavBar';

const Home = lazy(() => import('../Components/Home'));
const Category = lazy(() => import('../Components/Category'));
const Products = lazy(() => import('../Components/Products'));
const ProductTable = lazy(()=> import('../Components/ProductTable'));
const FilterTable = lazy(()=>import('../Components/FilterTable'))
const PaginateTable = lazy(()=>import('../Components/PaginateTable'))
const PaginateLib = lazy(()=>import('../Components/PaginateLib'))
const DisplayTable = lazy(()=>import('../Components/DisplayTable'))
const MaterialTabs= lazy(()=>import('../Components/MaterialTab'))
// const ServerTabs = lazy(()=>import('../Components/ServerTab'))
const GridTable = lazy(()=>import('../Components/GridTable'))
function ReactRoute() {
 return (
    <>
       <NavBar />
       <Suspense fallback={<div className="container">Loading...</div>}>
          <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/category" element={<Category />} />
             <Route path="/products" element={<Products />} />
             <Route path="/productstab" element={<ProductTable />} />   
             <Route path="/namefilter" element={<FilterTable />} />  
             <Route path="/paginatetable" element={<PaginateTable />} /> 
             <Route path="/paginatelib" element={<PaginateLib/>} /> 
             <Route path="/displaytable" element={<DisplayTable/>} /> 
             <Route path="/materialtable" element={<MaterialTabs/>} />     
             {/* <Route path="/servertable" element={<ServerTabs/>} /> */}
             <Route path="/datagrid" element={<GridTable/>} />            
          </Routes>
       </Suspense>
    </>
 )
}


export default ReactRoute