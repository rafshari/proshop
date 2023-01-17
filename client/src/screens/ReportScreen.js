import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, {
  Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'
import { CSVExport } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ReportScreen = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const columns = [
    { dataField: '_id', text: 'کد', sort: true },
    { dataField: 'name', text: 'عنوان' },
    { dataField: 'price', text: 'قیمت', sort: true },
    { dataField: 'category', text: 'دسته' },
    { dataField: 'brand', text: 'برند' },
  ]
  const { SearchBar } = Search
  const { ExportCSVButton } = CSVExport

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch, userInfo])

  return (
    <> 
    <h1> گزارش محصولات</h1>
    {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
    <ToolkitProvider
      keyField='_id'
      data={products}
      columns={columns}
      search
      exportCSV
    >
      {(props) => (
        <div>
          <hr />
          <ExportCSVButton {...props.csvProps} className='btn btn-success'>
            فرمت CSV!!
          </ExportCSVButton>
          <hr />
          <SearchBar {...props.searchProps} />
          <BootstrapTable
            {...props.baseProps}
            pagination={paginationFactory()}
          />
        </div>
      )}
    </ToolkitProvider>
    )}
    </>
  )
}

export default ReportScreen
