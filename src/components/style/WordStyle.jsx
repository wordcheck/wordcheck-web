import styled from "styled-components";
//

// card.jsx

export const ContentDiv = styled.div`
  font-size: 6vw;
`;
export const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1vh;
`;

//? wordList.jsx
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2em;
`;

export const Carddiv = styled.div`
  width: 80vw;
  background-color: lightgray;
  padding: 1.5vh;
  margin: 1.2vh;
  border-radius: 1vh;
  font-size: 0.7em;
  display: flex;
`;

export const Spellingdiv = styled.div`
  width: 40vw;
`;
export const CardDiv2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
  text-align: center;
  background-color: pink;
  padding: 2vh;
  margin: 2vh;
  width: 35vh;
  border-radius: 1.5vh;
`;
export const TitleDiv = styled.div`
  width: 80vw;
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
  margin: 2vh;
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
