import React from "react";
import {Wrapper, ButtonWrapper} from "./QuestionCard.styles";

export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
  }
  

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNo: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callback,
    userAnswer, 
    questionNo, 
    totalQuestions
}) => (
    <Wrapper>
        <p className="number">
            Question: {questionNo} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html : question }} />

        <div>
            {answers.map(answer => (
                <ButtonWrapper 
                    key={answer} 
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}>
                        
                    <button disabled={!!userAnswer} onClick={callback} value={answer}>
                        <span dangerouslySetInnerHTML={{__html : answer}}></span>
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
);

export default QuestionCard;