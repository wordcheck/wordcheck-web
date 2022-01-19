import styled from "styled-components";
//

// card.jsx

export const ContentDiv = styled.div`
  font-size: 6vw;
  padding: 1vw;
  padding-top: 0.8vh;
`;
export const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.2vh;
  padding-right: 1.6vh;
  padding-left: 1.6vh;
`;

//? wordList.jsx
export const Container = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2em;
`;

export const Carddiv = styled.div`
  width: 80vw;
  background-color: lightgray;
  padding: 1.5vh;
  margin-top: 1.8vh;
  border-radius: 1vh;
  font-size: 0.7em;
  display: flex;
`;

export const Spellingdiv = styled.div`
  width: 40vw;
  display: flex;
  .wrongIcon {
    padding-right: 2vw;
  }
`;
export const CategoryList = styled.div`
  padding-left: 2vw;
  width: 11vw;
`;
export const CardDiv2 = styled.div`
  width: 100%;
  display: flex;
  /* justify-content: space-between; */
`;
export const CardDiv3 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
`;

// test.jsx의 styled components
export const TopNav = styled.div`
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .wordscount {
    font-size: 0.8em;
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
  width: 80vw;
  height: 4vh;
  text-align: center;
  font-size: 0.7em;
  background-color: #ffdb4d;
  padding: 2vh;
  margin-top: 2vw;
  width: 35vh;
  border-radius: 1.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TitleDiv = styled.div`
  width: 84vw;
  height: 5.5vh;
  display: flex;
  justify-content: space-between;
  padding-top: 2.2vh;
`;

// AddWordForm.jsx 의 styled-container

export const CardContainer = styled.div`
  width: 80vw;
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

// BeforeTest.jsx

export const TestContentDiv = styled.div`
  width: 91vw;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.64em;
  /* border: 1px solid gray; */
  padding: 1vh;
  padding-left: 5vw;
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
