// Local Imports
import "./card-grid.scss";

const CardGrid = ({
  title,
  data,
  showTitle,
  style,
  cardKeyPrefix = "card",
}) => {
  return (
    <section className="card-grid-section component-parent">
      {showTitle && <h3 className="section-title text-center">{title}</h3>}
      <div className="card-grid">
        {data?.map((item, index) => (
          <div
            key={`${cardKeyPrefix}-${index}`}
            className="card"
            style={{ flex: style?.flex, maxWidth: style?.width }}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.alt || "icon"}
                className="card-icon"
                title={item.text}
              />
            )}
            <div className="card-content">
              {item.value && <h3 className="card-value">{item.value}</h3>}
              {item.text && <p className="card-text">{item.text}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardGrid;
