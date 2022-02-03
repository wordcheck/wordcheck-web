import { BottomNavigation, Button, Input } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

//app.jsx
export const StyledBottomNavigation = styled(BottomNavigation)`
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: space-around;

  @media only screen and (min-width: 750px) {
    width: 750px;
  }
`;

//home.jsx
export const WordListContainer = styled.div`
  width: 85vw;
  @media only screen and (min-width: 750px) {
    width: 637.5px;
  }
`;
export const HomeCardListContainer = styled.div`
  width: 85vw;
  @media only screen and (min-width: 750px) {
    width: 637.5px;
  }
`;
export const HomeCardLink = styled(Link)`
  width: 85vw;
  display: flex;
  @media only screen and (min-width: 750px) {
    width: 637.5px;
  }
`;

export const WordListDiv = styled.div`
  position: relative;
  width: 85vw;
  background-color: #e6e6e6;
  /* border: 2px solid lightgray; */
  border-radius: 1vh;
  padding: 1.7vh;
  margin-bottom: 2vh;
  font-size: 0.6em;
  @media only screen and (min-width: 750px) {
    width: 637.5px;
  }
`;

export const TopLogoMypageContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-around;
  padding-top: 2.5vh;
  padding-bottom: 4vh;
  @media only screen and (min-width: 750px) {
    width: 750px;
  }
`;

export const Logo = styled.div`
  font-size: 5vh;
  font-weight: bolder;
`;

// 단어 리스트가 없을 때
export const EmptyWordDiv = styled.div`
  width: 100vw;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  @media only screen and (min-width: 750px) {
    width: 750px;
  }
`;
export const CategoryInfo = styled.div`
  width: 100vw;
  height: 2vh;
  font-size: 1.2em;
  padding-top: 6vw;
  padding-left: 5vw;
  @media only screen and (min-width: 750px) {
    width: 750px;
  }
`;

// card.jsx

export const ContentDiv = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&family=Nanum+Gothic+Coding&display=swap");
  font-family: "Nanum Gothic", sans-serif;
  font-size: 1.2em;
  padding: 1vw;
  padding-top: 0.8vh;
`;
export const HeaderDiv = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-between;
  padding-top: 2vh;
  padding-bottom: 2vh;
  /* padding: 1.2vh; */
  /* padding-right: 1.6=vh;
  padding-left: 1.6vh;
  padding-bottom: 2vh;
  /* padding-top: 3vh; */
  @media only screen and (min-width: 750px) {
    width: 637.5px;
  }
`;

//? WordList.jsx
//공용으로 사용되는 Container
export const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&family=Nanum+Gothic+Coding&display=swap");
  font-family: "Nanum Gothic", sans-serif;
  width: 100vw;
  height: ${(props) => (props.isInner ? "80vh" : "100%")};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${(props) => (props.isInnerFontSize ? "1em" : "1.7em")};
  @media only screen and (min-width: 750px) {
    width: 750px;
    font-size: 3vw;
  }
`;
export const WordListInputContainer = styled.div`
  width: 75vw;
  height: 10vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const StyledInput = styled(Input)``;

export const Carddiv = styled.div`
  width: 75vw;
  height: 10vh;
  background-color: #e6e6e6;
  padding: 1.5vh;
  margin-top: 1.8vh;
  border-radius: 1vh;
  font-size: 0.7em;

  /* box-shadow: 0.5vw 0.5vw 2vw gray; */
  /* border: 1px solid lightgray; */
  display: flex;
  justify-content: space-between;
  @media only screen and (min-width: 750px) {
    width: 562.5px;
  }
`;
export const WrongCountDiv = styled.div`
  font-size: 0.6em;
  color: gray;
`;
export const SpellingVolumeUpDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 0.2vh;
`;

export const StarIconDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
`;
export const SpellingDiv = styled.div`
  font-weight: 700;
  display: flex;
  font-size: 1.2em;
  padding-right: 1vw;
`;
export const CategoryMeaningDiv = styled.div`
  padding-top: 0.4vh;
  padding-left: 1vw;
  display: flex;
  font-size: 0.9em;
  color: gray;
`;

export const CategoryList = styled.div`
  padding-right: 0.8vw;
`;
export const MeaningDiv = styled.div``;

// export const WordCardLeftDiv = styled.div`
//   display: flex;
//   width: 20vw;
// `;
export const WordCardRightDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const IconDiv = styled.div`
  display: flex;
  justify-content: row;
  justify-items: right;
`;

export const CardDiv2 = styled.div`
  width: 100%;
  display: flex;
  /* justify-content: space-between; */
  @media only screen and (min-width: 750px) {
    width: 750px;
  }
`;
export const EditDeleteIconDiv = styled.div``;

