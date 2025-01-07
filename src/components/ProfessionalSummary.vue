<template>
  <div class="window-container">
    <div class="window">
      <div class="window-header">
        <div class="window-title">
          <span class="user">user</span>
          <span class="separator">@</span>
          <span class="hostname">localhost</span>
          <span class="separator">:~/summary$</span>
          <span class="title-text">Professional Summary</span>
        </div>
        <div class="window-controls">
          <button class="minimize" @click="$emit('minimize')">−</button>
          <button class="maximize" @click="toggleMaximize">□</button>
          <button class="close" @click="$emit('close')">×</button>
        </div>
      </div>
      <div class="window-content">
        <div class="summary-container">
          <h2>Professional Summary</h2>
          <p>
            Experienced Systems Analyst and Lead Developer with over 5 years in
            the technology sector, specializing in automation, system
            optimization, and full-stack development. Proven track record of
            managing complex technical projects and implementing efficient
            solutions across diverse platforms.
          </p>

          <h3>Key Strengths</h3>
          <ul>
            <li>
              Strong Python development skills with extensive experience in
              automation and CLI tool creation
            </li>
            <li>
              Strong background in system administration across Linux and
              Windows environments
            </li>
            <li>
              Proficient in virtualization technologies including VMware,
              Docker, and Hyper-V
            </li>
            <li>
              Advanced understanding of database management systems and SQL
            </li>
            <li>
              Experienced in modern web development using Vue.js and related
              technologies
            </li>
          </ul>

          <h3>Professional Philosophy</h3>
          <p>
            I believe in creating elegant, efficient solutions that prioritize
            both user experience and system performance. My approach combines
            technical expertise with practical problem-solving skills, always
            staying current with emerging technologies while maintaining a focus
            on reliable, maintainable code.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfessionalSummary",
  data() {
    return {
      isMaximized: false,
    };
  },
  methods: {
    toggleMaximize() {
      this.isMaximized = !this.isMaximized;
    },
  },
};
</script>

<style scoped>
.window-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.window {
  background: #1e1e1e;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  height: 80vh;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.window.maximized {
  position: fixed;
  top: 36px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: calc(100vh - 36px);
  max-width: none;
  border-radius: 0;
  margin: 0;
}

.window-header {
  background: #2d2d2d;
  padding: 8px 12px;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
}

.window-title {
  color: #d3d3d3;
  font-size: 13px;
  display: flex;
  gap: 4px;
}

.user,
.hostname {
  color: #729fcf;
}

.separator {
  color: #d3d3d3;
}

.window-controls {
  display: flex;
  gap: 8px;
}

.window-controls button {
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #d3d3d3;
  background: transparent;
}

.window-controls button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.window-content {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  color: #ffffff;
  min-height: 0;
}

.summary-container {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 20px;
}

h2 {
  color: var(--accent-blue);
  margin-bottom: 1.5rem;
}

h3 {
  color: #729fcf;
  margin: 1.5rem 0 1rem;
}

p {
  margin-bottom: 1.2rem;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
}

li::before {
  content: ">";
  position: absolute;
  left: 0;
  color: var(--accent-blue);
}

@media (max-width: 768px) {
  .window {
    width: 90%;
    height: 70vh;
    margin: 20px 0;
  }

  .window-container {
    align-items: flex-start;
    padding-top: 20px;
  }
}
</style>
