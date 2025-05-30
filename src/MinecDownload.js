import React, { useState, useEffect } from "react";
import "./MinecDownload.css";
import FeedbackForm from "./FeedbackForm";

const downloads = [
  {
    id: "windows",
    title: "Windows",
    href: "https://drive.google.com/uc?export=download&id=1y-5b-9LYaCLPjE1d_71woXo4aAtNInau",
    imgSrc:
      "https://img.utdstc.com/icon/031/b07/031b07c479e002248b33eb31a0d40ad4658ec533f84c444d36fe656c9f448a88:200",
    alt: "Windows Logo",
  },
  {
    id: "macos",
    title: "macOS",
    href: "https://example.com/minec/macos-installer.dmg",
    imgSrc: "https://cdn-icons-png.flaticon.com/512/2/2235.png",
    alt: "Apple Logo",
  },
];

// Team members including two supervisors
const projectMembers = [
  {
    id: 0,
    firstname: "Pr Baba-Ali",
    lastname: "Riadh",
    role: "Supervisor",
    email: "riadhbabaali@yahoo.fr",
    supervisor: true,
  },
  {
    id: 1,
    firstname: "Dr Madi",
    lastname: "Sarah",
    role: "Co-supervisor",
    email: "eng.s.madi@gmail.com",
    supervisor: true,
  },
  {
    id: 2,
    firstname: "Sadmi",
    lastname: "Mohamed Riad",
    role: "USTHB Student",
    email: "sadriad01@gmail.com",
  },
  {
    id: 3,
    firstname: "Boutaghou",
    lastname: "Maria Ghalia",
    role: "USTHB Student",
    email: "boutaghoumaria@gmail.com",
  },
  {
    id: 4,
    firstname: "Mentizi",
    lastname: "Rayane Rafik",
    role: "USTHB Student",
    email: "rayane.mt25@gmail.com",
  },
  {
    id: 5,
    firstname: "Ait Ahcene",
    lastname: "Melissa",
    role: "USTHB Student",
    email: "melissaaitahcene04@gmail.com",
  },
];

const userGuideSteps = [
  {
    id: "import",
    title: "Import Tab",
    content: (
      <>
        Helps you load, inspect, and prepare your dataset.
        <ul>
          <li>
            <strong>File &gt; Open:</strong> Load a CSV dataset
          </li>
          <li>
            <strong>File &gt; Save / Save As:</strong> Save your dataset
          </li>
          <li>
            <strong>Edit &gt; Undo:</strong> Revert last action
          </li>
          <li>
            <strong>Help &gt; About / User Guide:</strong> Access info and help
          </li>
          <li>
            <strong>View:</strong> Minimize, Maximize, or Close the app
          </li>
        </ul>
        Once a dataset is loaded, its name, number of rows, and columns are
        displayed. Use checkboxes to Select/Unselect attributes or Remove them.
        Click on an attribute to view its histogram and save it using 'Save
        Histogram'.
      </>
    ),
  },
  {
    id: "preprocessing",
    title: "Preprocessing Tab",
    content: (
      <>
        This module prepares data for analysis through transformation and
        cleaning tools.
        <h4>File Menu:</h4>
        <ul>
          <li>Open: Load a dataset</li>
          <li>Save / Save As: Save your processed dataset</li>
          <li>Exit: Close the application</li>
        </ul>
        <h4>Dataset Overview:</h4>
        <p>Displays selected attributes</p>
        <h4>Select Attribute:</h4>
        <ul>
          <li>Select All / Unselect All: Choose attributes for processing</li>
        </ul>
        <h4>Operation Message:</h4>
        <p>Shows operation output and logs each transformation</p>
        <h4>Transform Section:</h4>
        <ul>
          <li>
            Encode Data: Convert categorical data to numeric, and vice versa
          </li>
          <li>Normalize Data: Scale features</li>
          <li>
            Apply: Run the transformation and log in the Operation Message panel
          </li>
        </ul>
        <h4>Clean Section:</h4>
        <ul>
          <li>Delete Duplicates: Remove exact or near-duplicate rows</li>
          <li>Handle Missing Data: Fill with mean/median/KNN</li>
          <li>Handle Outliers: Options: IQR or Isolation Forest</li>
          <li>Handle Imbalanced Data: SMOTE</li>
        </ul>
        <h4>Tips:</h4>
        <ul>
          <li>Start with transformations before cleaning</li>
          <li>Use Undo (Ctrl+Z) to revert</li>
          <li>Save intermediate files to track your process</li>
        </ul>
      </>
    ),
  },
  {
    id: "analysis",
    title: "Analysis Tab",
    content: (
      <>
        <h4>Menu Bar:</h4>
        <ul>
          <li>File: Open, Save, Save As</li>
          <li>Edit: Undo, Model Parameters</li>
          <li>Help: About, User Guide</li>
          <li>View: Minimize, Maximize, Close</li>
        </ul>

        <h4>Test Methods:</h4>
        <ul>
          <li>Use Training Set: Apply estimation directly on training data</li>
          <li>
            Supplied Test Set: Load an external test dataset for evaluation
          </li>
          <li>Cross-Validation: Select number of folds</li>
          <li>
            Percentage Split: Split dataset into training/testing sets by a
            defined ratio
          </li>
        </ul>

        <h4>Target Selection:</h4>
        <p>Select the dependent variable (target column) for prediction</p>

        <h4>Algorithm:</h4>
        <p>
          Linear Regression: Estimate relationships between variables using a
          linear model
        </p>

        <h4>Apply Estimation:</h4>
        <p>Click Apply to run the selected estimation method</p>

        <h4>Visualization:</h4>
        <p>View the Linear Equation for the trained model</p>

        <h4>Estimator Output:</h4>
        <ul>
          <li>Upload Model: Load a previously saved model</li>
          <li>Save Model: Save the trained model for future use</li>
          <li>Save Result: Export prediction results to a file</li>
        </ul>
      </>
    ),
  },
];

