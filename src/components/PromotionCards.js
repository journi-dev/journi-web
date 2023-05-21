import axios from "axios";
import { useEffect, useState } from "react";
import PromotionCard from "./PromotionCard";
import Masonry from "react-masonry-css";
import NoActiveOrUpcomingPromotionsYet from "./NoActiveOrUpcomingPromotionsYet";

// TODO: Make based on theme with makeStyles
const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function PromotionCards({ isDark }) {
  const [promotions, setPromotions] = useState([]);
  useEffect(() => {
    axios
      .get("/promotions")
      .then((response) => {
        setPromotions(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {promotions.length ? (
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {promotions.map((promo) => (
            <PromotionCard
              key={promo.promoId}
              promoName={promo.promoName}
              promoCode={promo.promoCode}
              promoDesc={promo.promoDesc}
              username={promo.username}
              userImage={promo.userImage}
            />
          ))}
        </Masonry>
      ) : (
        <NoActiveOrUpcomingPromotionsYet isDark={isDark} />
      )}
    </div>
  );
}
