import React, { useState, useEffect } from "react";
import "./MinecDownload.css";

const downloads = [
  {
    id: "windows",
    title: "Windows",
    href: "https://example.com/minec/windows-installer.exe",
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

const projectMembers = [
  { id: 1, firstname: "Sadmi", lastname: "Mohamed Riad", role: "USTHB Student" },
  { id: 2, firstname: "Boutaghou", lastname: "Maria Ghalia", role: "USTHB Student" },
  { id: 3, firstname: "Mentizi", lastname: "Rayane Rafik", role: "USTHB Student" },
  { id: 4, firstname: "Ait Ahcene", lastname: "Melissa", role: "USTHB Student" },
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
        Once a dataset is loaded, its name, number of rows, and columns are displayed.
        Use checkboxes to Select/Unselect attributes or Remove them.
        Click on an attribute to view its histogram and save it using 'Save Histogram'.
      </>
    ),
  },
  {
    id: "preprocessing",
    title: "Preprocessing Tab",
    content: (
      <>
        This module prepares data for analysis through transformation and cleaning tools.
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
          <li>Encode Data: Convert categorical data to numeric, and vice versa</li>
          <li>Normalize Data: Scale features</li>
          <li>Apply: Run the transformation and log in the Operation Message panel</li>
        </ul>

        <h4>Clean Section:</h4>
        <ul>
          <li>Delete Duplicates: Remove exact or near-duplicate rows</li>
          <li>Handle Missing Data: Fill with mean/median</li>
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

        <h4>Validation Methods:</h4>
        <ul>
          <li>Use Training Set: Apply estimation directly on training data</li>
          <li>Supplied Test Set: Load an external test dataset for evaluation</li>
          <li>Cross-Validation: Select number of folds</li>
          <li>Percentage Split: Split dataset into training/testing sets by a defined ratio</li>
        </ul>

        <h4>Target Selection:</h4>
        <p>Select the dependent variable (target column) for prediction</p>

        <h4>Algorithm:</h4>
        <p>
          Linear Regression: Estimate relationships between variables using a linear
          model
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
      <button type="button" className="btn-download" tabIndex={-1} aria-hidden="true">
        Download
      </button>
    </a>
  );
};

const CollapsibleSection = ({ title, isCollapsed, toggleCollapse, children, id }) => (
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
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeGuideStep, setActiveGuideStep] = useState(userGuideSteps[0].id);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="minec-page">
      <header className={`minec-header${headerScrolled ? " scrolled" : ""}`}>
        MINEC SOFTWARE DOWNLOAD
      </header>

      <main className="minec-main">
        {/* Download buttons */}
        <div className="download-buttons" role="region" aria-label="Download Minec software">
          {downloads.map((download) => (
            <DownloadCard
              key={download.id}
              {...download}
              hovered={hoveredCard}
              onHover={setHoveredCard}
            />
          ))}
        </div>

        {/* Software Description collapsible */}
        <CollapsibleSection
          id="software-description"
          title="Software Description and Project Members"
          isCollapsed={descCollapsed}
          toggleCollapse={() => setDescCollapsed(!descCollapsed)}
        >
          <div className="project-description">
            <p>
              MINEC is a powerful data mining application developed as a final year
              project by a team of 4 computer science students. The software provides
              tools for data preprocessing, analysis, and visualization.
            </p>

            <h3>Project Team</h3>
            <div className="team-grid">
              {projectMembers.map((member) => (
                <div key={member.id} className="team-member">
                  <div className="member-avatar">
                    {member.firstname.charAt(0)}
                    {member.lastname.charAt(0)}
                  </div>
                  <div className="member-info">
                    <strong>
                      {member.firstname} {member.lastname}
                    </strong>
                    <span>{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleSection>

        {/* User Guide collapsible */}
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
                  className={`guide-tab ${activeGuideStep === step.id ? "active" : ""}`}
                  onClick={() => setActiveGuideStep(step.id)}
                >
                  {step.title}
                </button>
              ))}
            </div>
            <div className="guide-content">
              {userGuideSteps.find((step) => step.id === activeGuideStep)?.content}
            </div>
          </div>
        </CollapsibleSection>

        {/* Video section */}
        <section className="video-section" aria-label="Tutorial video">
          <h2>Tutorial Video</h2>
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/sZrTJesvJeo?si=m36lvbHY63yvoQSp"
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
        <p className="version-info">Version 1.0.0 — Released June 2023</p>
      </footer>
    </div>
  );
}
