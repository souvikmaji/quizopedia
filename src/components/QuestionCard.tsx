import React from "react";

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
    <div>
        <p className="number">
            Question: {questionNo} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html : question }} />

        <div>
            {answers.map(answer => (
                <div key={answer}>
                    <button disabled={!!userAnswer} onClick={callback} value={answer}>
                        <span dangerouslySetInnerHTML={{__html : answer}}></span>
                    </button>
                </div>
            ))}
        </div>
    </div>
);

export default QuestionCard;