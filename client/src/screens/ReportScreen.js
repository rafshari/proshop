import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'

const ReportScreen = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const columns = [
    { dataField: '_id', text: 'کد', sort: true, filter: textFilter() },
    { dataField: 'name', text: 'عنوان' },
    { dataField: 'price', text: 'قیمت', sort: true },
    { dataField: 'category', text: 'دسته' },
    { dataField: 'brand', text: 'برند' },
  ]
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch,  userInfo])


    return (
      
            <BootstrapTable
               bootstrap4
              keyField='_id'
              data={products}
              columns={columns}
              pagination={paginationFactory()}
              filter={filterFactory()}
        
    />
    )
    
  


  
}

export default ReportScreen