const DownloadCard = ({ id, title, href, imgSrc, alt, hovered, onHover }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <a
      href={href}
      download
      className={`download-card${hovered === id ? " hovered" : ""}`}
      role="button"
      aria-label={`Download Minec software for ${title}`}
      onMouseEnter={() => {
        setIsHovering(true);
        onHover(id);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        onHover(null);
      }}
      onFocus={() => onHover(id)}
      onBlur={() => onHover(null)}
    >
      <div className="download-icon" aria-hidden="true">
        <img
          src={imgSrc}
          alt={alt}
          style={{
            width: "80px",
            height: "80px",
            transform: isHovering ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        />
      </div>
      <h3 className="download-title">{title}</h3>
      <button
        type="button"
        className="btn-download"
        tabIndex={-1}
        aria-hidden="true"
      >
        Download
      </button>
    </a>
  );
};

const CollapsibleSection = ({
  id,
  title,
  isCollapsed,
  toggleCollapse,
  children,
}) => (
  <section aria-labelledby={`${id}-heading`}>
    <h2
      id={`${id}-heading`}
      tabIndex={0}
      role="button"
      aria-expanded={!isCollapsed}
      aria-controls={`${id}-content`}
      className={`section-title${isCollapsed ? " collapsed" : ""}`}
      onClick={toggleCollapse}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleCollapse();
        }
      }}
    >
      {title}
      <span aria-hidden="true" className="toggle-icon">
        {isCollapsed ? "▶" : "▼"}
      </span>
    </h2>
    <div
      id={`${id}-content`}
      className={`section-content${isCollapsed ? " hidden" : ""}`}
      aria-labelledby={`${id}-heading`}
    >
      {children}
    </div>
  </section>
);

