import React, { useEffect, useState, useRef } from "react";
import './HomePage.scss';
import { useNavigate } from "react-router-dom";

import gemHead from '../../assets/images/gem.png';
import catWaiting from '../../assets/images/cat-waiting.png';
import catWalking from '../../assets/images/cat-walking-right.gif';

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

    const stationSettingsBounds = { x: 800, y: 300, width: 100, height: 100 };
    const stationStoreBounds = { x: 600, y: 480, width: 100, height: 100 };
    const stationProfileBounds = { x: 1250, y: 480, width: 100, height: 100 };
    const stationPharmacyBounds = { x: 1100, y: 115, width: 100, height: 100 };
    const stationGamesBounds = { x: 200, y: 200, width: 100, height: 100 };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setIsMoving(true);
            setCatPosition((prev) => {
                const speed = 10;
                let newPos = { ...prev };

                if (e.key === "ArrowRight") newPos.x += speed;
                if (e.key === "ArrowLeft") newPos.x -= speed;
                if (e.key === "ArrowUp") newPos.y -= speed;
                if (e.key === "ArrowDown") newPos.y += speed;

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
        const isColliding = (a: typeof catPosition, b: { x: number; y: number; width: number; height: number }) => {
            return (
                a.x + 50 > b.x &&
                a.x < b.x + b.width &&
                a.y + 50 > b.y &&
                a.y < b.y + b.height
            );
        };

        if (isColliding(catPosition, stationSettingsBounds)) {
            navigate("/settings");
        } else if (isColliding(catPosition, stationStoreBounds)) {
            navigate("/store");
        } else if (isColliding(catPosition, stationProfileBounds)) {
            navigate("/profile");
        } else if (isColliding(catPosition, stationPharmacyBounds)) {
            navigate("/store");
        } else if (isColliding(catPosition, stationGamesBounds)) {
        navigate("/games");
    }
}, [catPosition, navigate]);

useEffect(() => {
    if (catRef.current) {
        const rect = catRef.current.getBoundingClientRect();
        console.log("Cat position on screen:", rect.left, rect.top);
    }
}, [catPosition]);

useEffect(() => {
    const centerX = window.innerWidth / 2 - 25;
    const centerY = window.innerHeight / 2 - 25;
    setCatPosition({ x: centerX, y: centerY });
}, []);


return (
    <div className="home-page-way-wrapper">
        <div className="scene">
            <img
                src={stationSettings}
                alt="Station Settings"
                className="station_settings"
                style={{
                    left: `${stationSettingsBounds.x}px`,
                    top: `${stationSettingsBounds.y}px`,
                    cursor: 'pointer',
                }}
            />

            <img
                src={stationStore}
                alt="Station Store"
                className="station_store"
                onClick={() => navigate('/store')}
                style={{
                    position: 'absolute',
                    left: `${stationStoreBounds.x}px`,
                    top: `${stationStoreBounds.y}px`,
                    cursor: 'pointer',
                }}
            />

            <img
                src={stationProfile}
                alt="Station Profile"
                className="station_profile"
                onClick={() => navigate('/profile')}
                style={{
                    position: 'absolute',
                    left: `${stationProfileBounds.x}px`,
                    top: `${stationProfileBounds.y}px`,
                    cursor: 'pointer',
                }}
            />

            <img
                src={stationPharmacy}
                alt="Station Pharmacy"
                className="station_pharmacy"
                onClick={() => navigate('/store')}
                style={{
                    position: 'absolute',
                    left: `${stationPharmacyBounds.x}px`,
                    top: `${stationPharmacyBounds.y}px`,
                    cursor: 'pointer',
                }}
            />

            <img
                src={stationGames}
                alt="Station Games"
                className="station_games"
                onClick={() => navigate('/games')}
                style={{
                    position: 'absolute',
                    left: `${stationGamesBounds.x}px`,
                    top: `${stationGamesBounds.y}px`,
                    cursor: 'pointer',
                }}
            />

            <img
                ref={catRef}
                src={isMoving ? catWalking : catWaiting}
                alt="Cat"
                className="cat"
                style={{ left: `${catPosition.x}px`, top: `${catPosition.y}px` }}
            />

            <img
                src={gemHead}
                alt="Gem Head"
                className="gem-head"
                style={{
                    left: `${catPosition.x + 10}px`,
                    top: `${catPosition.y - 40}px`,
                }}
            />

            {/* Sección de pruebas */}

            {/* <div
                    style={{
                        position: 'absolute',
                        left: `${stationGamesBounds.x}px`,
                        top: `${stationGamesBounds.y}px`,
                        width: `${stationGamesBounds.width}px`,
                        height: `${stationGamesBounds.height}px`,
                        backgroundColor: 'rgba(255, 0, 0, 0.3)',
                        pointerEvents: 'none',
                        zIndex: 0,
                    }}
                ></div> */}

        </div>
    </div>

);
};

export default HomePage;
