import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './App.css';
import {InputGroup, Input, Button, Spinner, FormGroup } from 'reactstrap';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import BookCard from './components/BookCard.jsx'

function App() {
  // Instantiate Variables
  const maxResults = 10;

  // States
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  // const [authors, setAuthors] = useState('');

  // handleSearch
  const handleSearch = (data) => {
    setLoading(true);
    let startIndex = data.selected? data.selected * maxResults : 0;

    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}`
      )
      .then(res => {
        if (res.data.items.length > 0) {
          setBooks(res.data.items);
          setTotalResults(res.data.totalItems);
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(true);
        toast.error(`${err.response.data.error.message}`);
      });
  };

  // Get Most Common Author
  // const getMostCommonAuthor = (arr, n) => {
  //   let res = 0;
  //   let count = 1;

  //   for (let i = 1; i < n; i++) {
  //     if (arr[i] === arr[res]) {
  //       count++;
  //     } else {
  //       count--;
  //     }

  //     if (count === 0) {
  //       res = i;
  //       count = 1;
  //     }
  //   }

  //   return arr[res];
  // }

  // handleResults
  const handleResults = () => {
    const items = books.map((item) => {
      return (
        <div className='col-lg-3 mb-3' key={ item.id }>
          <BookCard
            thumbnail={ item.volumeInfo.imageLinks.thumbnail }
            title={ item.volumeInfo.title }
            authors={ item.volumeInfo.authors }
            description={ item.volumeInfo.description }
          />
        </div>
      )
    })

    if (loading) {
      return (
        <div className='d-flex justify-content-center mt-3'>
          <Spinner style= {{ width: '3rem', height: '3rem' }} />
        </div>
      ) 
    } else if (!loading && books.length > 0) {
      return (
        <div>
          <div className='container my-5'>
            <div className='row'>{ items }</div>
          </div>

          <ReactPaginate 
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={Math.ceil(totalResults/maxResults)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handleSearch}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        </div>
      );
    }
  }

  // Content
  const mainHeader = () => {
    return (
      <div className='main-header d-flex justify-content-center align-items-center flex-column'>
        <div className='filter'></div>
        <h1 className='display-2 text-center text-white mb-3' style={{ zIndex: 2 }}>
          Google Books App
        </h1>
        <div style={{ width: '60%', zIndex: 2 }}>
          <InputGroup size='lg' className='mb-3'>
            <Input
              placeholder='Book Search'
              value= { query }
              onChange={ e => setQuery(e.target.value) }
            />
            <Button color='secondary' onClick={handleSearch}>
              <i className='fas fa-search'></i>
            </Button>
          </InputGroup>
          <div className='resultSummary d-flex'>
            <div className='ml-2'>
              <h2>Result Summary:</h2>
              <p>Total Result: { totalResults }</p>
              <p>Server Response Time: </p>
              <p>Most Common Author: </p>
              <p>Earliest Publication Date: </p>
            </div>
          </div>
        </div>
        
      </div>
    )
  }

  return (
    <div className='w-100 h-100'>
      {mainHeader()}
      {handleResults()}
      <ToastContainer />
    </div>
  );
}

export default App;
