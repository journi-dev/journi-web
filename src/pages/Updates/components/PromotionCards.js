import axios from "axios";
import { useEffect, useState } from "react";
import PromotionCard from "./PromotionCard";
import Masonry from "react-masonry-css";
import NoActiveOrUpcomingPromotionsYet from "./NoActiveOrUpcomingPromotionsYet";
import PromotionLoadingCard from "./PromotionLoadingCard";
import ErrorPlaceholder from "./ErrorPlaceholder";

// TODO: Make based on theme with makeStyles
const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function PromotionCards() {
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/promotions")
      .then((response) => {
        setPromotions(response.data);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading && (
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          <PromotionLoadingCard />
          <PromotionLoadingCard />
          <PromotionLoadingCard />
        </Masonry>
      )}

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
      {promotions.length === 0 && !isLoading && (
        <NoActiveOrUpcomingPromotionsYet />
      )}
      {error && <ErrorPlaceholder />}
      <ErrorPlaceholder />
    </div>
  );
}
