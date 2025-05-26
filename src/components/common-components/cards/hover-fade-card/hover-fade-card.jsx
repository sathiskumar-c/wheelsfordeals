// Local Imports
import "./hover-fade-card.scss";

const HoverFadeCard = ({ frontSideContent, backSideContent, styles }) => {
  return (
    <div
      className="fade-card-parent"
      style={{ width: styles.width, height: styles.height }}
    >
      <div className="card-front">
        <div>{frontSideContent}</div>
      </div>
      <div className="card-back">
        <div>{backSideContent}</div>
      </div>
    </div>
  );
};

export default HoverFadeCard;
