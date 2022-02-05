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
<img src="https://user-images.githubusercontent.com/49505843/152646257-7651c5ed-93de-4bc3-8ca7-7faef690488b.png" width="200" height="450">
<img src="https://user-images.githubusercontent.com/49505843/152646257-7651c5ed-93de-4bc3-8ca7-7faef690488b.png" width="200" height="450">

 - axios 통신 라이브러리를 사용해 로그인을 했을 때 토큰 값을 받아왔습니다.
 - react-cookie를 사용해 받아온 token울 cookie에 저장해줬습니다. 
 - 로그인 실패 시 toast로 알림 창을 띄워줬습니다. 

- (2) 단어 추가 기능 
- <img src="https://user-images.githubusercontent.com/49505843/152646595-29fa8a58-de39-477f-80dc-096207654a1e.png"  width="414" height="896">

- 한 title 내에 단어를 여러 개 추가할 수 있도록 했습니다. 
```jsx
  const [wordList, setWordList] = useState([
    {
      contents: "",
      spelling: "",
      meaning: "",
      category: "n", 
    },
  ]);
 
    const onClickCardAddHandler = () => {
    let WordInputs = [...wordList];
    WordInputs.push(inputData);
    setWordList(WordInputs);
  };
  
  const onChangeInputHandler = (e, index) => {
    const { value, name } = e.target;
    setWordList(
      wordList.map((item, i) => {
        if (i === index) return { ...item, [name]: value, contents: contents };
        else return { ...item, contents: contents };
      })
    );
  };
```






