import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }
  return (


     <Form className='d-flex' onSubmit={submitHandler}>
     <Form.Control
       type='search'
       placeholder='جستجو کالاها ...  '
       className='me-5'
       aria-label='Search'
       onChange={(e) => setKeyword(e.target.value)}

     />
     
     <Button variant='outline-danger'onClick={submitHandler}>جستجو</Button>
   </Form>
  )
}

export default SearchBox
