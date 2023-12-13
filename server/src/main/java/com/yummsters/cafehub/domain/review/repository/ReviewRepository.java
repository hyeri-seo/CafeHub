package com.yummsters.cafehub.domain.review.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.yummsters.cafehub.domain.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
	//수빈 part ----------------------------------------------------------------
	Review findByReviewNo(Integer reviewNo);
  //혜리 part ----------------------------------------------------------------
  Page<Review> findAllByTitleContainsOrderByReviewNoDesc(String title, Pageable pageable);
  Page<Review> findAllByCafe_CafeNo(PageRequest pageRequest, Integer cafeNo);
}
