import React, { useEffect, useState, useRef } from "react";
import './HomePage.scss';
import { useNavigate } from "react-router-dom";

import gemHead from '../../assets/images/gem.png';
import catWaiting from '../../assets/images/cat-waiting.png';
import catWalkingRight from '../../assets/images/cat-walking-right.gif';
import catWalkingLeft from '../../assets/images/cat-walking-left.gif';

import stationSettings from '../../assets/images/station_settings.png';
import stationStore from '../../assets/images/station_store.png';
import stationProfile from '../../assets/images/station_profile.png';
import stationPharmacy from '../../assets/images/station_pharmacy.png';
import stationGames from '../../assets/images/station_game.png';

const HomePage: React.FC = () => {
    const catRef = useRef<HTMLImageElement | null>(null);
    const navigate = useNavigate();

    const [isMoving, setIsMoving] = useState(false);
    const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
    const [direction, setDirection] = useState<"left" | "right">("right");


    const hitboxSize = { width: 50, height: 50 };

    const stationSettingsImagePos = { x: 800, y: 70 };
    const stationStoreImagePos = { x: 600, y: 350 };
    const stationProfileImagePos = { x: 1250, y: 320 };
    const stationPharmacyImagePos = { x: 1030, y: 90 };
    const stationGamesImagePos = { x: 300, y: 100 };

    const stationSettingsBounds = {
        x: stationSettingsImagePos.x + 100 / 2 - hitboxSize.width / 2,
        y: stationSettingsImagePos.y + 100 / 2 - hitboxSize.height / 2,
        width: hitboxSize.width,
        height: hitboxSize.height,
    };

    const stationStoreBounds = {
        x: stationStoreImagePos.x + 200 / 2 - hitboxSize.width / 2,
        y: stationStoreImagePos.y + 100 / 2 - hitboxSize.height / 2,
        width: hitboxSize.width,
        height: hitboxSize.height,
    };

    const stationProfileBounds = {
        x: stationProfileImagePos.x + 150 / 2 - hitboxSize.width / 2,
        y: stationProfileImagePos.y + 150 / 2 - hitboxSize.height / 2,
        width: hitboxSize.width,
        height: hitboxSize.height,
    };

    const stationPharmacyBounds = {
        x: stationPharmacyImagePos.x + 130 / 2 - hitboxSize.width / 2,
        y: stationPharmacyImagePos.y + 130 / 2 - hitboxSize.height / 2,
        width: hitboxSize.width,
        height: hitboxSize.height,
    };

    const stationGamesBounds = {
        x: stationGamesImagePos.x + 180 / 2 - hitboxSize.width / 2,
        y: stationGamesImagePos.y + 180 / 2 - hitboxSize.height / 2,
        width: hitboxSize.width,
        height: hitboxSize.height,
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setIsMoving(true);
            setCatPosition((prev) => {
                const speed = 10;
                let newPos = { ...prev };

                if (e.key === "ArrowRight") {
                    newPos.x += speed;
                    setDirection("right");
                } else if (e.key === "ArrowLeft") {
                    newPos.x -= speed;
                    setDirection("left");
                } else if (e.key === "ArrowUp") {
                    newPos.y -= speed;
                } else if (e.key === "ArrowDown") {
                    newPos.y += speed;
                }

                return newPos;
            });
        };


        const handleKeyUp = () => {
            setIsMoving(false);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    useEffect(() => {
        const doesCatCollideWithArea = (
            catPosition: { x: number; y: number },
            area: { x: number; y: number; width: number; height: number }
        ) => {
            const catWidth = 50;
            const catHeight = 50;

            const catRight = catPosition.x + catWidth;
            const catBottom = catPosition.y + catHeight;

            const areaRight = area.x + area.width;
            const areaBottom = area.y + area.height;

            const isHorizontallyOverlapping = catRight > area.x && catPosition.x < areaRight;
            const isVerticallyOverlapping = catBottom > area.y && catPosition.y < areaBottom;

            return isHorizontallyOverlapping && isVerticallyOverlapping;
        };

        if (doesCatCollideWithArea(catPosition, stationSettingsBounds)) {
            navigate("/settings");
        } else if (doesCatCollideWithArea(catPosition, stationStoreBounds)) {
            navigate("/store");
        } else if (doesCatCollideWithArea(catPosition, stationProfileBounds)) {
            navigate("/profile");
        } else if (doesCatCollideWithArea(catPosition, stationPharmacyBounds)) {
            navigate("/store");
        } else if (doesCatCollideWithArea(catPosition, stationGamesBounds)) {
            navigate("/games");
        }
    }, [catPosition, navigate]);


    useEffect(() => {
        const centerX = window.innerWidth / 2 - 25;
        const centerY = window.innerHeight / 2 - 25;
        setCatPosition({ x: centerX, y: centerY });
    }, []);

    return (
        <div className="home-page-way-wrapper">
            <div className="home-background-layer" />
            <div className="scene">
                <img src={stationSettings} alt="Settings" className="station_settings" style={{
                    position: 'absolute',
                    left: `${stationSettingsImagePos.x}px`,
                    top: `${stationSettingsImagePos.y}px`,
                    cursor: 'pointer',
                }} />

                <img src={stationStore} alt="Store" className="station_store" style={{
                    position: 'absolute',
                    left: `${stationStoreImagePos.x}px`,
                    top: `${stationStoreImagePos.y}px`,
                    cursor: 'pointer',
                }} />

                <img src={stationProfile} alt="Profile" className="station_profile" style={{
                    position: 'absolute',
                    left: `${stationProfileImagePos.x}px`,
                    top: `${stationProfileImagePos.y}px`,
                    cursor: 'pointer',
                }} />

                <img src={stationPharmacy} alt="Pharmacy" className="station_pharmacy" style={{
                    position: 'absolute',
                    left: `${stationPharmacyImagePos.x}px`,
                    top: `${stationPharmacyImagePos.y}px`,
                    cursor: 'pointer',
                }} />

                <img src={stationGames} alt="Games" className="station_games" style={{
                    position: 'absolute',
                    left: `${stationGamesImagePos.x}px`,
                    top: `${stationGamesImagePos.y}px`,
                    cursor: 'pointer',
                }} />

                <img
                    ref={catRef}
                    src={
                        isMoving
                            ? direction === "right"
                                ? catWalkingRight
                                : catWalkingLeft
                            : catWaiting
                    }
                    alt="Cat"
                    className="cat"
                    style={{
                        left: `${catPosition.x}px`,
                        top: `${catPosition.y}px`,
                    }}
                />


                <img src={gemHead} alt="Gem" className="gem-head" style={{
                    left: `${catPosition.x + 10}px`,
                    top: `${catPosition.y - 40}px`,
                }} />

                {/* Debug hitbox */}
                {/* <div style={{
            position: 'absolute',
            left: `${stationPharmacyBounds.x}px`,
            top: `${stationPharmacyBounds.y}px`,
            width: `${stationPharmacyBounds.width}px`,
            height: `${stationPharmacyBounds.height}px`,
            backgroundColor: 'rgba(0, 255, 0, 0.3)',
            pointerEvents: 'none',
            zIndex: 5,
          }} /> */}
            </div>
        </div>
    );
};

export default HomePage;  