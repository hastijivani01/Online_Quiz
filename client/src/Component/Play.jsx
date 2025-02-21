import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';

function Play() {
  const history = useHistory();
  const [state, setState] = useState({
    questions: [],
    currentQuestion: {},
    currentQuestionIndex: 0,
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    attemptedQuestions: 0,
    options: [],
  });

  
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/question', {
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWRhOTc5M2EyMWE4MDZlOTAzZjk5YiIsImlhdCI6MTczODM4NTc4OH0.qFKIBL51rEeqaK1yhtaS6OWtqKWjIvFPynsCfch2qQE',
      },
    })
      .then((response) => {
        console.log('API Response:', response.data); // Debugging
        if (response.status === 200 && response.data.data) {
          setState((prevState) => ({
            ...prevState,
            questions: response.data.data,
            currentQuestion: response.data.data[0],
            options: [
              response.data.data[0].optionA,
              response.data.data[0].optionB,
              response.data.data[0].optionC,
              response.data.data[0].optionD,
            ],
          }));
        } else {
          console.error('Invalid response structure:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleOptionClick = (e) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    const isCorrect = e.target.innerHTML === currentQuestion.answer;

    if (isCorrect) {
      M.toast({ html: 'Correct Answer!', classes: 'toast-valid' });
    } else {
      M.toast({ html: 'Wrong Answer!', classes: 'toast-invalid' });
    }

    setState((prevState) => ({
      ...prevState,
      attemptedQuestions: prevState.attemptedQuestions + 1,
    }));

    setNextQuestion(isCorrect);
  };

  const setNextQuestion = (isCorrect) => {
    const nextIndex = state.currentQuestionIndex + 1;
    if (nextIndex < state.questions.length) {
      setState((prevState) => ({
        ...prevState,
        score: isCorrect ? prevState.score + 1 : prevState.score,
        correctAnswers: isCorrect ? prevState.correctAnswers + 1 : prevState.correctAnswers,
        wrongAnswers: !isCorrect ? prevState.wrongAnswers + 1 : prevState.wrongAnswers,
        currentQuestionIndex: nextIndex,
        currentQuestion: prevState.questions[nextIndex],
        options: [
          prevState.questions[nextIndex].optionA,
          prevState.questions[nextIndex].optionB,
          prevState.questions[nextIndex].optionC,
          prevState.questions[nextIndex].optionD,
        ],
      }));
    } else {
      navigateToResults();
    }
  };

  const navigateToResults = () => {
    history.push('/result', {
      score: state.score,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      attemptedQuestions: state.attemptedQuestions,
      totalQuestions: state.questions.length,
    });
  };

  const handleQuit = () => {
    history.push('/play/instructions');
  };

  const handleQuitClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Let's Test Your Knowledge!</h1>
      {state.questions.length > 0 ? (
        <div className="question-section">
          <h4 className="question-text">{state.currentQuestion.question}</h4>
          <div className="options-container">
            {state.options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={handleOptionClick}
              >
                {option}
              </button>
            ))}
          </div>

          <button className="quit-button" onClick={handleQuitClick}>
            Quit
          </button>
        </div>
      ) : (
        <h4 className="loading-text">Loading questions...</h4>
      )}

      {isModalVisible && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h4>Are you sure you want to quit?</h4>
            <p>If you quit now, your progress will not be saved.</p>
            <div className="modal-actions">
              <button
                className="modal-ok-btn"
                onClick={() => {
                  handleQuit();
                  handleCloseModal();
                }}
              >
                OK
              </button>
              <button className="modal-cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Play;
