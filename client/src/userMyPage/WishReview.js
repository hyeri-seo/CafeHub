import ReviewDetail from '../review/ReviewDetail';
import wishReviewStyle from './wishReviewStyle.css';
import { useState } from 'react';
import UserSideTab from '../components/UserSideTab';

const WishReview = () =>{
    const [wishReviewList, setWishReviewList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [showModal, setShowModal] = useState(false);
    const [showReply, setShowReply] = useState(false);
    const showReplyClick = () => {
        setShowReply(!showReply);
    }

    const modalToggle = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="wishReview-container">
             <UserSideTab/>
            <div className='wishReview-list'>
                <div className='wishReview-title'>
                    <img src="/img/star.png" alt='' /> <span> 찜한 리뷰 </span>
                </div>
                {wishReviewList.length !== 0 &&
                    wishReviewList.map((store, index) => (
                        <span className='wishReview-reviews' key={index} onClick={modalToggle}>
                            <img src="/img/Review1.png" alt=''/>
                            <p className="image-text">우드슬랩</p>
                            {index % 4 === 3 ? <><br /></> : ""}
                        </span>
                        
                    ))}
                    <div className='wishreview-pagination'>
                        <div className='wishreview-prevPage'>&lt;</div>
                        <div className='wishreview-page'>1 2 3 맵사용해~</div>
                        <div className='wishreview-nextPage'>&gt;</div>
                    </div>
            </div>
            {showModal && (
            <div className="modalBox"> {/*  onClick={modalToggle} */}
            <div className='reviewModalContent'>
            <p className='closeBtn'><img src="/img/X.png" alt="x" onClick={modalToggle}/></p>
                
                {/* 디테일 */}

                <div className='reviewBox' style={{width:"100%"}}>
                    <div className='reviewContent'>
                        <p className='detailTitle' style={{paddingTop:"5px"}}>수빈바보</p>   <hr className='detailLine'/>

                                <div className='detailInfo'>
                                    <div className='infoL'>
                                        <p><img src="/img/house.png" alt="house" /> 카페명</p>
                                        <p>#고양이 카페 #이색 카페</p>
                                    </div>
                                    <div className='infoR'>
                                        <span>닉네임</span>&nbsp;|&nbsp;
                                        <span>추천nn</span>
                                        <p>2023.11.14 07:10</p>
                                    </div>
                                </div>
                                <div className='detailContent'>
                                    <img src="/img/sample.png" alt="sample" style={{width:"100%"}} />
                                </div>

                                <hr className='detailLine'/>

                                <div className='replyInfo'>
                                    <div className='infoT'>
                                        <p><img src="/img/house.png" alt="house" /> 닉네임 (뱃지 임시)</p>
                                        <p>
                                            <span className='underline'>삭제</span>&nbsp;&nbsp;
                                            <span className='underline' onClick={showReplyClick}>답글</span>&nbsp;&nbsp;
                                            <span>♡ nn</span>
                                        </p>
                                    </div>
                                    <div className='infoB'>
                                        <p><img src="/img/best.png" alt="best"/>댓글 내용 와라라라라랄ㄹㄹ</p>
                                        <p>2023.11.15 13:32</p>
                                    </div>
                                    <hr className='detailLine'/>
                                </div>
                                
                                {showReply && (
                                <>
                                    <div className='reply comment'>
                                        <img src="/reply.png" alt="reply" />
                                        <input type="text" name="reply" value=""/>
                                        <div className='Gbtn'>등록</div>
                                    </div>
                                    <hr className='detailLine'/>

                                    <div className='replyInfo'>
                                        <div className='infoT'>
                                            <p>
                                                <img src="/reply.png" alt="reply" />
                                                <img src="/house.png" alt="house" />닉네임 (뱃지 임시)
                                            </p>
                                            <p>♡ nn</p>
                                        </div>
                                        <div className='infoB comment'>
                                            <p>대댓글오라올아ㅗㄹ아량ㄴ량리ㅑㄴㅇ</p>
                                            <p>2023.11.15 13:32</p>
                                        </div>
                                        <hr className='detailLine'/>
                                    </div>
                                </>
                                )}

                                <div className='replyInfo'>
                                    <div className='infoT'>
                                        <p><img src="/house.png" alt="house" /> 닉네임 (뱃지 임시)</p>
                                        <p>
                                            {/* <span className='underline'>삭제</span>&nbsp;&nbsp; */}
                                            <span className='underline' onClick={showReplyClick}>답글</span>&nbsp;&nbsp;
                                            <span>♡ nn</span>
                                        </p>
                                    </div>
                                    <div className='infoB'>
                                        <p>댓글 내용 와라라라라랄ㄹㄹ</p>
                                        <p>2023.11.15 13:32</p>
                                    </div>
                                    <hr className='detailLine'/>
                                </div>
                                
                                <div className='wishreview-pagination'>
                                    <div className='wishreview-prevPage'>&lt;</div>
                                    <div className='wishreview-page'>1 2 3 맵사용해~</div>
                                    <div className='wishreview-nextPage'>&gt;</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WishReview;