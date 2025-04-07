import React, { useState } from "react";

const sampleCourses = [
  {
    id: 1,
    title: "Zero Trust + Data Risk Insightss",
    description: "This webinar explores Zero Standing Privileges (ZSP) as a key to Zero Trust, sharing expert insights and practical steps to align mindset and infrastructure for continuous verification and least privilege."
  },
  {
    id: 2,
    title: "Cybersecurity Essentials",
    description: "Understand the principles of securing digital environments."
  },
  {
    id: 3,
    title: "Data Privacy in the Cloud",
    description: "Explore strategies for protecting data in cloud systems."
  }
];

export default function VirtualTrainingApp() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [feedback, setFeedback] = useState("");

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>Photon Dynamics Training Modules</h1>
      {!selectedCourse ? (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {sampleCourses.map(course => (
            <div key={course.id} onClick={() => setSelectedCourse(course)} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: '#fff',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedCourse(null)} style={{ marginBottom: '1rem' }}>← Back to Courses</button>
          <div style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            backgroundColor: '#fff'
          }}>
            <h2>{selectedCourse.title}</h2>
            <p>{selectedCourse.description}</p>
            <textarea
              placeholder="Leave your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              style={{ width: '100%', height: '100px', margin: '1rem 0' }}
            />
            <button onClick={() => alert("Feedback submitted! Thank you.")}>Submit Feedback</button>
          </div>
        </div>
      )}
    </div>
  );
}