// Local Imports
import "./hover-swap-card.scss";

const HoverSwapCard = ({
  frontSideContent,
  backSideContent,
  backSideTitle,
  subtitle,
  styles,
}) => {
  return (
    <div className="swap-card">
      <div className="swap-card__content">
        <div className="swap-card__front">
          <div className="swap-card__front-content">
            <strong>{frontSideContent}</strong>
          </div>
        </div>
        <div
          className="swap-card__back"
          style={{ backgroundImage: `url(${styles.backGroundImage})` }}
        >
          <div className="swap-card__back-content">
            <strong className="swap-card__badge">{subtitle}</strong>
            <div className="swap-card__description">
              <div className="swap-card__title">
                <p className="swap-card__title-text">
                  <strong>{backSideTitle}</strong>
                </p>
              </div>
              <p className="swap-card__footer">{subtitle} &nbsp; &nbsp;</p>
              {backSideContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverSwapCard;
