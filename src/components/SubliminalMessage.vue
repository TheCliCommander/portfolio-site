<template>
  <div class="window-container" :class="{ shrink: loadingComplete }">
    <div class="window" :class="{ maximized: isMaximized }">
      <div class="window-header">
        <div class="window-title">
          <span class="user">user</span>
          <span class="separator">@</span>
          <span class="hostname">localhost</span>
          <span class="separator">:/usr/bin/michael-ryberg$</span>
        </div>
        <div class="window-controls">
          <button class="minimize">−</button>
          <button class="maximize" @click="toggleMaximize">□</button>
          <button class="close">×</button>
        </div>
      </div>
      <div class="window-content">
        <div class="terminal">
          <div class="terminal-prompt">
            <span class="user">user</span>
            <span class="separator">@</span>
            <span class="hostname">localhost</span>
            <span class="separator">:/usr/bin$</span>
          </div>
          <div class="terminal-output">
            <div
              v-for="(message, index) in terminalMessages"
              :key="index"
              :class="['terminal-line', { 'fade-in': message.visible }]"
              :style="{ transitionDelay: `${index * 50}ms` }"
            >
              {{ message.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubliminalMessage",
  data() {
    return {
      loadingComplete: false,
      isMaximized: false,
      terminalMessages: [],
      wordList: [
        "sudo apt-get install michael-ryberg",
        "Installing professional developer package...",
        "Loading Vue.js expertise...",
        "Importing JavaScript expertise...",
        "Importing Python mastery...",
        "Importing C# skills...",
        "Analyzing code quality: EXCELLENT",
        "Testing problem-solving capabilities: 100%",
        "Checking Linux administration skills: ADVANCED",
        "Verifying Git proficiency: EXPERT",
        "Loading team collaboration modules...",
        "Scanning communication protocols: EFFECTIVE",
        "Measuring adaptation coefficient: HIGH",
        "Importing creative solutions database...",
        "Running productivity diagnostics: OPTIMAL",
        "Checking project management skills: VERIFIED",
        "Loading full-stack capabilities...",
        "System analysis: HIRE IMMEDIATELY",
        "Calculating ROI potential: EXCEPTIONAL",
        "Deploying innovation protocols...",
        "Talent assessment complete: PERFECT MATCH",
        "Final recommendation: HIRE MICHAEL RYBERG",
        "Warning: Candidate may be acquired by competitors",
        "Critical action required: EXTEND OFFER NOW",
      ],
      currentIndex: 0,
    };
  },
  mounted() {
    this.startTerminalAnimation();
  },
  methods: {
    startTerminalAnimation() {
      const addMessage = () => {
        if (this.currentIndex < this.wordList.length) {
          this.terminalMessages.push({
            text: this.wordList[this.currentIndex],
            visible: false,
          });

          setTimeout(() => {
            this.terminalMessages[this.currentIndex].visible = true;
            this.currentIndex++;

            if (this.currentIndex < this.wordList.length) {
              setTimeout(addMessage, 300);
            } else {
              this.addDots();
            }
          }, 30);
        }
      };

      addMessage();
    },
    addDots() {
      let dotCount = 0;
      const dotInterval = setInterval(() => {
        if (dotCount < 5) {
          if (dotCount === 0) {
            this.terminalMessages.push({
              text: ".",
              visible: true,
            });
          } else {
            this.terminalMessages[this.terminalMessages.length - 1].text += ".";
          }
          dotCount++;
        } else {
          clearInterval(dotInterval);
          setTimeout(() => {
            this.loadingComplete = true;
            this.$emit("loading-complete");
          }, 2000);
        }
      }, 1000);
    },
    toggleMaximize() {
      this.isMaximized = !this.isMaximized;
    },
  },
};
</script>

<style scoped>
.window-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  max-width: 800px;
  height: 80vh;
  z-index: 2000;
}

.window-container.shrink {
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  pointer-events: none;
}

.window {
  background: #1e1e1e;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
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

.user {
  color: #729fcf;
}
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
  height: calc(100% - 76px);
  overflow-y: auto;
  background: #1e1e1e;
}

.terminal-output {
  padding-left: 2.5rem;
  font-family: monospace;
  font-size: 14px;
  color: #ffffff;
}

.terminal-line {
  padding-left: 1.5rem;
  color: #ffffff;
  opacity: 0;
  transform: translateY(5px);
  transition: all 0.2s ease;
  margin: 0.1rem 0;
  white-space: nowrap;
  font-family: monospace;
}

.terminal-line.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.terminal-prompt {
  display: flex;
  gap: 4px;
  margin-bottom: 1rem;
  font-family: monospace;
}

.terminal-prompt .user {
  color: #729fcf;
}
.terminal-prompt .hostname {
  color: #729fcf;
}
.terminal-prompt .separator {
  color: #d3d3d3;
}
</style>
