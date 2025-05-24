import React from "react";
import { useNavigate } from "react-router-dom";
import './CharacterSelection.scss';

import imgHealth from '../../assets/assets_components/statusHeart_Food.webp';
import imgHappiness from '../../assets/assets_components/statusHeart_Happiness.png';
import imgClean from '../../assets/assets_components/statusHeart_water.png';
import catBlack from '../../assets/assets_homepage/catBlack.jpg';

import { useCatStats } from '../../pages/Cat/Cat.tsx';

const CharacterSelection: React.FC = () => {
  const navigate = useNavigate();

  const { stats } = useCatStats({
    initialStats: { health: 5, happiness: 5, clean: 5 }
  });

  const handleCatClick = () => {
    navigate('/home-page', {
      state: {
        catId: 1,
        initialStats: stats,
      },
    });
  };

 const renderIcons = (icon: string, value: number, max = 5) => {
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


  // Panel estático con todos los stats llenos
  const renderStaticPanel = (catName: string) => (
    <div className="status-cat-static status-cat">
      <h3>{catName}</h3>
      <div className="status-block">
        <p className="text_health">Health</p>
        <div className="icons-row">{renderIcons(imgHealth, 5)}</div>
      </div>
      <div className="status-block">
        <p className="text_clean">Cleanliness</p>
        <div className="icons-row">{renderIcons(imgClean, 5)}</div>
      </div>
      <div className="status-block">
        <p className="text_happiness">Happiness</p>
        <div className="icons-row">{renderIcons(imgHappiness, 5)}</div>
      </div>
    </div>
  );

  return (
    <>
      <main className="container_HomePage">
        <div className="container_cats">
          <div className="cat_1" onClick={handleCatClick}>
            <img src={catBlack} alt="tuPurr" />
          </div>
          <div className="cat_2">Cat 2</div>
          <div className="cat_3">Cat 3</div>
        </div>

        <div className="container_cats_status">
          {/* Panel dinámico para gato 1 */}
          <div className="status_cat_1 status-cat">
            <h3>Cat 1 (Funcional)</h3>
            <div className="status-block">
              <p className="text_health">Health</p>
              <div className="icons-row">{renderIcons(imgHealth, stats.health)}</div>
            </div>
            <div className="status-block">
              <p className="text_clean">Cleanliness</p>
              <div className="icons-row">{renderIcons(imgClean, stats.clean)}</div>
            </div>
            <div className="status-block">
              <p className="text_happiness">Happiness</p>
              <div className="icons-row">{renderIcons(imgHappiness, stats.happiness)}</div>
            </div>
          </div>

          {/* Dos paneles estáticos debajo del primero */}
          {renderStaticPanel("Cat 2")}
          {renderStaticPanel("Cat 3")}
        </div>
      </main>
    </>
  );
};

export default CharacterSelection;
