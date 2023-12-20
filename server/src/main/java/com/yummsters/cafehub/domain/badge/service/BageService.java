package com.yummsters.cafehub.domain.badge.service;

import java.util.List;

import com.yummsters.cafehub.domain.badge.dto.MemberBadgeDto;
import com.yummsters.cafehub.domain.badge.entity.Badge;
import com.yummsters.cafehub.domain.badge.entity.MemberBadges;

public interface BageService {
	
	List<MemberBadges> getBadge(Integer memNo)throws Exception; 
	MemberBadges buyBadge(Integer memNo, Integer badgeNo) throws Exception;
	public MemberBadges pickBadge(Integer memNo, Integer badgeNo) throws Exception;
	MemberBadgeDto getMemberBadge(Integer memNo) throws Exception;
	 public void assignBadge(Integer memNo, Badge badge) throws Exception;
}
