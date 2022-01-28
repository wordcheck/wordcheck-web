import { BottomNavigation } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

//app.jsx
export const StyledBottomNavigation = styled(BottomNavigation)`
  width: 100%;
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
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 1.2vh;
  padding-right: 1.6vh;
  padding-left: 1.6vh;
  padding-bottom: 2vh;
  padding-top: 3vh;
  @media only screen and (min-width: 750px) {
    width: 750px;
  }
`;

//? wordList.jsx
export const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&family=Nanum+Gothic+Coding&display=swap");
  font-family: "Nanum Gothic", sans-serif;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.7em;

  @media only screen and (min-width: 750px) {
    width: 750px;
    font-size: 3vw;
  }
`;

export const Carddiv = styled.div`
  width: 75vw;
  height: 10vh;
  background-color: lightgray;
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
export const TopNav = styled.div`
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9em;
  border-bottom: 1px solid lightgray;
  .wordscount {
    font-size: 0.8em;
  }
  @media only screen and (min-width: 750px) {
    width: 750px;
  }
`;
export const BackButton = styled.div`
  position: absolute;
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
  width: 100%;
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
`;

// AddWordForm.jsx 의 styled-container
// add card
export const CardContainer = styled.div`
  width: 74vw;
  height: 15vh;
  background-color: lightgray;
  padding: 2vh;
  margin-top: 2vh;
  font-size: 0.7em;
  border-radius: 1.5vh;
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

// TestEnd.jsx

export const WrongWordsContainer = styled.div`
  width: 80vw;
  display: flex;
  justify-content: center;
  font-size: 0.9em;
  margin-top: 2vh;
`;
export const InfoDiv = styled.div`
  margin-top: 10vh;
  margin-bottom: 10vh;
`;

export const LinkButtonDiv = styled.div`
  width: 60vw;
  margin-bottom: 10vh;
  display: flex;
  justify-content: space-between;
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
  margin-top: 3vh;
  box-shadow: 1vw 1vw 3.2vw gray;
  .profile {
    width: 100%;
    height: 100%;
  }
`;

export const UserDiv = styled.div`
  width: 88vw;
  height: 10vh;
  margin-top: 4vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const AccountSettingDiv = styled.div`
  width: 100vw;

  .info {
    padding-top: 5vh;
    padding-left: 4vw;
  }
`;

export const AccountSettingDiv2 = styled.div`
  width: 100vw;
  height: 6vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.64em;
  border-bottom: 1px solid lightgray;
  padding: 1vh;
  padding-left: 5vw;
  :active {
    background-color: lightgray;
  }
`;
export const UserDataDiv = styled.div`
  font-size: 0.7em;
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
  width: 91vw;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.64em;
  border-bottom: 1px solid lightgray;
  padding: 1vh;
  padding-left: 5vw;
  :active {
    background-color: lightgray;
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
  width: 100vw;
  height: 100vh;
  background-color: rgba(200, 200, 200, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  width: 75vw;
  height: 40vh;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 4vw;
  z-index: 3;
  font-size: 0.7em;
`;
