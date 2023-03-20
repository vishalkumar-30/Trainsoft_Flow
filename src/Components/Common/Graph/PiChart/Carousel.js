import React from 'react'
import { Helmet } from 'react-helmet'
import Newpichart from './Newpichart'
import "./style.css"
const Carousel = () => {
  return (
    <div>
        <Helmet>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        </Helmet>
<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
     <Newpichart/>
     <div class="carousel-caption d-none d-md-block">
    <div className="title-lg">Video</div>
    
  </div>
    </div>
    <div class="carousel-item">
    <Newpichart/>
    <div class="carousel-caption d-none d-md-block">
    <div className="title-lg">Lab</div>
    
  </div>
    </div>
    <div class="carousel-item">
      {/* <img class="d-block w-100" src="..." alt="Third slide"/> */}
      <Newpichart/>
      <div class="carousel-caption d-none d-md-block">
    <div className="title-lg">Assesment</div>
    
  </div>
    </div>
    <div class="carousel-item">
      {/* <img class="d-block w-100" src="..." alt="Third slide"/> */}
      <Newpichart/>
    </div>
    <div class="carousel-item">
      {/* <img class="d-block w-100" src="..." alt="Third slide"/> */}
      <Newpichart />
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
    </div>
  )
}

export default Carousel