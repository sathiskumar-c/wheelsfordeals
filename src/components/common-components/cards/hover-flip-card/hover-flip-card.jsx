// Local Imports
import "./hover-flip-card.scss";

const HoverFlipCard = ({ frontSideContent, backSideContent }) => {
  return (
    <div class="flip-card-parent">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <div>{frontSideContent}</div>
        </div>
        <div class="flip-card-back">{backSideContent}</div>
      </div>
    </div>
  );
};

export default HoverFlipCard;
