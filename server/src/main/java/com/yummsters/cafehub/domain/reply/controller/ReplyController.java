package com.yummsters.cafehub.domain.reply.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yummsters.cafehub.domain.reply.dto.ReplyDto;
import com.yummsters.cafehub.domain.reply.service.ReplyService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ReplyController {
	
	@Autowired
	private ReplyService replyService;
	
	@PostMapping("/replyWrite/{reviewNo}")
	public ResponseEntity<Integer> replyWrite(@PathVariable Integer reviewNo, @RequestParam String content) {
        try {
            replyService.replyWrite(reviewNo, content);
            return new ResponseEntity<Integer>(reviewNo, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Integer>(HttpStatus.BAD_REQUEST);
        }
    }

	@DeleteMapping("/replyDelete/{replyNo}")
	public ResponseEntity<Integer> replyDelete(@PathVariable Integer replyNo) {
		try {
			replyService.replyDelete(replyNo);
			return new ResponseEntity<Integer>(replyNo, HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Integer>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/replyLike/{memNo}/{replyNo}")
	public ResponseEntity<Object> isLikeReply(@PathVariable Integer memNo, @PathVariable Integer replyNo) {
		try {
			Map<String, Object> res = new HashMap<>();
			boolean isToggleLike = replyService.toggleLikeReply(memNo, replyNo);
			res.put("isToggleLike", isToggleLike);
			Integer likeCount = replyService.getLikeCount(replyNo);
			res.put("likeCount", likeCount);
			return new ResponseEntity<>(res, HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/reply/{reviewNo}/list")
	public ResponseEntity<List<ReplyDto>> getRepliesByReviewNo(@PathVariable Integer reviewNo) {
		try {
			List<ReplyDto> replies = replyService.getRepliesByReviewNo(reviewNo);
			return new ResponseEntity<>(replies, HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/reply/{replyNo}/reReply")
	public ResponseEntity<String> addReReply(@PathVariable Integer replyNo, @RequestBody ReplyDto replyDto) {
	    try {
	        replyService.addReReply(replyNo, replyDto);
	        return new ResponseEntity<>("대댓글 추가 완료", HttpStatus.CREATED);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new ResponseEntity<>("대댓글 추가 실패", HttpStatus.BAD_REQUEST);
	    }
	}
}
