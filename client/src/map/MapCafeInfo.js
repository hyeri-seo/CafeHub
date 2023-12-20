import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem, PaginationLink, Table } from "reactstrap";
import Swal from "sweetalert2";

const MapCafeInfo = ({ selectCafe, setSelectCafe, wish, setWish, wishModal, wishCafeNo }) => {
  const memNo = useSelector(state=>state.persistedReducer.member.memNo);
  const [reviewList, setReviewList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const cafeNo = selectCafe?.cafeNo || wishCafeNo;
  
  // null이 아닌 정보만 띄울 수 있게 만들기
  const cafeInfo = (src, text) => {
      return text !== null && text !== "" ? (
        <div className="infoContentBox">
          <img src={src} alt="" />
          <div className="infoName">{text}</div>
        </div>
      ) : null;
    };
    
    const nextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

   useEffect(() => { 
    if(selectCafe !== null) {
      axios.get(`http://localhost:8080/review/storeList/${cafeNo}?page=${currentPage}&size=5`)
      .then((res) => {
        console.log(res.data);
        setReviewList(res.data.data);
        setTotalPages(res.data.pageInfo.totalPages);
      })
      .catch((error) => {
        console.error("에러:" + error);
      }); 
    }
   }, [selectCafe, currentPage])

  const toggleWish = () => {
    if (memNo !== undefined) {
      axios.post(`http://localhost:8080/cafeWish/${memNo}/${selectCafe.cafeNo}`)
      .then((res) => {
        setWish(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("에러:" + error);
      });
    } else {
        Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 1500
        }).fire({
          icon: 'warning',
          title: '로그인이 필요합니다'
        })
      };
    }

  return (
    <div style={{ flex: selectCafe ? 1 : 0}}>
    {selectCafe && (
      <div className={!wishModal ? "map_box" : "modalCafe"}>
        {!wishModal && (
          <img
            className="x"
            src="/img/X.png"
            alt="close"
            onClick={() => setSelectCafe(null)}
          />
        )}

        <div className="storebox">
          <img src={wish ? "/img/y_star.png" : "/img/n_star.png"} alt="star" onClick={toggleWish} />
          <span>{selectCafe.cafeName}</span>
        </div>
        
        {selectCafe.thumbImg !== null ? ( 
          <div className="storeImg">
            <img src={selectCafe.thumbImg} alt="" />
          </div>
        ) : null}
        <div className="storeLine" />
        <div className="store_content">
          {cafeInfo('/img/pin.png', selectCafe.address)}
          {cafeInfo('/img/phone.png', selectCafe.tel)}
          {cafeInfo('/img/clock.png', selectCafe.operTime)}
          {cafeInfo('/img/store.png',selectCafe.tagName)}
          {cafeInfo('/img/bean.png',selectCafe.cafeInfo)}
        </div>

        <div className="store_review">
            <div className="review"><img src="/img/review.png" alt=""/>리뷰</div>
            {reviewList.length > 0 ? (
            <Table hover>
              <div className="maplistbox">
                <tbody>
                  <br />
                  {reviewList.map((review, index) => (
                  <tr key={index}>
                    <Link to={`/reviewDetail/${review.reviewNo}`} state={{ reviewNo: `${review.reviewNo}` }} >
                    <div className="map-list">
                      <img className="map-listImg" src={review.thumbImg} alt="" />
                      <div className="map-listTitle">
                      {review.title}
                        <div className="map-writeInfo">{review.nickName}</div>
                      </div>

                      <div className="map-dateTime">{review.regDate}</div>
                    </div>
                    </Link>
                  </tr>
                  ))}
                  <tr></tr>
                </tbody>
              </div>
              <div className="pagination-container">
                  <Pagination>
                    <PaginationItem disabled={currentPage === 1}>
                      <PaginationLink previous onClick={prevPage} />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index} active={currentPage === index + 1}>
                          <PaginationLink onClick={() => setCurrentPage(index + 1)}>
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    <PaginationItem disabled={currentPage === totalPages}>
                      <PaginationLink next onClick={nextPage} />
                    </PaginationItem>
                  </Pagination>
              </div>
            </Table>
             ) : (
              <div className="noReviewList">등록된 리뷰가 없습니다.</div>
            )}
        </div>
      </div>
    )}
  </div>
  )};
        

export default MapCafeInfo;
