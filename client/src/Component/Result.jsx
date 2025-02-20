import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Result() {
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const { state } = location;
    if (state) {
      setTotalQuestions(state.totalQuestions || 0);
      setAttemptedQuestions(state.attemptedQuestions || 0); 
      setCorrectAnswers(state.correctAnswers || 0);
      setWrongAnswers(state.wrongAnswers || 0);

      const calculatedScore = state.totalQuestions
        ? (state.correctAnswers / state.totalQuestions) * 100
        : 0;
      setScore(calculatedScore);
    }
  }, [location]);

  const userScore = score;
  let remark = '';
  if (userScore <= 30) {
    remark = 'You need more practice!';
  } else if (userScore <= 50) {
    remark = 'Better luck next time!';
  } else if (userScore <= 70) {
    remark = 'You can do better';
  } else if (userScore <= 84) {
    remark = 'You did great!';
  } else {
    remark = "You're an absolute genius!";
  }

  let stats;
  if (location.state) {
    stats = (
      <div className="result-page">
        <div className="container">
          <h4>{remark}</h4>
          <h2>Your Score: {score.toFixed(0)}%</h2>
          <span className="stat left">Total Number of Questions:</span>
          <span className="right">{totalQuestions}</span>
          <br />
          <br />
          <span className="stat left">Number of Attempted Questions:</span>
          <span className="right">{attemptedQuestions}</span>
          <br />
          <br />
          <span className="stat left">Number of Correct Answers:</span>
          <span className="right">{correctAnswers}</span>
          <br />
          <br />
          <span className="stat left">Number of Wrong Answers:</span>
          <span className="right">{wrongAnswers}</span>
          <br />
          <br />
          <ul>
            <li>
              <Link to="/play/instructions" className="link-button left">
                Back To Home
              </Link>
            </li>
            <li>
              <Link to="/play/play">
                <p style={{ paddingLeft: '300px', color: 'white' }}>Play Again</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    stats = (
      <section>
        <h1 className="no-status">No statistics available</h1>
        <ul>
          <li>
            <Link to="/">Back To Home</Link>
          </li>
          <li>
            <Link to="/play/play">Take a Quiz</Link>
          </li>
        </ul>
      </section>
    );
  }

  return <>{stats}</>;
}

export default Result;

