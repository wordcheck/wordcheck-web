# 워드체크(WordCheck)

<i>영단어 기록, 시험, 오답노트 서비스</i>
<br>

## 1. 진행 기간

진행 기간 : 12월 23일 ~ 1월 31일

## 2. 목적

토익 공부를 시작하게 되면서 단어를 외우기 시작했습니다.  
단어를 외우기 위해 의미 없이 종이에 여러 번 쓰인 단어들을 보며, 웹 페이지에서 한번 단어를 입력하는 것으로 나만의 단어장을 만들고,  
단어장 안에서 재미있는 퀴즈를 만들면 좀 더 재미있게 외울 수 있겠다는 생각에 wordCheck 서비스를 기획하게 되었습니다. 

## 3. 적용기술

- [React](https://ko.reactjs.org/)

- [axios](https://www.npmjs.com/package/axios)

- [react-router-dom](https://www.npmjs.com/package/react-router-dom)

- [styled-components](https://styled-components.com/)

- [Material Ui](https://mui.com/)

- [react-speech-kit](https://www.npmjs.com/package/react-speech-kit)

## 4. 주요 구현기능

### (1) 로그인/ 회원가입 기능

<p float="left">
 <img src="https://user-images.githubusercontent.com/49505843/152646257-7651c5ed-93de-4bc3-8ca7-7faef690488b.png" width="200" height="380">
 <img src="https://user-images.githubusercontent.com/49505843/152649136-fff99cef-ad6f-490f-adc4-dfb13b2cf889.png"  width="200" height="380">
  <img src="https://user-images.githubusercontent.com/49505843/152649190-fecca86d-d217-463b-b975-9d5b8134aefc.png"  width="200" height="380">
</p>

- axios 통신 라이브러리를 사용해 유저가 로그인을 성공했을 때 서버에서 토큰 값을 받아와 쿠키에 저장시킨 후 home 창으로 이동될 수 있도록 했습니다.
- 로그인 실패 시 toast로 알림 창을 띄워줬습니다.

### (2) 단어 추가 기능

<p float="left">
<img src="https://user-images.githubusercontent.com/49505843/152646595-29fa8a58-de39-477f-80dc-096207654a1e.png"  width="200" height="380">
</p>

- 한 컨텐츠 내에서 여러 단어를 한번에 저장할 수 있도록 만들었습니다.
- `+ 단어카드 추가하기`버튼을 누르면 단어를 추가할 수 있는 div가 생성 됩니다.
  - 추가 버튼을 누르면 `inputData`(빈 배열)이 `wordList`기존 배열에 추가됩니다.
- 이후 `만들기`버튼을 누르면 `Promise.all()`으로 단어 배열이 서버에 추가됩니다.

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

### (3) 단어 수정/삭제 기능 및 TTS/북마크 기능

<p float="left">
<img src="https://user-images.githubusercontent.com/49505843/152649831-32bc68f8-88b5-44a0-9640-f64c5344afe6.png"  width="200" height="380">
 <img src="https://user-images.githubusercontent.com/49505843/152650792-7ad6bfe0-4b93-465d-9060-b9a858dd7862.png"  width="200" height="380">
</p>

- 단어 리스트 화면에서는 오른쪽 하단의 아이콘들을 눌러 수정하거나 지울 수 있습니다.
- 별 아이콘을 클릭하여 중요한 단어 표시를 할 수 있습니다((5)마크북 기능 참고).
- 확성기 아이콘을 통해 해당 단어의 발음을 들어볼 수 있습니다.

### (4) 시험 기능

<p float="left">
<img src="https://user-images.githubusercontent.com/49505843/152649209-1121df48-c320-427e-b60d-7fb8196da346.png"  width="200" height="380">
<img src="https://user-images.githubusercontent.com/49505843/152649237-4355cc60-08e0-49f9-a3d7-7b797cbf866d.png"  width="200" height="380">
<img src="https://user-images.githubusercontent.com/49505843/152649248-1bb15dd6-6b94-46ca-b739-44b6f5a867fe.png"  width="200" height="380">
<img src="https://user-images.githubusercontent.com/49505843/152649276-1c2ae52b-2a29-4f7b-ad2d-48161144152d.png"  width="200" height="380">
</p>

- 시험선택 페이지에서 원하는 시험을 선택해 시험을 볼 수 있습니다.
- 사지선다 보기는 정답 단어 1개와 이외 틀린단어 3개를 랜덤으로 가져와 보여줄 수 있도록 했습니다.
- 정답이 틀렸을 때는 모달 창을 띄워, 틀린 답과 올바른 답을 확인할 수 있도록 했습니다.

### (5) 마크북 기능

<img src="https://user-images.githubusercontent.com/49505843/152649359-5101b214-98d7-4761-981a-f2287525e41b.png"  width="200" height="380">

- 별 아이콘을 눌러 마크북에 단어를 저장할 수 있습니다.
- 마크북은 로컬 스토리지에 저장되어 오프라인 환경에서도 마크북 단어를 확인할 수 있습니다.

### (6) 검색기능

<p float="left">
<img src="https://user-images.githubusercontent.com/49505843/152654749-1df698aa-ce9a-4eaf-b1dc-a8a011833def.png"  width="200" height="380">
<img src="https://user-images.githubusercontent.com/49505843/152649421-2e8c784b-7ef3-4b8e-9e6f-bde88e224260.png"  width="200" height="380">
</p>


- '단어 찾기'화면에서는 유저가 저장해놓은 단어를 검색할 수 있습니다.
- '검색하기'버튼의 onClickEvent는 아래와 같이 구현했습니다.

```jsx
const onClickSearchButtonHandler = () => {
  axios
    .get(`${process.env.REACT_APP_API}words/search/?target=${searchWord}`, {
      headers: {
        Authorization: cookies.token,
      },
    })
    .then((res) => {
      if (res.data.length === 0) {
        // 단어가 없을 때
        setAnswerShow(false);
        setEmptyAnswer(true);
      } else {
        // 단어가 있을 때
        setAnswerWord(res.data);
        setAnswerShow(true);
      }
    })
    .catch((err) => {
      // 에러 처리 (ex. 빈 값 입력)
      setAnswerShow(false);
      setEmptyAnswer(true);
    });
};
```

