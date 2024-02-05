import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Nav.scss'

const Nav = () => {
    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <nav className="nav">
                <NavLink className="nav-link" to="/">Trang chủ</NavLink>
                <NavLink className="nav-link" to="/about">Giới thiệu</NavLink>
                <NavLink className="nav-link" to="/contact">Liên hệ</NavLink>
                <NavLink className="nav-link" to="/new">Tin tức</NavLink>
                <NavLink className="nav-link" to="/login">đăng nhập</NavLink>

            </nav>
        </div>
        
    );
}

export default Nav;