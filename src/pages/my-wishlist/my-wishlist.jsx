// React Imports
import React from "react";

// Component Imports
import ProductCard from "../../components/common-components/product-card/product-card";
import Breadcrumb from "../../components/common-components/breadcrumb/breadcrumb";

// JSON Imports
import myWishlistBikes from "../../data/my-wishlist.json";
import breadcrumbData from "../../data/breadcrumb.json";

// Local Imports
import "./my-wishlist.scss";

const MyWishlist = () => {
  const handleOpenExpandView = () => {
    // Add your dialog open logic here
    console.log("Expand view opened");
  };

  return (
    <div className="my-wishlist-container">
      <div className="wishlist-header">
        <Breadcrumb breadcrumbData={breadcrumbData.myWishlist.breadcrumbs} />
        
      </div>
      <div className="wishlist-content">
        {myWishlistBikes.length > 0 ? (
          <div className="wishlist-grid">
            {myWishlistBikes.map((res) => (
              <ProductCard
                key={res.id}
                card={res}
                dialogOpen={handleOpenExpandView}
                isWishlist={true}
              />
            ))}
          </div>
        ) : (
          <div className="empty-wishlist">
            <img
              src="/images/illustrations/empty-wishlist.png"
              alt="Empty Wishlist"
            />
            <h2>Your wishlist is empty</h2>
            <p>Start adding bikes you love to your wishlist</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishlist;
