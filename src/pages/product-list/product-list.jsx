import React from "react";
import Footer from "../../components/footer/footer";
import ProductListFilter from "../../components/product-list-filter/product-list-filter";

const ProductList = () => {
  return (
    <React.Fragment>
      <p>Product List</p>

      <div className="container row">
        <div className="col-md-4">
          <ProductListFilter />
        </div>
        <p className="col-md-8">Content</p>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default ProductList;