// test.jsx의 styled components
export const TopNavDivContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
  display: flex;
`;

export const TopNav = styled.div`
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9em;

  .wordscount {
    font-size: 0.8em;
  }
  @media only screen and (min-width: 750px) {
    width: 750px;
  }
`;
export const BackButton = styled.div`
  position: relative;
  display: flex;
  left: 2.5vh;
  top: 2.5vh;
`;

export const QuestionDiv = styled.div`
  width: 85vw;
  height: 40vh;
  /* background-color: lightgray; */
  display: flex;
  align-items: center;
  flex-direction: row; /* default: row */
  justify-content: center;
  border-radius: 1vh;
`;
export const AnswerDiv = styled.div`
  width: 90%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MultipleChoiceDiv = styled.div`
  width: 80%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  .colorbutton {
    padding: 2vh;
    margin-bottom: 3vh;
    border-radius: 1.2vh;
    text-transform: none;
  }
`;

//  Addword.jsx의 styledcomponent

export const CardAddContainer = styled.div`
  width: 74vw;
  height: 4vh;
  text-align: center;
  font-size: 0.7em;
  background-color: #4caf50;
  padding: 2vh;
  margin-top: 2vh;
  border-radius: 1.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 750px) {
    width: 555px;
  }

  :active {
    background-color: #adebad;
  }
`;
export const TitleDiv = styled.div`
  width: 88vw;
  height: 5.5vh;
  display: flex;
  justify-content: space-between;
  padding-top: 2.2vh;
  padding-bottom: 1vh;
  @media only screen and (min-width: 750px) {
    width: 660px;
  }
`;

// AddWordForm.jsx 의 styled-container
// add card
export const CardContainer = styled.div`
  width: 74vw;
  height: 15vh;
  background-color: #e6e6e6;
  padding: 2vh;
  margin-top: 2vh;
  font-size: 0.7em;
  border-radius: 1.5vh;
  @media only screen and (min-width: 750px) {
    width: 555px;
  }
`;

export const Label = styled.div`
  width: 15vw;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InputInfo = styled.div`
  width: 80vw;
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// ConfirmModal.jsx;
export const ConfirmModalDiv = styled.div`
  width: 70vw;
  height: 15vh;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 6vw;
  z-index: 3;
  font-size: 1em;
  @media only screen and (min-width: 750px) {
    width: 525px;
    font-size: 20px;
  }
`;
export const ConfirmModalAnswer = styled(Button)`
  width: 20vw;
  text-transform: none;
`;
export const ConfirmModalBox = styled.div``;

// TestEnd.jsx

export const WrongWordsInfo = styled.div`
  padding-top: 2vh;
  padding-bottom: 1vh;
`;

export const WrongWordsContainer = styled.div`
  width: 65vw;
  display: flex;
  justify-content: left;
  font-size: 0.9em;
  margin-top: 2vh;
  background-color: lightgray;
  padding: 1vh;
  border-radius: 1vh;
`;
export const WrongWordsSpellingDiv = styled.div`
  width: 32vw;
`;
export const WrongWordsOthersDiv = styled.div`
  color: gray;
  font-size: 0.9em;
`;

export const TestEndInfoDiv = styled.div`
  margin-top: 60px;
  margin-bottom: 60px;
`;

export const LinkButtonDiv = styled.div`
  width: 60vw;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`;

//Mypage.jsx
export const NameDiv = styled.div`
  margin-top: 5vh;
  margin-bottom: 2vh;
`;

export const ImgDiv = styled.div`
  width: 40vw;
  height: 20vh;
  border-radius: 70%;
  overflow: hidden;
  margin-top: 2vh;
  box-shadow: 1vw 1vw 3.2vw gray;
  .profile {
    width: 100%;
    height: 100%;
  }
  @media only screen and (min-width: 750px) {
    width: 250px;
    height: 250px;
  }
`;

export const UserDiv = styled.div`
  width: 88vw;
  height: 10vh;
  margin-top: 2vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (min-width: 750px) {
    width: 668px;
  }
`;
export const AccountSettingDiv = styled.div`
  width: 100vw;
  .info {
    padding-top: 5vh;
    padding-left: 2vh;
  }
  @media only screen and (min-width: 750px) {
    width: 750px;
  }
`;

export const AccountSettingDiv2 = styled.div`
  width: 94vw;
  height: 6vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.64em;
  border-bottom: 1px solid lightgray;
  padding: 1vh;
  padding-left: 5vw;
  @media only screen and (min-width: 750px) {
    width: 690px;
  }
  :active {
    background-color: lightgray;
  }
`;
export const UserDataDiv = styled.div`
  font-size: 0.7em;
  height: 150px;

  background-color: #e6e6e6;
  padding: 1vh;
  border-radius: 1vh;
`;

