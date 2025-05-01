import React from "react";
import './CharacterSelection.scss';
import img1 from '../../assets/images/statusHeart_Food.webp';
import img2 from '../../assets/images/statusHeart_Happiness.png';
import img3 from '../../assets/images/statusHeart_water.png';

const CharacterSelection: React.FC = () => {
  return (
    <>
      <main className="container_HomePage">
        <div className="container_cats">
          <div className="cat_1">Cat 1</div>
          <div className="cat_2">Cat 2</div>
          <div className="cat_3">Cat 3</div>
          <div className="cat_4">Cat 4</div>
        </div>

        <div className="container_cats_status">
          <div className="status_cat_1 status-cat">
            <img src={img1} alt="Food" />
            <img src={img3} alt="Water" />
            <img src={img2} alt="Happiness" />
          </div>
          <div className="status_cat_2 status-cat">
            <img src={img1} alt="Food" />
            <img src={img3} alt="Water" />
            <img src={img2} alt="Happiness" />
          </div>
          <div className="status_cat_3 status-cat">
            <img src={img1} alt="Food" />
            <img src={img3} alt="Water" />
            <img src={img2} alt="Happiness" />
          </div>
          <div className="status_cat_4 status-cat">
            <img src={img1} alt="Food" />
            <img src={img3} alt="Water" />
            <img src={img2} alt="Happiness" />
          </div>
        </div>
      </main>
    </>
  );
};

export default CharacterSelection;
