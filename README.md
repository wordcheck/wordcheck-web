# 워드체크(WordCheck)

<i>영단어 기록, 시험, 오답노트 서비스</i>
<br>

## 1. 진행 기간

진행 기간 : 12월 23일 ~ 1월 31일

## 2. 기능소개

공부할 단어를 그룹별로 구분하여 나만의 단어장을 만들 수 있습니다.  
무작정 단어만 보면서 외우는 것이 아닌 다양한 퀴즈를 통해 재미있고 자연스럽게 영어단어를 외울 수 있습니다.  
TTS를 통해 단어의 정확한 발음을 들으며 공부할 수 있습니다.

## 3. 적용기술

- [React](https://ko.reactjs.org/)

- [axios](https://www.npmjs.com/package/axios)

- [react-router-dom](https://www.npmjs.com/package/react-router-dom)

- [styled-components](https://styled-components.com/)

- [Material Ui](https://mui.com/)

- [react-speech-kit](https://www.npmjs.com/package/react-speech-kit)

- [react-lottie](https://www.npmjs.com/package/react-lottie)

## 4. 주요 구현기능

- (1) 로그인/회원가입 기능

<p float="left">
 <img src="https://user-images.githubusercontent.com/49505843/152646257-7651c5ed-93de-4bc3-8ca7-7faef690488b.png" width="200" height="380">
 <img src="https://user-images.githubusercontent.com/49505843/152646257-7651c5ed-93de-4bc3-8ca7-7faef690488b.png"  width="200" height="380">
</p>

axios 통신 라이브러리를 사용해 유저가 로그인을 성공했을 때 서버에서 토큰 값을 받아와 쿠키에 저장시킨 후 home 창으로 이동될 수 있도록 했습니다.  
로그인 실패 시 toast로 알림 창을 띄워줬습니다.

- (2) 단어 추가 기능

<img src="https://user-images.githubusercontent.com/49505843/152646595-29fa8a58-de39-477f-80dc-096207654a1e.png"  width="200" height="380">
 
한 컨텐츠 내에서 여러 단어를 한번에 저장할 수 있도록 만들었습니다.  
`+ 단어카드 추가하기`버튼을 누르면 단어를 추가할 수 있는 div가 생성 됩니다.  
추가 버튼을 누르면 `inputData`(빈 배열)이 `wordList`기존 배열에 추가됩니다.  
이후 `만들기`버튼을 누르면 `Promise.all()`으로 단어 배열이 서버에 추가됩니다.

```jsx
const onClickCardAddHandler = () => {
  let WordInputs = [...wordList];
  WordInputs.push(inputData);
  setWordList(WordInputs);
};

const onClickConfirmAnswerHandler = (ans) => {
  const formData = new FormData();
  // 모달에서 user의 answer가 true라면 단어배열 추가
  if (ans) {
    Promise.all(
      wordList.map((wordList) => {
        formData.append("contents", wordList.contents);
        formData.append("spelling", wordList.spelling);
        formData.append("category", wordList.category);
        formData.append("meaning", wordList.meaning);
        return axios.post(`${process.env.REACT_APP_API}words/`, formData, {
          headers: {
            Authorization: cookies.token,
          },
        });
      })
    )
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        //단어 추가 실패시 실패 토스트
        setFailAlert(true);
      });
  } else {
    //user의 answer가 false라면 모달 해제
    setConfirm(false);
  }
};
```

(3) 시험 기능

< 시험선택 페이지 >

시험선택 페이지에서 원하는 시험을 선택해 시험을 볼 수 있습니다.  
사지선다 보기는 정답 단어 1개와 이외 틀린단어 3개를 랜덤으로 가져와 보여줄 수 있도록 했습니다.

(4) 마크북 기능

<마크북 이미지>

- 별 아이콘을 눌러 마크북에 단어를 저장할 수 있습니다.
- 마크북은 로컬 스토리지에 저장되어 오프라인 환경에서도 마크북 단어를 확인할 수 있습니다.

(5) 검색기능

< 검색 이미지 >
