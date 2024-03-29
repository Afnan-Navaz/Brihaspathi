import React, { useState, useEffect } from 'react';
import { getQuestionIds } from '../../config/api';
import './QuestionBar.style.scss';

const Question = ({ n, event, id, current, answered }) => {
  let status = '';
  answered.map(q => {
    if (q === id) {
      status = 'bg-info';
    }
  });
  if (id === parseInt(current)) {
    status = 'active-q';
  }
  const colo = (status === 'bg-info' || status === 'active-q') ? 'text-white' : 'text-dark';
  return (
    <li className={`list-group-item ${status}`}>
      <a className={colo} href={`/prelims/${event}/${id}`}>{n}</a>
    </li>
  );
};

const QuestionBar = ({ match }) => {
  const [questionIds, setQuestionIds] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  useEffect(() => {
    getQuestionIds(match.params.event).then(res => {
      setQuestionIds(res.questions);
      setAnsweredQuestions(res.answered_questions);
    });
  }, []);
  return (
    <div className="card q-bar">
      <div className="card-content">
        <ul className="list-group">
          {questionIds.map((q, i) => (
            <Question
              key={i}
              n={i + 1}
              id={q}
              event={match.params.event}
              current={match.params.question}
              answered={answeredQuestions}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionBar;
