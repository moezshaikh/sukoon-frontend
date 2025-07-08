import React from 'react';
import '../style/resource.css';
import selfHelpImg from '../assets/selfhelp.jpg'; // make sure this path is correct
import meditationImg from '../assets/med.jpg';
import emergencyImg from '../assets/x.jpg';
import journalImg from '../assets/journal.jpg';
import therapyImg from '../assets/therepy.jpg';
import booksImg from '../assets/books.jpg';
import affirmationsImg from '../assets/affir.jpg';


function ResourcesPage() {
  return (
    <div className="resources-wrapper">
      <section className="resource-section" id="self-help">
  <div className="self-help-container">
    <div className="self-help-text">
      <h2 className="resource-title">Self-Help Guides</h2>
      <p className="resource-description">
        Explore articles and PDFs on:
      </p>
      <ul className="resource-list">
        <li>Dealing with Anxiety</li>
        <li>Understanding Depression</li>
        <li>Coping with Loneliness</li>
        <li>Grounding Techniques</li>
        <li>Building Self-Esteem</li>
      </ul>
      <button className="self-help-button">Read Guides</button>
    </div>
    
    <div className="self-help-image">
      <img src={selfHelpImg} alt="Self Help" />
    </div>
  </div>
</section>



      {/* Mindfulness & Meditation Section */}
      <section className="resource-section" id="mindfulness">
        <div className="mindfulness-container">
          <div className="mindfulness-text">
            <h2 className="resource-title">Mindfulness & Meditation Tools</h2>
            <p className="resource-description">
              Access practical tools like:
              <ul>
                <li>Breathing Exercises</li>
                <li>Body Scan Audios</li>
                <li>5–10 Minute Guided Meditations</li>
                <li>Embedded YouTube Sessions</li>
              </ul>
            </p>
            <button className="mindfulness-button">Start Relaxing</button>
          </div>
          <div className="mindfulness-image">
            <img src={meditationImg} alt="Mindfulness meditation" />
          </div>
        </div>
      </section>

      {/* Emergency Contacts Section */}
      <section className="resource-section" id="emergency">
        <div className="emergency-container">
          <div className="emergency-text">
            <h2 className="resource-title">Emergency & Helpline Contacts</h2>
            <p className="resource-description">
              Get immediate support from trusted helplines:
              <ul>
                <li>📞 iCall (India): +91 9152987821</li>
                <li>📞 AASRA: +91-9820466726</li>
                <li>🌐 Global: Use 911 or local crisis lines</li>
              </ul>
              Help is always just a call away. You're not alone.
            </p>
            <button className="emergency-button">Need Help Now?</button>
          </div>
          <div className="emergency-image">
            <img src={emergencyImg} alt="Emergency support visual" />
          </div>
        </div>
      </section>

      {/* Journals Section */}
      <section className="resource-section" id="journals">
        <div className="journals-container">
          <div className="journals-text">
            <h2 className="resource-title">Mood Journal Templates</h2>
            <p className="resource-description">
              Track your feelings with:
              <ul>
                <li>Daily Mood Logs</li>
                <li>Gratitude Templates</li>
                <li>Trigger Worksheets (PDFs & Images)</li>
              </ul>
            </p>
            <button className="journals-button">Download Templates</button>
          </div>
          <div className="journals-image">
            <img src={journalImg} alt="Mood journal" />
          </div>
        </div>
      </section>

      {/* Therapy Section */}
      <section className="resource-section" id="therapy">
        <div className="therapy-container">
          <div className="therapy-text">
            <h2 className="resource-title">Therapy & Counseling Directory</h2>
            <p className="resource-description">
              Browse trusted platforms:
              <ul>
                <li>Affordable Online Therapy</li>
                <li>NGO-based Support</li>
                <li>Local Mental Health Clinics</li>
              </ul>
            </p>
            <button className="therapy-button">Explore Directory</button>
          </div>
          <div className="therapy-image">
            <img src={therapyImg} alt="Therapy support" />
          </div>
        </div>
      </section>

      {/* Book & Apps Section */}
      <section className="resource-section" id="books-apps">
        <div className="books-container">
          <div className="books-text">
            <h2 className="resource-title">Book & App Recommendations</h2>
            <p className="resource-description">
              Improve your habits with:
              <ul>
                <li>"Atomic Habits", "The Happiness Trap"</li>
                <li>Apps like Insight Timer, Finch, Sukoon</li>
              </ul>
            </p>
            <button className="books-button">See Recommendations</button>
          </div>
          <div className="books-image">
            <img src={booksImg} alt="Mental wellness books and apps" />
          </div>
        </div>
      </section>

      {/* Affirmations Section */}
      <section className="resource-section" id="affirmations">
        <div className="affirmations-container">
          <div className="affirmations-text">
            <h2 className="resource-title">Daily Affirmations & Quote Wall</h2>
            <p className="resource-description">
              Discover uplifting reminders:
              <ul>
                <li>Faith-based quotes</li>
                <li>Copy or Download Anytime</li>
              </ul>
            </p>
            <button className="affirmations-button">View Quotes</button>
          </div>
          <div className="affirmations-image">
            <img src={affirmationsImg} alt="Daily affirmations" />
          </div>
        </div>
      </section>

  
    </div>
  );
}


export default ResourcesPage;
