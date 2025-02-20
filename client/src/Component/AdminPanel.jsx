import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPanel.css";
import { FaTrash, FaPlus, FaEdit, FaSave } from "react-icons/fa";
import { useHistory } from "react-router-dom";

function AdminPanel() {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
  });
  const [editingId, setEditingId] = useState(null);
  const history = useHistory();
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    if (!token) {
      alert("Please log in to access the admin panel.");
      history.push("/signin");
      return;
    }
    fetchQuestions();
  }, [token, history]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/question", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(response.data.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in to add questions.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/question/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:3000/question", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        answer: "",
      });
      setEditingId(null);
      fetchQuestions();
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!token) {
      alert("You must be logged in to delete questions.");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/question/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchQuestions();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

 
  const handleEdit = (question) => {
    setForm({
      question: question.question,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      answer: question.answer,
    });
    setEditingId(question._id);
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <h2 className="dashboard-title">
          {editingId ? "Edit Question" : "Add Question"}
        </h2>

    
        {token ? (
          <form className="admin-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Question"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Option A"
              value={form.optionA}
              onChange={(e) => setForm({ ...form, optionA: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Option B"
              value={form.optionB}
              onChange={(e) => setForm({ ...form, optionB: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Option C"
              value={form.optionC}
              onChange={(e) => setForm({ ...form, optionC: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Option D"
              value={form.optionD}
              onChange={(e) => setForm({ ...form, optionD: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Correct Answer"
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              required
            />
            <button type="submit" className="add-btn">
              {editingId ? (
                <>
                  <FaSave /> Save Changes
                </>
              ) : (
                <>
                  <FaPlus /> Add Question
                </>
              )}
            </button>
          </form>
        ) : (
          <p>Please log in to add or edit questions.</p>
        )}

        {/* Questions List */}
        <div className="questions-container">
          {questions.map((q) => (
            <div key={q._id} className="question-card">
              <h4>{q.question}</h4>
              <p>A: {q.optionA}</p>
              <p>B: {q.optionB}</p>
              <p>C: {q.optionC}</p>
              <p>D: {q.optionD}</p>
              <p className="answer">Answer: {q.answer}</p>
              <div className="button-container">
                {token && (
                  <>
                    <button className="edit-btn" onClick={() => handleEdit(q)}>
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(q._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;


