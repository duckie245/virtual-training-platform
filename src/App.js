import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import "./App.css";

const sampleCourses = [
  {
    id: 1,
    title: "AWS Zero Trust Webinar",
    description: "Explore ZSP and infrastructure alignment with Zero Trust."
  },
  {
    id: 2,
    title: "Cybersecurity Essentials",
    description: "Understand the principles of securing digital environments."
  },
  {
    id: 3,
    title: "Cloud Data Privacy",
    description: "Explore strategies for protecting data in cloud systems."
  }
];

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleSubmitFeedback = async () => {
    try {
      await addDoc(collection(db, "feedbacks"), {
        courseTitle: selectedCourse.title,
        feedbackText: feedback,
        timestamp: new Date().toISOString()
      });
      alert("✅ Feedback submitted and stored in Firebase!");
      setFeedback("");
      setSelectedCourse(null);
    } catch (error) {
      console.error("Error saving feedback:", error);
      alert("❌ Could not submit feedback. Check console.");
    }
  };

  return (
    <div className="container">
      <h1>Virtual Training Platform (Firebase Connected)</h1>
      {!selectedCourse ? (
        <div>
          {sampleCourses.map(course => (
            <div
              key={course.id}
              className="card"
              onClick={() => setSelectedCourse(course)}
            >
              <h2>{course.title}</h2>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <button onClick={() => setSelectedCourse(null)} className="button" style={{ marginBottom: '1rem' }}>
            ← Back to Courses
          </button>
          <h2>{selectedCourse.title}</h2>
          <p>{selectedCourse.description}</p>
          <textarea
            className="textarea"
            placeholder="Leave your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <button onClick={handleSubmitFeedback} className="button">
            Submit Feedback
          </button>
        </div>
      )}
    </div>
  );
}
