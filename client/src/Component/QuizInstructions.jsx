import React from 'react';
import { Link } from 'react-router-dom';

function QuizInstructions() {
  return (
    <div className="instruction ">
      <div style={{fontSize: "32px",paddingBottom:"20px" }}>How to Play the Game</div>
      <p>Ensure you read this guide from start to finish.</p>
      <ul className='browser-default main-list'>
        <li>The game has a duration of 15 minutes and ends as soon as your time elapses.</li>
        <li>Each game consists of 15 questions. </li>
        <li>Every question contains 4 options.</li>

      <p>--------------------------------------------------------------------------------------------------------</p>
    
        <li>Select the option which best answers the question by clicking (or selecting) it.</li>
        
    
      <p>--------------------------------------------------------------------------------------------------------</p>
    
        <li>Each game has 2 lifelines namely:
            <ul className='sublist'>
            <li>2 50-50 chances. </li>
            <li>5 Hints</li>
            </ul>
        </li>
      {/* <p>--------------------------------------------------------------------------------------------------------</p> */}

        <li>Selecting a 50-50 lifeline by cliking the icon
            <span className='mdi mdi-set-center mdi-24px lifeline-icon'></span>will removers,leaving the correct answer and one wrong answer.
        </li>
      {/* <p>--------------------------------------------------------------------------------------------------------</p> */}

        {/* <li>Using a hint by clicking the icon <span className='mdi mdi-lightbulb-on mdi-24px lifeline-icon'></span> will remove one wrong answer leaving two wrong answers and one correct answer.<br /> You can use as many hints as possible on a single question.</li> */}
      <p>--------------------------------------------------------------------------------------------------------</p>
        <li>Feel free to quit (or retire from) the game at any time. In that case your score will be revealed afterwards. </li>
        <li>The Timer starts as soon as the game loads.</li>
        <li style={{paddingBottom: "50px"}}>Let's do this if you think you've got ehat it  tokes? </li>
      </ul>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <span className='left' style={{ display: 'block' }}>
          <Link to='/'>No, Take Me Back</Link>
        </span>
        <span className='right' style={{ display: 'block' }}>
          <Link to='/play/play'>Okay, Let's Do This</Link>
        </span>
      </div>
    {/* </div> */}
    </div>
  );
}

export default QuizInstructions;
