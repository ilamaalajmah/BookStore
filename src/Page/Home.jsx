import  { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
function Home() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(
        'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=bjkNSYe1RndFzKefwCSWp7YqOYcvSkgM'
      )
      .then((res) => {
        console.log(res.data.results.books);
        setBooks(res.data.results.books);
      });
  };

  const handleSearch = () => {
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setBooks(filteredBooks);
  };

  return (
    <>
    <div className='flex flex-row justify-between p-2 bg-[#386b57]'>
      <h1 className='font-bold text-2xl text-white'>BookStore</h1>
      <div>
        <Link to={'/LogIn'}>
        <button className='p-2 font-bold text-white'>SingUp</button>
        </Link>
        <Link to={'/SingUp'}>
        <button className='p-2 text-white'>LogIn</button>
        </Link>
      </div>
    </div>
    
      <div className='bg-[#386b57] p-8 flex flex-row justify-around'>
        <div className='p-4'>
          <h1 className="font-bold text-3xl font-['Merriweather'] text-white">Welcome To Our BookStore</h1>
  
          <div className='flex flex-row items-center'>
            <input
              className='rounded-md h-8 p-4 '
              type='search'

              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className='rounded-full p-2 border-black font-bold ml-2 text-2xl text-white'
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div>
          <img
            className='w-80 max-sm:hidden'
            src='https://freepngimg.com/save/21947-open-book-transparent-background/2186x1031'
            alt='Book'
          />
        </div>
      </div>

      <div className='flex justify-center items-center p-2 bg-[#386b57]'>
        <div className='grid grid-cols-5 gap-6 max-sm:grid-cols-2'>
          {books.map((item, index) => (
            <div key={index} className='w-32 flex flex-col text-center p-4 bg-emerald-600/50'>
              <Popup trigger={<img src={item.book_image} className='w-32' />} modal nested>
                {(close) => (
                  <div className='bg-[#ffffff] w-80 p-4 text-center rounded-lg '>
                    <div>
                      <p className='font-bold'> Title : {item.title}</p>
                      <p> Author : {item.author}</p>
                      <p> Description : {item.description}</p>
                      <div>
                        {item.buy_links &&
                          item.buy_links.map((buyItem, indexBuy) => (
                            <div key={indexBuy} className='flex flex-row text'>
                              <p>{buyItem.name}</p>
                              <a
                                href={buyItem.url}
                                className='font-bold'
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                Link
                              </a>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className='flex justify-end mt-4'>
                      <button onClick={() => close()}>
                        <img
                          src='https://www.freeiconspng.com/thumbs/x-png/x-png-15.png'
                          className='w-6'
                          alt='Close'
                        />
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
