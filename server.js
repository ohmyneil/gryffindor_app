const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

  // Serve Gryffindor logo
  if (req.url === "/gryffindor-logo.png") {
    const imgPath = path.join(__dirname, "gryffindor-logo.png");
    const img = fs.readFileSync(imgPath);
    res.writeHead(200, { "Content-Type": "image/png" });
    res.end(img);
    return;
  }

  // Serve profile picture (updated to JPG)
  if (req.url === "/profile-picture.jpg") {
    const imgPath = path.join(__dirname, "profile-picture.jpg");
    const img = fs.readFileSync(imgPath);
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(img);
    return;
  }

  // Serve HTML page
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Neil's Programming Portfolio</title>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(135deg, #7A0A0A, #C8A951);
          color: #C8A951;
          line-height: 1.6;
          overflow-x: hidden;
          position: relative;
        }
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="%23C8A951" opacity="0.3"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite"/><animateMotion dur="10s" repeatCount="indefinite"><path d="M0,0 Q50,50 100,0"/></animateMotion></circle></svg>') repeat;
          pointer-events: none;
          z-index: -1;
          animation: dust 20s linear infinite;
        }
        @keyframes dust {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100vh); }
        }
        h1, h2, h3 {
          font-family: 'Cinzel', serif;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        /* Hero Section */
        .hero {
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: radial-gradient(circle, rgba(122, 10, 10, 0.8) 0%, rgba(200, 169, 81, 0.2) 100%);
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="%23C8A951"><animate attributeName="r" values="2;5;2" dur="2s" repeatCount="indefinite"/><animateMotion dur="5s" repeatCount="indefinite"><path d="M0,50 Q50,0 100,50 Q50,100 0,50"/></animateMotion></circle></svg>') repeat;
          opacity: 0.5;
          animation: parallax 10s ease-in-out infinite alternate;
        }
        @keyframes parallax {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20px); }
        }
        .crest {
          font-size: 6rem;
          color: #C8A951;
          margin-bottom: 20px;
          animation: glow-pulse 3s ease-in-out infinite alternate;
        }
        @keyframes glow-pulse {
          from { text-shadow: 0 0 10px #C8A951; }
          to { text-shadow: 0 0 30px #C8A951, 0 0 40px #C8A951; }
        }
        .profile-frame {
          width: 250px;
          height: 250px;
          border-radius: 50%;
          border: 5px solid #C8A951;
          overflow: hidden;
          margin: 0 auto 20px auto; /* Centered horizontally, small bottom margin for spacing */
          animation: shimmer 2s ease-in-out infinite alternate;
          box-shadow: 0 0 20px rgba(200, 169, 81, 0.5);
        }
        @keyframes shimmer {
          0% { border-color: #C8A951; box-shadow: 0 0 20px rgba(200, 169, 81, 0.5); }
          100% { border-color: #FFD700; box-shadow: 0 0 30px rgba(255, 215, 0, 0.8); }
        }
        .profile-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center; /* Ensures the image is centered within the frame */
        }
        .badge {
          background: #1A1A1A;
          border: 2px solid #C8A951;
          border-radius: 20px;
          padding: 10px 20px;
          margin: 20px 0;
          display: inline-block;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        }
        .badge h1 {
          font-size: 2rem;
          margin-bottom: 5px;
        }
        .badge p {
          font-size: 1rem;
          color: #C8A951;
        }
        .quote {
          font-size: 1.5rem;
          font-style: italic;
          margin-top: 20px;
          color: #FFFFFF;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
          border-left: 5px solid #C8A951;
          padding-left: 20px;
        }
        /* Section Styles */
        section {
          padding: 80px 0;
          background: rgba(26, 26, 26, 0.9);
          margin: 20px 0;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
          border: 2px solid #C8A951;
          opacity: 0;
          transform: translateY(50px);
          animation: fadeInUp 1s ease-out forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .section-title {
          text-align: center;
          margin-bottom: 40px;
          font-size: 2.5rem;
          color: #C8A951;
        }
        /* About Section */
        .about .values {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
        }
        .value {
          text-align: center;
          flex: 1;
          min-width: 200px;
          margin: 20px;
          padding: 20px;
          background: rgba(200, 169, 81, 0.1);
          border-radius: 10px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #C8A951;
        }
        .value:hover {
          transform: translateY(-10px);
          box-shadow: 0 0 20px rgba(200, 169, 81, 0.5);
        }
        .value i {
          font-size: 3rem;
          color: #C8A951;
          margin-bottom: 10px;
          animation: icon-glow 2s ease-in-out infinite alternate;
        }
        @keyframes icon-glow {
          from { filter: drop-shadow(0 0 5px #C8A951); }
          to { filter: drop-shadow(0 0 15px #C8A951); }
        }
        /* Founder Section */
        .founder-card {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          background: rgba(200, 169, 81, 0.1);
          border-radius: 15px;
          padding: 30px;
          transition: transform 0.3s ease;
        }
        .founder-card:hover {
          transform: scale(1.02);
        }
        .founder .portrait {
          width: 200px;
          height: 200px;
          background: #C8A951;
          border-radius: 50%;
          display: flex;*
          align-items: center;*
          justify-content: center;*
          margin-right: 40px;*
          box-shadow: 0 0 20px rgba(200, 169, 81, 0.5);
        }
        .founder .portrait i {
          font-size: 5rem;
          color: #7A0A0A;
        }
        .founder .info {
          max-width: 500px;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .founder-card:hover .info {
          opacity: 1;
        }
        /* Notable Members */
        .members .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .member {
          background: rgba(200, 169, 81, 0.1);
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #C8A951;
        }
        .member:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(200, 169, 81, 0.5);
        }
        .member i {
          font-size: 3rem;
          color: #C8A951;
          margin-bottom: 10px;
        }
        /* Common Room */
        .common-room .icons {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }
        .common-room .icon {
          margin: 20px;
          text-align: center;
        }
        .common-room .icon i {
          font-size: 4rem;
          color: #C8A951;
          margin-bottom: 10px;
          animation: flicker 1.5s ease-in-out infinite alternate;
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .banner {
          text-align: center;
          margin-top: 20px;
          animation: wave 3s ease-in-out infinite;
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
        /* Responsive */
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2rem;
          }
          .hero p {
            font-size: 1.2rem;
          }
          .section-title {
            font-size: 2rem;
          }
          .founder-card {
            flex-direction: column;
            text-align: center;
          }
          .founder .portrait {
            margin-right: 0;
            margin-bottom: 20px;
          }
          .profile-frame {
            width: 200px;
            height: 200px;
          }
          .crest {
            font-size: 4rem;
          }
        }
      </style>
    </head>
    <body>
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="profile-frame">
            <img src="/profile-picture.jpg" alt="Profile Picture">
          </div>
          <div class="crest"><i class="fas fa-code"></i></div>
          <div class="badge">
            <h1>Neil Ivan V. Tanamor</h1>
            <p>SM-4102</p>
          </div>
          <p class="quote">"Stand straight, walk proud, have a little faith"</p>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="about">
        <div class="container">
          <h2 class="section-title">About My Programming Skills</h2>
          <p style="text-align: center; margin-bottom: 40px;">I am passionate about coding, problem-solving, and building efficient software. My skills span multiple languages and frameworks, with a focus on web development and data structures.</p>
          <div class="values">
            <div class="value">
              <i class="fas fa-code"></i>
              <h3>Problem Solving</h3>
              <p>Analyzing and resolving complex issues with logical thinking.</p>
            </div>
            <div class="value">
              <i class="fas fa-laptop-code"></i>
              <h3>Web Development</h3>
              <p>Creating responsive and dynamic websites using modern technologies.</p>
            </div>
            <div class="value">
              <i class="fas fa-database"></i>
              <h3>Data Management</h3>
              <p>Handling databases and ensuring data integrity.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Founder Section -->
      <section id="founder" class="founder">
        <div class="container">
          <h2 class="section-title">My Programming Journey</h2>
          <div class="founder-card">
            <div class="portrait">
              <i class="fas fa-rocket"></i>
            </div>
            <div class="info">
              <p>My journey into programming began with curiosity and a desire to create. Starting with basic scripts, I've grown to develop full-stack applications, always learning new tools and techniques to stay ahead in the tech world.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Notable Members Section -->
      <section id="members" class="members">
        <div class="container">
          <h2 class="section-title">Key Skills & Technologies</h2>
          <div class="grid">
            <div class="member">
              <i class="fab fa-js-square"></i>
              <h3>JavaScript</h3>
              <p>Proficient in ES6+, Node.js, and front-end frameworks like React.</p>
            </div>
            <div class="member">
              <i class="fab fa-python"></i>
              <h3>Python</h3>
              <p>Experienced in scripting, data analysis, and machine learning basics.</p>
            </div>
            <div class="member">
              <i class="fab fa-html5"></i>
              <h3>HTML & CSS</h3>
              <p>Building semantic, accessible, and styled web pages.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Common Room Section -->
      <section id="common-room" class="common-room">
        <div class="container">
          <h2 class="section-title">My Development Environment</h2>
          <p style="text-align: center; margin-bottom: 40px;">A productive setup with essential tools for coding, debugging, and collaboration.</p>
          <div class="icons">
            <div class="icon">
              <i class="fas fa-terminal"></i>
              <p>Command Line</p>
            </div>
            <div class="icon">
              <i class="fab fa-git-alt"></i>
              <p>Version Control</p>
            </div>
            <div class="icon">
              <i class="fas fa-code-branch"></i>
              <p>IDEs & Editors</p>
            </div>
          </div>
          <div class="banner">
            <i class="fas fa-laptop" style="font-size: 5rem; color: #C8A951;"></i>
          </div>
        </div>
      </section>

      <script>
        // Simple scroll-triggered fade-in (basic JS for MVP)
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.animationDelay = '0s';
            }
          });
        });
        sections.forEach(section => observer.observe(section));
      </script>
    </body>
    </html>
  `);

  res.end();
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});