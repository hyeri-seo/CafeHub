package com.yummsters.cafehub.domain.member.controller;

import com.yummsters.cafehub.domain.member.dto.*;
import com.yummsters.cafehub.global.auth.userdetails.PrincipalDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.yummsters.cafehub.domain.member.entity.Member;
import com.yummsters.cafehub.domain.member.mapper.MemberMapper;
import com.yummsters.cafehub.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberMapper mapper;
    private final MemberService memberService;

    // 아이디 중복 체크
    @GetMapping("/id/{id}")
    public ResponseEntity<Object> idCheck(@PathVariable String id){
        try{
            return new ResponseEntity(memberService.existId(id), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // 이메일 중복 체크
    @GetMapping("/email/{email}")
    public ResponseEntity<Object> emailCheck(@PathVariable String email){
        try{
            return new ResponseEntity(memberService.existEmail(email), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // 닉네임 중복 체크
    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<Object> nicknameCheck(@PathVariable String nickname){
        try{
            return new ResponseEntity(memberService.existNickname(nickname), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // 사용자 회원가입
    @PostMapping("/signUpUser")
    public ResponseEntity<Object> signUpUser(@RequestBody SignUpReqDto requestDto){
        Member member = mapper.signUpReqDtoToMember(requestDto);
        try{
            member = memberService.existMember(member);
            SignUpResDto memberResponse = mapper.memberToSignUpResDto(member);
            return new ResponseEntity<>(memberResponse, HttpStatus.CREATED);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // 토큰에 따른 Member 가져오기
    @GetMapping("/member")
    public ResponseEntity<Object> member(Authentication authentication){
        Member member = ((PrincipalDetails) authentication.getPrincipal()).getMember();
        System.out.println(member.toString());
        TokenResDto memberResponse = mapper.memberToTokenResDto(member);
        return new ResponseEntity<>(memberResponse, HttpStatus.OK);
    }

    // 사장, 사용자(소셜x) 회원 탈퇴
    @PostMapping("/member/delete/normal/{memNo}")
    public ResponseEntity<Object> deleteNormalMember(@PathVariable Integer memNo, @RequestBody DeleteReqDto requestDto){
        Member member = mapper.deleteReqDtoToMember(requestDto);
        try{
            boolean deleteResult = memberService.deleteMember(memNo, member.getPassword());
            return new ResponseEntity<>(deleteResult, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // 소셜 회원 탈퇴
    @PostMapping("/member/delete/social/{memNo}")
    public ResponseEntity<Object> deleteSocialMember(@PathVariable Integer memNo, @RequestBody DeleteSocialDto requestDto){
        Member member = mapper.deleteSocialReqDtoToMember(requestDto);
        try{
            // 서비스 이메일에 맞게 수정 필요
            boolean deleteResult = memberService.deleteSocialMember(memNo, member.getEmail());

            // deleteResult가 true일 경우 api를 이용한 탈퇴 구현 진행할 예정이라면 로직 추가 필요

            return new ResponseEntity<>(deleteResult, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // 휴대폰 번호로 회원 조회
    @GetMapping("/member/phone/{phone}")
    public ResponseEntity<Object> phoneSearch(@PathVariable String phone){
        try{
           Member member = memberService.phoneSearch(phone);
            return new ResponseEntity<>(member.getMemNo(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // 선진 part ----------------------------------------------------------------
    @GetMapping("/searchId")
    public ResponseEntity<String> idSearch(@RequestParam String name,
                                           @RequestParam String phone) {
        try {
            String memberId = memberService.searchId(name, phone);
            return new ResponseEntity<>(memberId, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/member/modifyInfo")
    public ResponseEntity<Object> userInfoModify(@RequestBody ModifyReqDto modifyReqDto) {
        Member member = mapper.modifyReqDtoToMember(modifyReqDto);
        try {
            member = memberService.modifyMember(member);
            ModifyResDto modifyResDto = mapper.memberToModifyResDto(member);
            return new ResponseEntity<>(modifyResDto, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
