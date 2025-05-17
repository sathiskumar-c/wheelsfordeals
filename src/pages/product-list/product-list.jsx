// React imports
import React from "react";

// Components imports
import Footer from "../../components/footer/footer";
import ProductListFilter from "../../components/product-list-filter/product-list-filter";
import ImageCardSlider from "../../components/common-components/image-card-slider/image-card-slider";

//JSON imports
import ProductListImageSlider from "../../data/product-list-image-slider.json";
import Bikedetails from "../../data/bike-details.json";

const ProductList = () => {
  console.log("Bikedetails", Bikedetails);
  return (
    <React.Fragment>
      <p>Product List</p>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <ProductListFilter />
          </div>

          <div className="col-md-8">
            <p>Content</p>
            <ImageCardSlider
              data={ProductListImageSlider}
              styles={{ aspectRatio: "unset", image_bg: "unset" }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default ProductList;
