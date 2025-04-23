// src/pages/HomePage/HomePage.tsx

import React, { useEffect, useState } from "react";
import './HomePage.scss';
import { useNavigate } from "react-router-dom";

import stationSettings from '../../assets/images/station_settings.png';
import catGif from '../../assets/images/cat-picked.gif';

const HomePage: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            {/* Menú visual */}
            <div className="home-page-content">
                <img
                    src={stationSettings}
                    alt="Station Settings"
                    className="centered-image"
                    onClick={() => navigate("/settings")}
                />
            </div>

            <img
                src={catGif}
                alt="Cursor Cat"
                className="custom-gif-cursor"
                style={{ top: position.y, left: position.x }}
            />

        </>
    );
};

export default HomePage;
