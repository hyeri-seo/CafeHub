import React, { useEffect, useState } from 'react';
import "./SideTabStyle.css"
import { Link, NavLink, useLocation } from 'react-router-dom';

const SideTab = () => {
    const tabs = [
       {label:'회원 정보', link:'/userInfo'},
       {label: '찜한 가게', link:'/WishStore'},
       {label:'찜한 리뷰', link:'/wishReview'},
       {label:'리뷰 관리' , link:'/myReivew'},
       {label:'댓글 관리', link:'/myReply'},
       {label:'커피콩 관리', link:'/userPoint'}
    ];

    return (
        <div className='sideBox'>
        {tabs.map((tab, index) => (
            <NavLink
                key={index}
                to={tab.link}
                className={({isActive}) => (isActive ? 'selectTab':'tab')}
            >
                {tab.label}
            </NavLink>
        ))}
    </div>

    );
};

export default SideTab;