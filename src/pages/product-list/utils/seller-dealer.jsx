import VerifiedIcon from "@mui/icons-material/Verified";

const SellerDealer = ({ data }) => {
  return (
    <div className="seller_dealer">
      {data?.seller_type === "Individual" ? (
        <div className="individual">
          <VerifiedIcon />
          <h6 className="mb-0">Verified Seller</h6>
        </div>
      ) : (
        <div className="dealer">
          <VerifiedIcon />
          <h6 className="mb-0">Verified Dealer</h6>
        </div>
      )}
    </div>
  );
};

export default SellerDealer;
