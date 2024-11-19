'use client'

import React, { useState, useEffect } from 'react';
import './navbar.css';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false); 
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
                <ul className={`menu dropdown ${isOpen ? 'active' : ''}`}>                    <li>
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
                        <Link href='/dashboard' style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="icon">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <span>Relatórios</span>
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Navbar;
