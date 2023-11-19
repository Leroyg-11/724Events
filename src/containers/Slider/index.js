import { useEffect, useState } from "react";

import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus
    .sort((evtA, evtB) => (new Date(evtA.date) < new Date(evtB.date) ? -1 : 1))
    .reverse();

  const nextCard = () => {
    setIndex((prevIndex) =>
      prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextCard, 5000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [index, byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={radioIdx}
                  type="radio"
                  readOnly
                  name="radio-button"
                  checked={index === radioIdx} // MODIF :  checked={idx === radioIdx} => checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
