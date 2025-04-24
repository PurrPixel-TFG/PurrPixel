import React from "react";
import './CharacterSelection.scss';

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
        <div className="status_cat_1">Status Cat 1</div>
        <div className="status_cat_2">Status Cat 2</div>
        <div className="status_cat_3">Status Cat 3</div>
        <div className="status_cat_4">Status Cat 4</div>
      </div>

      </main>
    </>
  );
};

export default CharacterSelection;
