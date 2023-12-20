import "./wishStoreStyle.css";
import UserSideTab from "../components/UserSideTab";

import { useEffect, useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import MapCafeInfo from "../map/MapCafeInfo";
import { url } from '../config.js'
const {kakao} = window;

const WishStore = () => {
  const [wishStoreList, setWishStoreList] = useState([]);
  const [cafeNo, setCafeNo] = useState(0);
  const [selectCafe, setSelectCafe] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const memNo = useSelector((state) => state.persistedReducer.member.memNo);
  const accessToken = useSelector(
    (state) => state.persistedReducer.accessToken
  );

  const onClick = (cafeNo) => {
    setCafeNo(cafeNo);
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
      axios.get(`${url}/member/wishStoreList/${memNo}?page=${currentPage-1}`, {
        headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setWishStoreList(res.data.data);
        setTotalPages(res.data.pageInfo.totalPages);
      })
      .catch((error) => {
        console.error("에러:" + error);
      });
  }, [cafeNo, currentPage]);
  
  useEffect(() => { // 디테일 지도
    if (showModal && cafeNo !== 0) {
      axios.get(`${url}/map/${cafeNo}`)
      .then((res) => {
        console.log(res.data.lat + "안됨")
        setSelectCafe(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }, [cafeNo]);

  useEffect(() => {
    if (showModal && cafeNo !== 0 && selectCafe && selectCafe.lat && selectCafe.lng) {
      const mapContainer = document.getElementById("mapView2");
      const mapOption = {
        center: new kakao.maps.LatLng(selectCafe.lat, selectCafe.lng),
        level: 3,
      };
      const map = new kakao.maps.Map(mapContainer, mapOption);
      const markerPosition = new kakao.maps.LatLng(selectCafe.lat, selectCafe.lng);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    }
  }, [showModal, cafeNo, selectCafe]);

  return (
    <div className="wishStore-container">
      <UserSideTab />
      <div className="wishStore-list">
        <div className="wishStore-title">
          <img src="/img/star.png" alt="" /> <span> 찜한 가게 </span>
        </div>
          <div>
            {wishStoreList.length !== 0 &&
                wishStoreList.map((store, index) => (
                <span className="wishStore-stores" key={index} onClick={() => onClick(store.cafeNo)}>
                <img src={store.thumbImg} alt=""/>
                <div className="image-text">{store.cafeName}</div>
                {index % 4 === 3 ? (<><br /></>) : ("")}
                </span>
            ))}
          </div>

        {showModal && selectCafe && (
          <div className="modalBox">
              <img className="closeBtn" onClick={closeModal} src="/img/X.png" alt=""/>
            <div className="cafeModalContent">

              <div className='modalMap'>
                <div id="mapView2"></div>
                <MapCafeInfo wishModal={true} selectCafe={selectCafe} wishCafeNo = {cafeNo}/>
              </div>
            </div>
          </div>
        )}
              
      </div>
    </div>
  );
};

export default WishStore;
