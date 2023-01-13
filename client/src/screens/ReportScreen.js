import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listProducts,
} from '../actions/productActions'
import commaNumber from 'comma-number'
import SearchReport from '../components/SearchReport'
import { Link } from 'react-router-dom'




const ReportScreen = () => {
  const { keyword } = useParams()
  const { pageNumber } = useParams() || 1
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
      dispatch(listProducts(keyword, pageNumber))
    }, 
	[ dispatch, navigate,  userInfo,  pageNumber,keyword])

  return (
    <>

      <Row className='align-items-center'>
      {!keyword ? (
        <hr/>
      ) : (
        <Link to='/report' className='btn btn-light'>
          بازگشت
        </Link>
      )}
        <Col>
          <h1>محصولات</h1>
        </Col>
        <Col>
        <SearchReport/>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive='sm'>
            <thead>
              <tr>
                <th>کد</th>
                <th>عنوان</th>
                <th>قیمت</th>
                <th>دسته</th>
                <th>برند</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{commaNumber(product.price)}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ReportScreen
