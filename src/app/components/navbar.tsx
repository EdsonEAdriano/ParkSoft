'use client'

import React, { useState, useEffect } from 'react';
import './navbar.css';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // Inicializa como false

    const toggleDropdown = () => {
        if (isMobile) {
            setIsOpen(!isOpen);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        // Define o estado inicial de isMobile
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`navbar ${isMobile ? 'vertical' : ''}`}>
            <Link href='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="logo">
                    <h1>soft</h1>
                    <h1>park.</h1>
                </div>
            </Link>
            {isMobile && ( 
                <button className="dropdown-button" onClick={toggleDropdown}>
                    {isOpen ? '▲' : '▼'}
                </button>
            )}
            {(isOpen || !isMobile) && ( 
                <ul className="menu dropdown">
                    <li>
                        <Link href='/entries' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="icon">
                                <i className="fas fa-parking"></i>
                            </div>
                            <span>Entradas</span>
                        </Link>
                    </li>
                    <li>
                        <Link href='/reservations' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="icon">
                                <i className="fas fa-calendar-check"></i>
                            </div>
                            <span>Reservas</span>
                        </Link>
                    </li>
                    <li>
                        <div className="icon">
                            <i className="fas fa-user"></i>
                        </div>
                        <span>Mensalistas</span>
                    </li>
                    <li>
                        <div className="icon">
                            <i className="fas fa-star"></i>
                        </div>
                        <span>Favoritos</span>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Navbar;