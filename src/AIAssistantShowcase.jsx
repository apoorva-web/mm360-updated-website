import { useState } from 'react'
import './AIAssistantShowcase.css'

const suggestedQuestions = [
  {
    id: 'top-dish',
    question: 'Which dish made the most money this month?',
    label: 'Top dish this month',
    value: '₹84,000',
    detail: 'Chicken Dum Biryani led by sales revenue across 320 portions. This is sales, not net profit.',
  },
  {
    id: 'gas-spend',
    question: 'How much did we spend on gas this month?',
    label: 'Gas spend · This month',
    value: '₹6,400',
    detail: 'That is the sample gas expense recorded for this month.',
  },
  {
    id: 'gas-compare',
    question: 'How does this compare with October?',
    label: 'Gas spend · month over month',
    value: '+12%',
    detail: 'This month: ₹6,400. Previous month: ₹5,714. This month is about 12% higher.',
  },
  {
    id: 'best-dishes',
    question: 'Which dishes are performing best?',
    label: 'Leading dishes · sales revenue',
    value: 'Chicken Dum Biryani',
    detail: '₹84,000 · Paneer Tikka ₹47,250 · Veg Biryani ₹39,200. Sample monthly figures, ranked by sales revenue.',
  },
]


function AIAssistantShowcase({ Icon }) {
  const [activeQuestion, setActiveQuestion] = useState(null)
  const selectedQuestion = suggestedQuestions.find(({ id }) => id === activeQuestion)

  return (
    <section className="ai-showcase-section" id="ai-assistant" aria-labelledby="ai-showcase-title">
      <div className="ai-showcase-container">
        <div className="ai-showcase-hero">
          <div className="ai-showcase-intro">
            <span className="ai-showcase-kicker"><Icon name="sparkles" size={16} /> INTRODUCING MACH</span>
            <h2 id="ai-showcase-title">Meet MACH, <em>your AI assistant.</em></h2>
            <p className="ai-showcase-subheading">Your intelligent companion for restaurant operations. Ask questions and explore business insights through a simple, conversational experience.</p>
            <span className="ai-addon-label">Paid add-on · Starting at ₹49/month</span>
            <p className="ai-preview-note">Interactive Preview · fixed sample restaurant data · no AI service or restaurant records connected.</p>
          </div>

          <div className="ai-chat-window" id="ai-interactive-demo">
            <div className="ai-chat-topbar">
              <div className="ai-chat-brand"><span className="ai-chat-mark"><Icon name="sparkles" size={17} /></span><span><b>MACH</b><small>Your AI assistant · Sample preview</small></span></div>
              <span className="ai-chat-sample-badge">SAMPLE DATA</span>
            </div>
            <div className="ai-chat-content">
              <p className="ai-chat-context">Explore example answers using a fixed, illustrative restaurant dataset.</p>
              <div aria-atomic="true" aria-live="polite">
                {selectedQuestion ? (
                  <div className="ai-chat-turn" key={selectedQuestion.id}>
                    <div className="ai-question-bubble">{selectedQuestion.question}</div>
                    <div className="ai-answer-bubble">
                      <span className="ai-response-label"><Icon name="sparkles" size={13} /> MACH · Sample response</span>
                      <strong>{selectedQuestion.label}</strong>
                      <b className="ai-response-value">{selectedQuestion.value}</b>
                      <p>{selectedQuestion.detail}</p>
                    </div>
                  </div>
                ) : (
                  <div className="ai-welcome-message">
                    <span className="ai-response-label"><Icon name="sparkles" size={13} /> Interactive Preview</span>
                    <p>Choose a suggested question to see a sample restaurant insight.</p>
                  </div>
                )}
              </div>
              <div className="ai-question-picker" aria-label="Suggested sample questions">
                <span>TRY A SAMPLE QUESTION</span>
                {suggestedQuestions.map(({ id, question }) => (
                  <button
                    aria-pressed={activeQuestion === id}
                    key={id}
                    onClick={() => setActiveQuestion(id)}
                    type="button"
                  >
                    {question}<Icon name="arrowRight" size={14} />
                  </button>
                ))}
              </div>
            </div>
            <div className="ai-chat-footer"><Icon name="check" size={14} /> Suggestions only. No bills, stock or money are changed.</div>
          </div>
        </div>


      </div>
    </section>
  )
}

export default AIAssistantShowcase
