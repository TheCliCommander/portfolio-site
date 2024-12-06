<template>
  <div class="terminal-container" :class="{ shrink: loadingComplete }">
    <div class="terminal">
      <div class="terminal-prompt">
        <span class="user">user@localhost</span>
        <span class="separator">-$:</span>
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
</template>

<script>
export default {
  name: "SubliminalMessage",
  data() {
    return {
      loadingComplete: false,
      terminalMessages: [],
      wordList: [
        "sudo apt-get install michael-ryberg",
        "Installing professional developer package...",
        "Loading Vue.js expertise...",
        "Importing JavaScript mastery...",
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
  },
};
</script>

<style scoped>
.terminal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  max-width: 800px;
  height: 80vh;
  margin: 0;
  border-radius: 8px;
  transition: all 1s ease;
  z-index: 100;
  background: rgba(18, 18, 18, 0.95);
}

.terminal-container.shrink {
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
}

.terminal-prompt {
  color: #00ff00;
  margin-bottom: 1rem;
  font-weight: bold;
}

.user {
  color: #00ff00;
}

.separator {
  color: #ff9900;
}

.terminal-output {
  padding-left: 0.5rem;
}

.terminal-line {
  color: #ffffff;
  opacity: 0;
  transform: translateY(5px);
  transition: all 0.2s ease;
  margin: 0.1rem 0;
  white-space: nowrap;
}

.terminal-line.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.terminal-container::-webkit-scrollbar {
  width: 8px;
}

.terminal-container::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.terminal-container::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}

.terminal-container::-webkit-scrollbar-thumb:hover {
  background: #444;
}

.terminal {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}
</style>
