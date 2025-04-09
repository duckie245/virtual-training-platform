import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import "../App.css"; // keep this for styling
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';


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

export default function Dashboard() {
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
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('You have been logged out!');
    } catch (error) {
      alert('Error logging out: ' + error.message);
    }
  };

  return (
    <div className="container">
      {/* Always visible header & logout button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Virtual Training Platform (Firebase Connected)</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
  
      {/* Course or Feedback View */}
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
          <button onClick={() => setSelectedCourse(null)} className="button mb-4">
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
          <button onClick={handleSubmitFeedback} className="button mt-2">
            Submit Feedback
          </button>
        </div>
      )}
    </div>
  );  
}
