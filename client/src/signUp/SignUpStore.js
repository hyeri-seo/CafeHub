import { useState, useRef, useEffect} from 'react';
import signUpStoreStyle from './signUpStoreStyle.css';
import axios from 'axios';
import Swal from 'sweetalert2';
const {daum} = window;

const SignUpStore = () =>{
    const [store, setStore] = useState({name:"", nickName:"", id:"", password:"", passwordCk:"", phone:"", email:"",
    storeName:"", storePhone:"", businessNo:"", location:"", time:""});
    const [picture, setPicture] = useState("");
    const [tagList, setTagList] = useState([
        '#카공',
        '#애견동반',
        '#TakoOut',
        '#노키즈존',
        '#베이커리',
        '#이색',
        '#커피전문',
        '#주류판매',
        '#감성'
    ]);

    const change = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setStore({...store, [name] : value});
    }

    const fileChange = (e) =>{
        const file = e.target.files[0];
        setPicture(file);

        // 업로드 로직은 아직
    }

    useEffect(()=>{
        const signUpStore = document.querySelector('.signUpStore');

        if (signUpStore) {
            window.addEventListener('scroll', function() {
                const scrollTop = window.scrollY;

                if (scrollTop > 30) {
                    signUpStore.style.top = `${scrollTop}px`;
                } else {
                    signUpStore.style.top = '20px';
                }

            });
        } else {
            console.error("Element with class 'signUpStore' not found.");
        }
    }, [])

    const searchAddr = () => { // 주소 입력
        new daum.Postcode({
            oncomplete: function(data) {
                // var roadAddr = data.roadAddress; // 도로명 주소 변수
                document.getElementById('location').value = data.address;
                Promise.resolve(data).then(o => {
                    const { address } = data;
                    return new Promise((resolve, reject) => {
                        const geocoder = new daum.maps.services.Geocoder();
                        geocoder.addressSearch(address, (result, status) =>{
                            if(status === daum.maps.services.Status.OK){
                                const { x, y } = result[0];
                                resolve({ lat: y, lon: x })
                            }else{
                                reject();
                            }
                        });
                    })
                }).then(result => {
                    console.log(result)
                    console.log(result.lat)
                    console.log(result.lon)
                });    
    
            }
        }).open();
    }

      // swal
    const toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 1500
    })

    const businessNo = () => { // 사업자번호 확인
        axios.post(`http://localhost:8080/business/${store.businessNo}`)
        .then((res) => {
            if(res.data.data[0].tax_type === "국세청에 등록되지 않은 사업자등록번호입니다.") {
                toast.fire({
                    title: '사업자 인증 실패!',
                    text: '다시 입력해주세요',
                    icon: 'error',
                })
            } else {
                toast.fire({
                    title: '사업자 인증 성공!',
                    text: '성공적으로 등록되었습니다',
                    icon: 'success',
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    console.log(store.location);

    return (
        <div className='signUpStore-container'>
          <div className='signUpStore-left-section'>
            <div className='signUpStore-title'>SignUp</div> <br/>
            <form>
            <div className='signUpStoreInputDiv'>
                <label>이름 <br/>
                <input type="text" id="name" name="name" onChange={change}/></label>
            </div> <br/>
            <div className='signUpStoreInputDiv'>
                <label>닉네임 <br/>
                <input type="text" id="nickName" name="nickName" onChange={change}/></label>
            </div> <br/>
            <div className='signUpStoreInputDiv'>
                <label>아이디 <span className='signUpStore-auth'>5~12자로 작성하세요</span><br/>
                <input type="text" id="id" name="id" onChange={change} /></label>
            </div> <br/>
            <div className='signUpStoreInputDiv'>
                <label>비밀번호<span className='signUpStore-auth'>소문자/숫자/특수문자 포함 5~12자로 작성하세요</span> <br/>
                <input type="password" id="password" name="password" onChange={change}/></label>
            </div> <br/>
            <div className='signUpStoreInputDiv'>
                <label>비밀번호 확인 <span className='signUpStore-auth'>비밀번호가 일치하지 않습니다</span><br/>
                <input type="password" id="passwordCk" name="passwordCk" onChange={change}/></label>
            </div> <br/>
            <div className='signUpStoreInputDiv-other'>
              <label> 휴대폰 번호  <span className='signUpStore-auth'> 휴대폰 번호를 확인하세요</span><br/>
              <input type="text" id="phone" name="phone" onChange={change}/></label>
            </div>
            <div className='searchStoreAuthNum'>
                <button type="button" > 휴대폰 <br/>인증 </button>
            </div> <br/>
            <div className='signUpStoreInputDiv'>
                <label>인증번호<span className='signUpStore-auth'>인증번호를 확인하세요</span><br/>
                <input type="text" id="authNum" name="authNum" onChange={change}/></label>
            </div> <br/>
            <div className='signUpStoreInputDiv'>
                <label>이메일<span className='signUpStore-auth'>이메일을 확인하세요</span><br/>
                <input type="text" id="email" name="email" onChange={change}/></label>
            </div> <br/>
            
            <div className='signUpStoreInputDiv'>
                <label>가게명 <br/>
                <input type="text" id="storeName" name="storeName" onChange={change}/></label>
            </div> <br/>
            <div className='signUpStoreInputDiv'>
                <label>가게 전화번호 <br/>
                <input type="text" id="storePhone" name="storePhone" onChange={change}/></label>
            </div> <br/>



            <div className='signUpStoreInputDiv-other'>
              <label> 사업자 번호 <span className='signUpStore-auth'> 하이픈(-)을 제외하고 입력하세요</span><br/>
              <input type="text" id="businessNo" name="businessNo" onChange={change}/></label>
            </div>
            <div className='searchStoreAuthNum'>
                <button type="button" onClick={businessNo}> 사업자 <br/> 인증 </button>
            </div> <br/>





            <div className='signUpStoreInputDiv-other'>
              <label> 위치 <br/>
              <input type="text" id="location" name="location" onChange={change}/></label>
            </div>
            <div className='searchStoreAuthNum'>
                <button type="button" onClick={searchAddr}> 위치 <br/>검색 </button>
            </div> <br/>
            <div className='signUpStoreInputDiv'>
                <label>운영시간 <br/>
                <input type="text" id="time" name="time" onChange={change}/></label>
            </div> <br/>

            <input type="file" id="picture" name="picture" onChange={fileChange} style={{ display: 'none' }}/>

            <div className='signUpStoreInputDiv-other'>
                <label> 썸네일 <br/>
                <input className="signUpStoreInput-text" type="text" id="picture" name="picture" value={picture ? picture.name : '사진을 선택하세요'} readOnly /></label>
            </div>

            <div className='searchStoreAuthNum'>
                <button type="button" onClick={() => document.getElementById("picture").click()}> 썸네일 <br/>선택 </button>
            </div><br/>

            <div className='SignUpStore-tag'>
            { tagList.length !== 0 &&
            tagList.map((tag, index)=>
            <span className='SignUpStore-tagList' key={index}>
                <button className='SignUpStore-tag1'id={`tag${index}`} name={tag}> {tag}  </button>
                {index % 3 ===2 ? <><br/></> : ""}
            </span>)}
                
            </div>

            <div className='signUpStore-button'>
                <button type="submit" > SignUp </button>
            </div> <br/>
            </form>
            </div>

          <div className='signUpStore-right-section'>
            <div className='signUpStore'>
                <div className='signUpStore-storeName'> {store.storeName ? store.storeName : '가게 이름'}</div>
                <div className='signUpStore-picture' > 
                {picture && <img src={URL.createObjectURL(picture)}  style={{width:"320px", height:"320px", borderRadius:"20px"}}alt="썸네일" />}
                </div>
                <div className='signUpStore-location'>{store.location ? store.location : '위치를 입력하세요.'}</div>
                <div className='signUpStore-time'>운영 시간 : {store.time ? store.time : '시간을 입력하세요.'}</div>
            </div>
          </div>
    </div>
    );
}


export default SignUpStore;