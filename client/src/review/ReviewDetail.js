import React, { useEffect, useState } from "react";
import "./reviewDetailStyle.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

const { kakao } = window;

const ReviewDetail = ({ modalDetail, wishReviewNo }) => {
  const [review, setReview] = useState(null);
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState(""); //댓글 내용 state
  const [replies, setReplies] = useState([]); //새로운 replies 상태 추가
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [wish, setWish] = useState(false);
  const memNo = useSelector(state => state.persistedReducer.member.memNo);
  const { state } = useLocation();
  const listReviewNo = state && state.reviewNo ? state.reviewNo : null;
  const reviewNo = (wishReviewNo !== null && wishReviewNo !== undefined) ? wishReviewNo : listReviewNo;
  const [pageInfo, setPageInfo] = useState({
    currentPage:1,
    repliesPerPage:10,
    startPage:1,
    endPage:1,
    totalPages:1
})

  const showSwal = (title) => {
    Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1500
    }).fire({
      icon: 'warning',
      title: title || '로그인이 필요합니다'
    })
  };

  const ReviewDelete = () => {
    const navigate = useNavigate();

    axios
      .delete(`http://localhost:8080/review/${reviewNo}/delete`)
      .then((res) => {
        Swal.fire({
          text: '리뷰가 삭제되었습니다',
          icon: 'success',
          confirmButtonText: '확인',
        }).then(() => {
          navigate("/reviewList"); // 페이지 이동
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'error',
          text: '리뷰를 삭제하는 중에 오류가 발생했습니다',
          icon: 'error',
          confirmButtonText: '확인',
        });
      });
  };

  const showReplyClick = () => {
    setShowReply(!showReply);
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = () => {
    //등록 버튼 클릭 시 댓글 등록 요청
    axios
      .post(`http://localhost:8080/replyWrite/${reviewNo}`, {
        content: replyContent,
      })
      .then((res) => {
        //댓글 등록 성공 시 추가 작업
        console.log("댓글이 성공적으로 등록되었습니다");
        setReplyContent("");
        fetchReplies();
      })
      .catch((error) => {
        console.error("댓글 등록 에러", error);

        // 에러 응답이 있을 경우 출력
        if (error.response) {
          console.error("응답 데이터:", error.response.data);
          console.error("응답 상태 코드:", error.response.status);
          console.error("응답 헤더:", error.response.headers);
        } else if (error.request) {
          // 요청이 전송되었지만 응답을 받지 못한 경우
          console.error("요청이 전송되었지만 응답을 받지 못했습니다.");
        } else {
          // 요청을 설정하는 과정에서 에러가 발생한 경우
          console.error("요청을 설정하는 과정에서 에러가 발생했습니다.", error.message);
        }
      });
  }

  const fetchReplies = () => {
    axios
      .get(`http://localhost:8080/reply/${reviewNo}/list`, {
        params: {
          page: pageInfo.currentPage - 1,
          size: pageInfo.repliesPerPage,
        },
      })
      .then((res) => {
          setReplies(res.data.content);
          let totalPages = res.data.totalPages;                ;
          let startPage = Math.floor((pageInfo.currentPage-1)/pageInfo.repliesPerPage)+1;
          let endPage = Math.min(startPage+pageInfo.repliesPerPage-1, totalPages);
          console.log(totalPages)
          console.log(startPage)
          console.log(endPage)
          setPageInfo({...pageInfo, startPage:startPage, endPage:endPage, totalPages:totalPages})
      })
      .catch((error) => {
        if (error.response) {
          // 서버 응답이 왔지만 에러 상태인 경우
          console.error("Server responded with error status:", error.response.status);
          console.error("Error response data:", error.response.data);
        } else if (error.request) {
          // 서버 응답을 받지 못한 경우
          console.error("No response received from the server.");
        } else {
          // 요청을 보낼 때 에러가 발생한 경우
          console.error("Error while sending the request:", error.message);
        }
      });
  };

  const handlePageChange = (pageNumber) => {
    setPageInfo({...pageInfo, currentPage:pageNumber});
  }

  const [reReplyContent, setReReplyContent] = useState("");

  const handleReReplyChange = (e) => {
    setReReplyContent(e.target.value);
  }

  const handleReReplySubmit = () => {
    if (selectedReply) {
      axios
        .post(`http://localhost:8080/reply/${selectedReply.replyNo}/reReply`, {
          content: reReplyContent,
          writerNo: 123, //하드코딩. 수정 필요
          likeCount: 0, //하드코딩. 수정 필요
        })
        .then((res) => {
          console.log("대댓글이 성공적으로 등록되었습니다.");
          setReReplyContent("");
          fetchReplies();
        })
        .catch((error) => {
          console.error("대댓글 등록 에러", error);
        });
    } else {
      console.error("댓글을 선택해주세요.");
      return; //대댓글을 등록할 댓글을 선택하지 않은 경우 함수 종료
    }
  };

  const [selectedReply, setSelectedReply] = useState(null);

  const handleReplyClick = (reply) => {
    setSelectedReply(reply);
    setShowReply(!showReply);
  }

  const handleReplyDelete = (replyNo) => {
    axios
      .delete(`http://localhost:8080/replyDelete/${replyNo}`)
      .then((res) => {
        console.log("댓글이 성공적으로 삭제되었습니다.");
        const updateReplies = replies.filter(reply => reply.replyNo !== replyNo);
        setReplies(updateReplies);
      })
      .catch((error) => {
        console.log("댓글 삭제 에러", error);
      });
  };

  const toggleLike = () => {
    if (memNo !== undefined) {
      axios.post(`http://localhost:8080/like/${memNo}/${reviewNo}`)
        .then((res) => {
          setLike(res.data.toggleLike);
          setLikeCount(res.data.likeCount);
          console.log(res.data);
        })
        .catch((error) => {
          console.error("에러:" + error);
        });
    } else {
      showSwal()
    }
  }
  const toggleWish = () => {
    if (memNo !== undefined) {
      axios.post(`http://localhost:8080/wish/${memNo}/${reviewNo}`)
        .then((res) => {
          setWish(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.error("에러:" + error);
        });
    } else {
      showSwal()
    }
  }

  useEffect(() => { // 디테일 가져오기
    axios
      .get(`http://localhost:8080/review/${reviewNo}`, { headers: { memNo } })
      .then((res) => {
        setReview(res.data.review);
        setLike(res.data.isLike);
        setWish(res.data.isWish);
        setLikeCount(res.data.review.likeCount);
        // console.log(res.data);
      })
      .catch((error) => {
        console.error("에러:" + error);
      });

    fetchReplies();
  }, [pageInfo.currentPage]); // currentPage가 변경될 때마다 useEffect가 실행

  useEffect(() => { // 디테일 지도
    if (review && review.lat && review.lng) {
      const mapContainer = document.getElementById("detailMap"),
        mapOption = {
          center: new kakao.maps.LatLng(review.lat, review.lng),
          level: 3,
        };
      const map = new kakao.maps.Map(mapContainer, mapOption);
      const markerPosition = new kakao.maps.LatLng(review.lat, review.lng);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    }
  }, [review]);

  return (
    <div className={!modalDetail ? "reviewDetail-bgBox" : "modalBox"}>
      {review && (
        <div className={!modalDetail ? "reviewBox" : "reviewModalContent"}>
          <div className="reviewContent">
            <p className="detailTitle">{review.title}</p>
            {/* <div className="detailLine" /> */}

            <div className="detailInfo">
              <div className="infoL">
                <p>
                  <img src="/img/house.png" alt="house" />
                  {review.cafeName}
                </p>
                <p>{review.tagNames.map((tag, i) => <span key={i}>#{tag}&nbsp;</span>)}</p>
              </div>
              <div className="infoR">
                <span>{review.nickname}</span>&nbsp;|&nbsp;
                <span>추천 {likeCount}</span>
                <p>{review.regDate}</p>
              </div>
            </div>
            <div className="detailContent">{review.content}</div>

            <div id="detailMap"></div>

            {!modalDetail && ( // wishReviewList 모달 띄울 때 차별화 위해!
              <><div className="starNheart">
                <img src={wish ? "/img/y_star.png" : "/img/n_star.png"} alt="star" onClick={toggleWish} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <img src={like ? "/img/y_heart.png" : "/img/n_heart.png"} alt="heart" onClick={toggleLike} />
              </div><div className="detailBtnBox">
                  <div className="Gbtn">수정</div>

                  <div className="Obtn" onClick={ReviewDelete}>삭제</div>
                </div><div className="detailLine" />


            {/* 댓글 */}
                <div className="reply">
                  <input type="text" name="reply" value={replyContent} onChange={handleReplyChange} />
                  <button className="Gbtn" onClick={handleReplySubmit}>등록</button>
                </div></>
            )}

            <div className="detailLine" />

            {/* 댓글 목록 출력 */}
            {replies.map((reply) => (
              <div key={reply.replyNo} className="replyInfo">
                <div className="infoT">
                  <p>
                    <img src="/img/house.png" alt="house" /> {reply.nickname}
                  </p>
                  <p>
                    <span className="underline" onClick={() => handleReplyDelete(reply.replyNo)}>삭제</span>&nbsp;&nbsp;
                    <span className="underline" onClick={showReplyClick}>
                      답글
                    </span>
                    &nbsp;&nbsp;
                    <span>♡ nn</span>
                  </p>
                </div>
                <div className="infoB">
                  <p>
                    {/* <img src="/img/best.png" alt="best" /> */}
                    {reply.content}
                  </p>
                  <p>{reply.regDate}</p>
                </div>
                <div className="detailLine" />
              </div>
            ))}

            {/* 대댓글 */}
            {showReply && (
              <>
                <div className="reply comment">
                  <img src="/img/reply.png" alt="reReply" />
                  <input type="text" name="reply" onChange={handleReReplyChange} />
                  <div className="Gbtn" onClick={() => selectedReply && handleReReplySubmit(selectedReply.replyNo)}>
                    등록
                  </div>
                </div>

                {/* 대댓글 목록 */}
                {selectedReply && selectedReply.replies && selectedReply.replies.length > 0 && (
                  <div className="reReplyInfo">
                    {selectedReply.replies.map((reReply) => (
                      <div key={reReply.replyNo} className="infoB comment">
                        <p>{reReply.content}</p>
                        <p>{reReply.regDate}</p>
                      </div>
                    ))}
                    <div className="detailLine" />
                  </div>
                )}
              </>
            )}

            <div className="reviewDetail-pagination">
              <ul className="pagination">
                <li className={`page-item ${pageInfo.currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(pageInfo.currentPage - 1)}>&lt;</button>
                </li>
                {Array.from({ length: Math.ceil(pageInfo.endPage - pageInfo.startPage + 1) }, (_, index) => (
                  <li key={index} className={`page-item ${pageInfo.currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(index+pageInfo.startPage)}>{index+pageInfo.startPage}</button>
                  </li>
                ))}
                <li className={`page-item ${pageInfo.currentPage === pageInfo.endPage ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(pageInfo.currentPage + 1)}>&gt;</button>
                </li>
              </ul>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewDetail;
