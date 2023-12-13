import React, { useState } from 'react';
import '../userMyPage/UserInfoStyle.css';
import StoreSideTab from '../components/StoreSideTab';

const StoreUserInfo = () => {

  const [pwInput, setPwInput] = useState('');
  const [userInfo, setUserInfo] = useState({id:'sooba', name:'조수빈', email:'soobin@babo.com', nickname:'sooba', pw:'', newPw:''});
  const [editMode, setEditMode] = useState(false);

  const handleWithdrawal = () => {
    window.location.href = '/storeClose';
  };

  const edit = () => { // 수정버튼 클릭 시 input 입력 가능
    setEditMode(!editMode);
  }

  const save = () => { // 저장버튼 클릭 시 input readOnly
    setEditMode(false);
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  return (
    <div className='mypage'>
      <StoreSideTab />
      <div className='userInfoBox'>
        <div className='nicknameBox'>
          <p><img src="/img/house.png" alt="house" />조수빈 바보 님</p>
        </div>
        <div className='infoBox'>
          <div className='infoTitle'>
            <p>회원정보</p>
            {editMode ? (
              <p>
                <span onClick={save}>저장</span>
              </p>
            ) : (
              <p>
                <span onClick={edit}>수정</span>
              </p>
            )}
          </div>
          <div className='infoContent' style={{ flexDirection: "column", alignItems: "stretch" }}>
            <div>
              <p>아이디</p>
              <input type="text" name="id" value={userInfo.id} readOnly={!editMode} className="inputN" />
              <span></span>
            </div>
            <div>
              <p>이름</p>
              <input type="text" name="name" value={userInfo.name} readOnly={!editMode} onChange={inputChange} className={editMode ? 'inputB' : 'inputN'} />
              <span>이름유효성 넣을 부분</span>
            </div>
            <div>
              <p>이메일</p>
              <input type="text" name="email" value={userInfo.email} readOnly={!editMode} onChange={inputChange} className={editMode ? 'inputB' : 'inputN'} />
              <span>이메일유효성 넣을 부분</span>

            </div>
            <div>
              <p>닉네임</p>
              <input type="text" name="nickname" value={userInfo.nickname} readOnly={!editMode} onChange={inputChange} className={editMode ? 'inputB' : 'inputN'} />
              <span>닉네임유효성 넣을 부분</span>
            </div>
            <div>
              <p>전화번호</p>
              <input type="text" name="phone" value={userInfo.phone} readOnly={!editMode} onChange={inputChange} className={editMode ? 'inputB' : 'inputN'} />
              <span></span>
            </div>
          </div>
        </div>
        
        <div className='pwBox'>
                <div className='pwTitle'>
                    <p>비밀번호 수정</p>
                    <span onClick={save}>저장</span>
                </div>
                <div className='pwContent'>
                    <div>
                        <p>현재 비밀번호</p>
                        <input type="password" name="pw" value={userInfo.pw} onChange={inputChange} />
                        <span>비밀번호 유효성 넣을 부분</span>
                    </div>
                    <div>
                        <p>변경할 비밀번호</p>
                        <input type="password" name="newPw" value={userInfo.newPw} onChange={inputChange} />
                        <span>비밀번호 유효성 넣을 부분</span>
                    </div>
                </div>
            </div>
            <div className='resign'  onClick={handleWithdrawal}>탈퇴</div>

      </div>
    </div>
  );
}

export default StoreUserInfo;
