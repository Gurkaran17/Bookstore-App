import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';
import axios from 'axios';


function Freebook({item}) {
  const [book,setBook] = useState([]);
  useEffect(() => {
    const getBook = async() =>{
      try {
        const res = await axios.get("https://bookstoreapp-avcu.onrender.com/book");
        
        const data = res.data.filter((data) => data.category === "Free")
        console.log(data);
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook()
  },[])

    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  return (
    <>
    <div className = "max-w-screen-2x1 container mx-auto md:px-20 px-4">
        <div>
        <h1 className = "font-semibold text-xl pb-2">
            Free Offered Ccourse
        </h1>
        <p>
        Welcome to our Free Offerings section! Enjoy a diverse selection of complimentary eBooks and audiobooks. Discover new favorites without spending a dime. Start your literary adventure for free today!
        </p>
        </div>
    
    <div>
    <Slider {...settings}>
    {book.map((item)=>(
  <Cards item={item} key={item.id}/>
  ))}
      </Slider>
    </div>
    </div>
    </>
  )
}


export default Freebook