export const DataInfoDiv = styled.div`
  padding-bottom: 1.2vh;
`;
export const DataInfoTipDiv = styled.div`
  color: #ff1a1a;
  padding-bottom: 1vh;
  font-size: 0.8em;
  padding-left: 1vw;
`;

export const DataTop3Div = styled.div`
  font-weight: 700;
  padding-top: 0.7vh;
  padding-bottom: 0.3vh;
`;
export const DataTop3Li = styled.li`
  width: 60vw;
  /* background-color: #ffdb4d; */
  padding: 0.5vh;
  margin-bottom: 0.5vh;
  border-radius: 1vh;

  @media only screen and (min-width: 750px) {
    width: 450px;
  }
`;
export const DataTop3Span = styled.span`
  font-size: 0.9em;
  color: gray;
`;

export const DataTop3BoldSpan = styled.span`
  font-weight: 700;
`;
export const FootDiv = styled.div`
  position: absolute;
  bottom: 2vh;
  width: 100%;
  text-align: center;
  font-size: 0.7em;
`;

//NicknameChange.jsx
export const NicknameChangeFormDiv = styled.div`
  width: 90vw;
  padding-top: 3vh;
  display: flex;
  justify-content: space-around;
`;
export const NicknameChangeInfo = styled.div`
  width: 90vw;
  margin-top: 4vh;
  padding-left: 5vw;
  padding-bottom: 1vh;
  text-align: left;
  font-size: 0.7em;
`;

// BeforeTest.jsx

export const TestContentDiv = styled.div`
  width: 90vw;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.64em;
  border-bottom: 1px solid lightgray;
  padding: 1vh;
  padding-left: 5vw;
  overflow: visible;
  :active {
    background-color: lightgray;
  }
  @media only screen and (min-width: 750px) {
    width: 675px;
    height: 75px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
  .buttons {
    width: 30vh;
    padding-top: "1vh";
    padding-bottom: "1vh";
    font-size: 1em;
    display: flex;
    flex-direction: column;
    .contentInfo {
      width: 40vh;
      color: gray;
      :hover {
        color: green;
      }
      &.something {
        background: orange;
      }
    }
  }
`;

// home.jsx

export const HomeImgDiv = styled.div`
  width: 30vw;
  height: 15vh;
  border-radius: 70%;
  overflow: hidden;
  margin-top: 3vh;
  box-shadow: 1.2vw 1.1vw 3.2vw gray;
  .profile {
    width: 100%;
    height: 100%;
  }
`;

export const UserInfoDiv = styled.div`
  width: 100vw;
  height: 15vh;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding-top: 2vh;
  padding-bottom: 2vh;
  border-bottom: 1px solid lightgray;

  .username {
    height: 7vh;
    font-size: 1.3em;
    display: flex;
    align-items: flex-end;
    padding-bottom: 1vh;
  }
`;
// Marks.jsx

export const EmptyMarkDiv = styled.div`
  width: 80vw;
  height: 70vh;
  font-size: 0.7em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: gray;
`;
// modal.jsx

export const ModalBackground = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&family=Nanum+Gothic+Coding&display=swap");
  font-family: "Nanum Gothic", sans-serif;
  width: 100vw;
  height: 100vh;
  background-color: rgba(200, 200, 200, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9em;
`;

export const ModalContainer = styled.div`
  width: 72vw;
  height: 23vh;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) =>
    props.isFalse ? "space-between" : "space-around"};
  padding: 6vw;
  z-index: 3;
  font-size: 0.7em;
`;
// in Modal.jsx  //falseModal()

export const ModalAnswer = styled(Button)`
  width: 72vw;
  text-transform: none;
`;

export const ModalInfoDiv = styled.div`
  width: 72vw;
  padding-top: 1.5vh;
  padding-bottom: 0.7vh;
`;

export const FalseModalButtonDiv = styled.div`
  width: 72vw;
  display: flex;
  justify-content: space-around;
  @media only screen and (min-width: 750px) {
    width: 525px;
  }
`;
export const BottomNavBoxContainer = styled.div`
  width: 80vw;
  height: 10vh;
`;

// WordSearch.jsx
export const WordSearchInputDiv = styled.div`
  width: 90vw;
  padding: 2vh;
  display: flex;
  justify-content: space-between;
  @media only screen and (min-width: 750px) {
    width: 675px;
  }
`;

export const WordSearchCardDiv = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: 750px) {
    width: 750px;
  }
`;
