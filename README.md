# [Portfolio] TAMBURINS
제가 좋아하는 브랜드인 "템버린즈" 웹사이트를 클론 코딩 해봤습니다 <br/>
배포 : https://d3bjt2w4sdlfro.cloudfront.net
<br/>(클라우드 타입에 서버 배포를 했는데, 느려서 로딩 속도에 문제가 있습니다. 양해부탁드립니다.)

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Light%20Bulb.png" alt="Light Bulb" width="3%" />클론 코딩을 한 이유?
처음 사이드 프로젝트를 진행하게 되면서, 즐겁게 무엇을 만들 수 있을까라는 고민을 하게 되었습니다. 많은 서비스들 중에 일상생활에서 쉽게 접할 수 있는 서비스를 따라해보고 싶어, 평소에 좋아하는 브랜드인 템버린즈 사이트를 클론하게 되었습니다.

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Gear.png" alt="Gear" width="3%" />사용한 기술 스택?

- 프론트엔드 : React, Redux, ReactQuery, AWS S3 cloudfront(배포)
- 백엔드 : Node.js, Express, Firebase Auth, MongoDB Atlas, cloudtype(서버)

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Gear.png" alt="Gear" width="3%" />주요 기능?

- 회원가입, 로그인(파이어베이스)
- 메인페이지 상품 리스트 조회
- 상세페이지 상품 정보 조회
- 상품 제목 검색 기능
- 장바구니에 상품 추가,수정,삭제
- 반응형 웹사이트

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Smileys/Face%20Holding%20Back%20Tears.webp" alt="Face Holding Back Tears"  width="3%"  /> 가장 많이 고민한 Top3 ?

#### 1. 이미지 호스팅<br/>

| | 첫번째 방식 | 수정한 방식 | ✅ 최종 채택 방식 |
| ----- | --- | --- | --- |
|데이터 조합 | 파이어베이스 | 몽고디비+구글드라이브 | 몽고디비 + base64|
| 발생한 문제 |무료로 제공하는 호출 횟수 소진  | 이미지 호스팅 속도 느림 | |
|해결 방식| DB 바꾸기| 이미지를 base64사용하여 인코딩|🪄해결!

###### 상세 설명
프로젝트를 시작하며, 처음에는 파이어베이스를 사용하여 데이터를 불러왔습니다.<br/> 
초보 개발자로서 데이터가 제대로 불러와지는지 확인하는 과정에서 파이어베이스에서 무료로 제공하는 호출을 금방 소진하게 되었습니다. <br/> 
이를 해결하기 위해, 필요한 이미지들을 구글 드라이브에 저장하고, MongoDB에 해당 이미지의 구글 드라이브 URL을 저장하는 방식을 선택하였습니다. 이렇게 함으로써 데이터를 원하는 만큼 불러올 수 있게 되었지만, 이미지 호스팅에 속도 문제가 생기게 되었습니다. <br/> 
고민하다가, 이미지를 직접 인코딩하여 DB에 저장하는 방식을 도입하였는데, 이를 통해 이미지 호스팅의 속도 문제를 성공적으로 해결할 수 있었습니다.

#### 2. 스타일드 컴포넌트 적용 기준 설정하고 활용하기 <br/>

| ✅ 나만의 설정 기준|
| --- | 
|재사용성이 높은 UI (커스텀 컴포넌트) <br/> - props을 활용하여 컴포넌트 상태에 따라 스타일링|
| Page 형식이 아닌 단독 컴포넌트  <br/>  - 예 ) 아코디언 메뉴, 레이아웃, 모달창 등등|

###### 상세 설명
UI에 대한 깊은 관심을 가지고 있어, 스타일드 컴포넌트의 활용 가능성을 최대한 끌어올리고 싶었습니다. 그래서 이번 프로젝트에서는 스타일드 컴포넌트를 효과적으로 활용하기 위한 적용 기준을 설정하고 적용해보기로 결정하였습니다.


####  3. 유효성 검사 with <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=React Hook Form&logoColor=61DAFB"/>

로그인 및 회원가입 기능을 구현함에 있어서는 유효성 검사가 필수적인 요소입니다. <br/>
비록 개발자로서 자신만의 세부적인 코드로 구현하는 방법이 가능하다 하더라도, 새로운 기술과 효율적인 기술이 존재한다면 이를 활용해보는 것이 좋다고 생각하게 되었습니다. <br/>이러한 고민 과정을 통해, "react hook form"기술을 알게 되어 적용해보기로 결정하였습니다.
