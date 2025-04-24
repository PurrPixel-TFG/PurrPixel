import React, { useEffect, useState } from "react";
import './HomePage.scss';
import { useNavigate } from "react-router-dom";

import way from '../../assets/images/HomePage_way.png';
import catWaiting from '../../assets/images/cat-waiting.png';
import catWalking from '../../assets/images/cat-walking-right.gif';
import stationSettings from '../../assets/images/station_settings.png';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [isMoving, setIsMoving] = useState(false);
    const [catPosition, setCatPosition] = useState({ x: 50, y: 50 });

    const stationBounds = { x: 800, y: 300, width: 100, height: 100 };

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
        if (
            catPosition.x + 50 > stationBounds.x &&
            catPosition.x < stationBounds.x + stationBounds.width &&
            catPosition.y + 50 > stationBounds.y &&
            catPosition.y < stationBounds.y + stationBounds.height
        ) {
            navigate("/settings");
        }
    }, [catPosition, navigate]);

    return (
        <div className="home-page-way-wrapper">
            <div className="scene">
                <img
                    src={stationSettings}
                    alt="Station"
                    className="station"
                    style={{ left: `${stationBounds.x}px`, top: `${stationBounds.y}px` }}
                />

                <img
                    src={isMoving ? catWalking : catWaiting}
                    alt="Cat"
                    className="cat"
                    style={{ left: `${catPosition.x}px`, top: `${catPosition.y}px` }}
                />
            </div>
        </div>

    );
};

export default HomePage;
