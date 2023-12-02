package com.yummsters.cafehub.domain.review.service;

import java.io.OutputStream;
import java.util.List;

import com.yummsters.cafehub.domain.review.entity.Review;
import org.springframework.web.multipart.MultipartFile;

import com.yummsters.cafehub.domain.review.dto.ReviewDto;

public interface ReviewService {

    // 선진 part ----------------------------------------------------------------------
    ReviewDto reviewDetail(Integer reviewNo) throws Exception; // 리뷰 상세 조회

    // 선진 part ----------------------------------------------------------------------

	Integer reviewWrite(ReviewDto review, List<MultipartFile> file) throws Exception;
	//썸네일 이미지
	void thumbImg(Integer reviewNo, OutputStream out) throws Exception;
	//카페리스트
//	ReviewDto cafeList(String writer) throws Exception;

}