export default function MinecDownload() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [descCollapsed, setDescCollapsed] = useState(false);
  const [guideCollapsed, setGuideCollapsed] = useState(true);
  const [feedbackCollapsed, setFeedbackCollapsed] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeGuideStep, setActiveGuideStep] = useState(userGuideSteps[0]?.id);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const supervisors = projectMembers.filter((m) => m.supervisor);
  const students = projectMembers.filter((m) => !m.supervisor);

  return (
    <div className="minec-page">
      <header className={`minec-header${headerScrolled ? " scrolled" : ""}`}>
        MINEC SOFTWARE DOWNLOAD
      </header>

      <main className="minec-main">
        {/* Download buttons */}
        <div
          className="download-buttons"
          role="region"
          aria-label="Download Minec software"
        >
          {downloads.map((dl) => (
            <DownloadCard
              key={dl.id}
              {...dl}
              hovered={hoveredCard}
              onHover={setHoveredCard}
            />
          ))}
        </div>
        {/* Software Description & Team */}
        <CollapsibleSection
          id="software-description"
          title="Software Description and Project Members"
          isCollapsed={descCollapsed}
          toggleCollapse={() => setDescCollapsed(!descCollapsed)}
        >
          <div className="project-description">
            <p>
              MINEC is a powerful data mining application developed as a final
              year project by a team of 4 computer science students under the
              supervision of{" "}
              <strong>
                {supervisors
                  .map((s) => `${s.firstname} ${s.lastname}`)
                  .join(" and ")}
              </strong>
              . The software provides tools for data preprocessing, analysis,
              and visualization.
            </p>

            <h3 style={{ textAlign: "center" }}>Supervisors</h3>
            <div className="supervisor-grid">
              {supervisors.map((sup) => (
                <div key={sup.id} className="team-member supervisor">
                  <div className="member-avatar">
                    {sup.firstname.charAt(0)}
                    {sup.lastname.charAt(0)}
                  </div>
                  <div className="member-info">
                    <strong>
                      {sup.firstname} {sup.lastname}
                    </strong>
                    <span>{sup.role}</span>
                  </div>
                  <a href={`mailto:${sup.email}`} className="contact-link">
                    Contact
                  </a>
                </div>
              ))}
            </div>

            <h3 style={{ marginTop: "2rem" }}>Project Team</h3>
            <div className="team-grid">
              {students.map((m) => (
                <div key={m.id} className="team-member">
                  <div className="member-avatar">
                    {m.firstname.charAt(0)}
                    {m.lastname.charAt(0)}
                  </div>
                  <div className="member-info">
                    <strong>
                      {m.firstname} {m.lastname}
                    </strong>
                    <span>{m.role}</span>
                  </div>
                  <a href={`mailto:${m.email}`} className="contact-link">
                    Contact
                  </a>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleSection>
        {/* User Guide */}
        <CollapsibleSection
          id="user-guide"
          title="User Guide"
          isCollapsed={guideCollapsed}
          toggleCollapse={() => setGuideCollapsed(!guideCollapsed)}
        >
          <div className="guide-container">
            <div className="guide-tabs">
              {userGuideSteps.map((step) => (
                <button
                  key={step.id}
                  className={`guide-tab ${
                    activeGuideStep === step.id ? "active" : ""
                  }`}
                  onClick={() => setActiveGuideStep(step.id)}
                >
                  {step.title}
                </button>
              ))}
            </div>
            <div className="guide-content">
              {
                userGuideSteps.find((step) => step.id === activeGuideStep)
                  ?.content
              }
            </div>
          </div>
        </CollapsibleSection>
        {/* Feedback Section */}
        <CollapsibleSection
          id="feedback"
          title="Feedback"
          isCollapsed={feedbackCollapsed}
          toggleCollapse={() => setFeedbackCollapsed(!feedbackCollapsed)}
        >
          <FeedbackForm />
        </CollapsibleSection>
        {/* Tutorial Video */}
        <section className="video-section" aria-label="Tutorial video">
          <h2>Tutorial Video</h2>
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/tbxE44zIpoE?controls=1"
              title="Minec Software Tutorial Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>
      </main>

      <footer className="minec-footer">
        <p>
          Public project — code available on{" "}
          <a
            href="https://github.com/Sadmi-Riad/DataMiningSoftware"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
        <p className="version-info">Version 1.0.0 — Released June 2025</p>
      </footer>
    </div>
  );
}
