import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import Admin from './page/Admin/page/Admin';
import Home from './page/Home/Page/Home'


import './App.css';
import ProductDetail from './share/ProductDetail/ProductDetail';
import ListProduct from './page/Home/components/ListProduct/ListProduct';
import * as firebase from './firebase/firebase'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cart from './page/Home/components/Cart/Cart';
import Employee from './page/Employee/page/Employee';

function App() {
  window.scrollTo(0, 0)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { param } = useParams()

  useEffect(() => {
    if (param === '/') navigate('/coffee')
    const getProducts = async () => {
      const res = await firebase.getProductsFromFirebase()
      dispatch({
        type: 'SET_PRODUCTS',
        payload: res
      })
    }
    
    getProducts()
  }, [])
  
  return (
    <div className="app">
      <Routes>
        <Route path="/admin/:param" element={<Admin />} />
        <Route path='/' element={<Home />} >
          <Route index element={<ListProduct />} />
          <Route path='/:param' element={<ListProduct />} />
        </Route>
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/employee' element={<Employee />} />
      </Routes>
    </div>
  );
}

export default App;
