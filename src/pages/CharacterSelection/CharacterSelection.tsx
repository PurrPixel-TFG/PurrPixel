import React from "react";
import { useNavigate } from "react-router-dom";
import './CharacterSelection.scss';
import img1 from '../../assets/images/statusHeart_Food.webp';
import img2 from '../../assets/images/statusHeart_Happiness.png';
import img3 from '../../assets/images/statusHeart_water.png';

const CharacterSelection: React.FC = () => {

  const navigate = useNavigate();

  const handleCatClick = () => {
    navigate('/home-page');
  };
  
  return (
    <>
      <main className="container_HomePage">
        <div className="container_cats">
          <div className="cat_1" onClick={handleCatClick}>¡Añádeme!</div>
          <div className="cat_2" onClick={handleCatClick}>Cat 2</div>
          <div className="cat_3" onClick={handleCatClick}>Cat 3</div>
        </div>

        <div className="container_cats_status">
          <div className="status_cat_1 status-cat">
            <div className="status-block">
              <p className="text_health">Health</p>
              <div className="icons-row">
                <img src={img1} alt="Health" />
                <img src={img1} alt="Health" />
                <img src={img1} alt="Health" />
                <img src={img1} alt="Health" />
                <img src={img1} alt="Health" />
              </div>
            </div>

            <div className="status-block">
              <p className="text_clean">Clean</p>
              <div className="icons-row">
                <img src={img3} alt="Clean" />
                <img src={img3} alt="Clean" />
                <img src={img3} alt="Clean" />
                <img src={img3} alt="Clean" />
                <img src={img3} alt="Clean" />
              </div>
            </div>

            <div className="status-block">
              <p className="text_happiness">Happiness</p>
              <div className="icons-row">
                <img src={img2} alt="Happiness" />
                <img src={img2} alt="Happiness" />
                <img src={img2} alt="Happiness" />
                <img src={img2} alt="Happiness" />
                <img src={img2} alt="Happiness" />
              </div>
            </div>
          </div>
          <div className="status_cat_2 status-cat">
            <div className="status-block">
              <p className="text_health">Health</p>
              <div className="icons-row">
                <img src={img1} alt="Health" />
                <img src={img1} alt="Health" />
                <img src={img1} alt="Health" />
                <img src={img1} alt="Health" />
                <img src={img1} alt="Health" />
              </div>
            </div>

            <div className="status-block">
              <p className="text_clean">Clean</p>
              <div className="icons-row">
                <img src={img3} alt="Clean" />
                <img src={img3} alt="Clean" />
                <img src={img3} alt="Clean" />
                <img src={img3} alt="Clean" />
                <img src={img3} alt="Clean" />
              </div>
            </div>

            <div className="status-block">
              <p className="text_happiness">Happiness</p>
              <div className="icons-row">
                <img src={img2} alt="Happiness" />
                <img src={img2} alt="Happiness" />
                <img src={img2} alt="Happiness" />
                <img src={img2} alt="Happiness" />
                <img src={img2} alt="Happiness" />
              </div>
            </div>
          </div>
          <div className="status_cat_3 status-cat">
            <div className="status-block">
              <p className="text_health">Health</p>
              <div className="icons-row">
                <img src={img1} alt="Health" />
                <img src={img1} alt="Health" />
                <img src={img1} alt="Health" />
                <img src={img1} alt="Health" />
                <img src={img1} alt="Health" />
              </div>
            </div>

            <div className="status-block">
              <p className="text_clean">Clean</p>
              <div className="icons-row">
                <img src={img3} alt="Clean" />
                <img src={img3} alt="Clean" />
                <img src={img3} alt="Clean" />
                <img src={img3} alt="Clean" />
                <img src={img3} alt="Clean" />
              </div>
            </div>

            <div className="status-block">
              <p className="text_happiness">Happiness</p>
              <div className="icons-row">
                <img src={img2} alt="Happiness" />
                <img src={img2} alt="Happiness" />
                <img src={img2} alt="Happiness" />
                <img src={img2} alt="Happiness" />
                <img src={img2} alt="Happiness" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CharacterSelection;
