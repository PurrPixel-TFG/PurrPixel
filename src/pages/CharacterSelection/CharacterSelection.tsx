import React from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseCat } from "../../hooks/useSupabaseCat";
import "./CharacterSelection.scss";

import imgHealth from '../../assets/assets_components/statusHeart_Food.webp';
import imgHappiness from '../../assets/assets_components/statusHeart_Happiness.png';
import imgClean from '../../assets/assets_components/statusHeart_water.png';
import catBlack from '../../assets/assets_homepage/catBlack.jpg';
import meowvingInSoon from '../../assets/assets_homepage/Meowving_in_soon.png';

const CharacterSelection: React.FC = () => {
  const navigate = useNavigate();
  const { catStats } = useSupabaseCat();

  const handleCatClick = () => {
    if (!catStats) return;

    navigate("/home-page", {
      state: {
        catId: catStats.id,
        initialStats: catStats,
      },
    });
  };

  const renderIcons = (icon: string, value: number = 0, max = 5) => {
    return [...Array(max)].map((_, i) => (
      <img
        key={i}
        src={icon}
        alt="icon"
        style={{
          opacity: i < value ? 1 : 0.3,
          marginRight: 2,
          width: 20,
          height: 20,
          transition: "opacity 0.5s"
        }}
      />
    ));
  };

  const renderStaticPanel = (catName: string, showStats: boolean = true) => (
    <div className="status-cat-static status-cat">
      <h3>{catName}</h3>

      <div className="status-block">
        <p className="text_health">Health</p>
        {showStats ? (
          <div className="icons-row">{renderIcons(imgHealth, 5)}</div>
        ) : (
          <div className="icons-row hidden-status">🔒</div>
        )}
      </div>

      <div className="status-block">
        <p className="text_clean">Cleanliness</p>
        {showStats ? (
          <div className="icons-row">{renderIcons(imgClean, 5)}</div>
        ) : (
          <div className="icons-row hidden-status">🔒</div>
        )}
      </div>

      <div className="status-block">
        <p className="text_happiness">Happiness</p>
        {showStats ? (
          <div className="icons-row">{renderIcons(imgHappiness, 5)}</div>
        ) : (
          <div className="icons-row hidden-status">🔒</div>
        )}
      </div>
    </div>
  );


  return (
    <main className="container_HomePage">
      <div className="container_cats">
        <div className="cat_1" onClick={handleCatClick}>
          <img src={catBlack} alt="tuPurr" />
        </div>
        <div className="cat_2">
          <img src={meowvingInSoon} alt="Meowving in soon" />
        </div>
        <div className="cat_3">
          <img src={meowvingInSoon} alt="Meowving in soon" />
        </div>
      </div>

      <div className="container_cats_status">
        <div className="status_cat_1 status-cat">
          <h3>Oreo</h3>
          <div className="status-block">
            <p className="text_health">Health</p>
            <div className="icons-row">{renderIcons(imgHealth, catStats?.health)}</div>
          </div>
          <div className="status-block">
            <p className="text_clean">Cleanliness</p>
            <div className="icons-row">{renderIcons(imgClean, catStats?.clean)}</div>
          </div>
          <div className="status-block">
            <p className="text_happiness">Happiness</p>
            <div className="icons-row">{renderIcons(imgHappiness, catStats?.happiness)}</div>
          </div>
        </div>

        {renderStaticPanel("🔒", false)}
        {renderStaticPanel("🔒", false)}

      </div>
    </main>
  );
};

export default CharacterSelection;
