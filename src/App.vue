<template>
  <div class="app">
    <SubliminalMessage @loading-complete="handleLoadingComplete" />

    <div
      class="desktop"
      :class="{ 'fade-in': isLoaded, 'transition-out': isTransitioningToTCW }"
    >
      <!-- GNOME Top Bar -->
      <div class="top-bar">
        <div class="activities-button" @click="toggleActivitiesMenu">
          Activities
        </div>
        <div class="activities-menu" v-show="showActivitiesMenu">
          <div class="menu-item" @click="handleMenuClick('summary')">
            Professional Summary
          </div>
          <div class="menu-item" @click="handleMenuClick('resume')">Resume</div>
          <div class="menu-item" @click="handleMenuClick('web')">
            Web Projects
          </div>
          <div class="menu-item" @click="handleMenuClick('desktop')">
            Desktop Apps
          </div>
          <div class="menu-item" @click="handleMenuClick('cli')">
            Command Line Tools
          </div>
        </div>
        <div class="clock">{{ currentTime }}</div>
        <div class="system-tray">
          <span>🔊</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      <!-- Desktop Content -->
      <div class="desktop-content">
        <h1 class="flashing-text">
          <span class="text text-1">Michael Ryberg</span>
          <span class="text text-2">Hire</span>
        </h1>
        <div class="bio-container">
          <div class="profile-image-container">
            <img :src="selfCutout" alt="Michael Ryberg" class="profile-image" />
          </div>
          <p class="bio">{{ bio }}</p>
        </div>
      </div>

      <!-- Dock/App Bar -->
      <div class="dock" :class="{ 'fade-out': isTransitioningToTCW }">
        <div
          v-for="project in projects"
          :key="project.id"
          class="dock-icon"
          @click="openProject(project)"
          @mouseover="setHoveredProject(project)"
          @mouseleave="clearHoveredProject"
        >
          <img :src="project.icon" :alt="project.title" />
          <span class="tooltip">{{ project.title }}</span>
          <div v-if="hoveredProject === project" class="hover-image">
            <img :src="project.image" :alt="project.title" />
          </div>
        </div>
      </div>
    </div>

    <div class="dark-overlay" :class="{ 'fade-in': isLoaded }"></div>

    <ProjectWindow
      v-if="activeProject"
      :project="activeProject"
      @close="closeProject"
    />
  </div>
</template>

<script>
import SubliminalMessage from "./components/SubliminalMessage.vue";
import PassBox2 from "./components/images/PassBox2.png";
import OnTime2 from "./components/images/OnTime2.png";
import selfCutout from "./components/images/selfCutout.png";
import ProjectWindow from "./components/ProjectWindow.vue";
import TCWLogo from "./assets/images/TCWLogo.png";

export default {
  name: "App",
  components: {
    SubliminalMessage,
    ProjectWindow,
  },
  setup() {
    return {
      selfCutout,
    };
  },
  data() {
    return {
      isLoaded: false,
      currentTime: "",
      bio: "Experienced Systems Analyst and Lead Developer with over 5 years in the computer science field...",
      showActivitiesMenu: false,
      isTransitioningToTCW: false,
      activeProject: null,
      projects: [
        {
          id: 1,
          title: "Command Line Passbox",
          icon: "/icons/terminal.svg",
          image: PassBox2,
          description:
            "A command line tool for generating secure passwords and storing them in a sqlite database. It is built with Python and SQLlite. Can be used on any platform, Linux, Mac, Windows.",
          video: "https://www.youtube.com/watch?v=your_video_id",
        },
        {
          id: 2,
          title: "Web Project",
          icon: "/icons/web-browser.svg",
          description:
            "A freelance project for The Capital Worker, a local organization with whom my relationship is purely professional, regarding their website needs alone.Any views or opinions on the website are those of the customer(The Capital Worker) and not myself. The website is built with Vue.js/node.js/express.js/PostgreSQL. Hosted on Ionos VPS Debian 12 machine. Maintained entirely by myself. The org sends me articles they want uploaded and I have a script that formats them into json with html inline for text formatting which I use on Termux and scp them to the server. At that point another script is fired to restart the server and the new content is live. The site has two databases, one for the contact form and one for the forum.",
          image: TCWLogo,
          video: "https://thecapitalworker.com",
        },
        {
          id: 3,
          title: "On Time",
          icon: "/icons/codeblocks.svg",
          image: OnTime2,
          video: require("@/components/videos/OnTime.mp4"),
        },
        {
          id: 4,
          title: "System Admin",
          icon: "/icons/preferences-system.svg",
          image: "placeholder-jpg",
          video: "https://www.youtube.com/watch?v=your_video_id",
        },
        {
          id: 5,
          title: "Network Project",
          icon: "/icons/network-workgroup.svg",
          image: "placeholder-jpg",
          video: "https://www.youtube.com/watch?v=your_video_id",
        },
      ],
      hoveredProject: null,
      showVideo: false,
      showTerminal: false,
      terminalMessages: [],
    };
  },
  methods: {
    handleLoadingComplete() {
      this.isLoaded = true;
    },
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    },
    openProject(project) {
      if (project.id === 2) {
        // Capital Worker project
        this.openCapitalWorker();
        return;
      }
      this.activeProject = project;
      this.hoveredProject = null;
    },
    closeProject() {
      this.activeProject = null;
      this.hoveredProject = null;
    },
    openCapitalWorker() {
      this.isTransitioningToTCW = true;
      setTimeout(() => {
        window.location.href = "https://thecapitalworker.com";
      }, 1000);
    },
    runTerminalCommand(project) {
      this.terminalMessages = [
        { text: `user@localhost:~$ cd '${project.title}'`, visible: true },
        { text: `user@localhost:~/'${project.title}'$`, visible: false },
        { text: `user@localhost:~/$./'${project.title}'`, visible: false },
        { text: "Loading...", visible: false },
      ];
      this.showTerminal = true;

      setTimeout(() => {
        this.terminalMessages[1].visible = true;
        setTimeout(() => {
          this.terminalMessages[2].visible = true;
          setTimeout(() => {
            this.terminalMessages[3].visible = true;
            setTimeout(() => {
              this.showTerminal = false;
              setTimeout(() => {
                if (project.id === 3) {
                  this.showVideo = true;
                } else if (project.video) {
                  window.open(project.video, "_blank");
                }
              }, 500);
            }, 2000);
          }, 1000);
        }, 1000);
      }, 1000);
    },
    setHoveredProject(project) {
      this.hoveredProject = project;
    },
    clearHoveredProject() {
      this.hoveredProject = null;
    },
    toggleActivitiesMenu() {
      this.showActivitiesMenu = !this.showActivitiesMenu;
    },
    handleMenuClick(section) {
      this.showActivitiesMenu = false;
      // Handle navigation/actions here
      switch (section) {
        case "summary":
          console.log("Professional Summary");
          break;
        case "resume":
          console.log("Navigating to Resume");
          break;
        case "web":
          console.log("Navigating to Web Projects");
          break;
        case "desktop":
          console.log("Navigating to Desktop Apps");
          break;
        case "cli":
          console.log("Navigating to Command Line Tools");
          break;
      }
    },
  },
  mounted() {
    setInterval(this.updateTime, 1000);
    this.updateTime();
    document.addEventListener("click", (event) => {
      if (
        event.target.closest(".dock-icon") ||
        event.target.closest(".terminal") ||
        event.target.closest(".video-container video")
      ) {
        return;
      }
      this.closeProject();
    });
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeProject);
  },
};
</script>

<style>
:root {
  --gnome-bg: #39373b;
  --top-bar-bg: rgba(0, 0, 0, 0.85);
  --accent-blue: #007aff;
  --dock-bg: rgba(0, 0, 0, 0.7);
  --dark-bg: rgba(18, 18, 18, 0.95);
}

html,
body {
  margin: 0;
  padding: 0;
  background-color: var(--gnome-bg);
  min-height: 100vh;
}

.app {
  background-image: url("@/components/images/defaultBackground.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.desktop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: bottom-center;
}

.desktop.fade-in {
  opacity: 1;
}

.desktop.transition-cut {
  transform: scale(0);
  opacity: 0;
  transition: all is cubic-bezier(0.4, 0, 0.2, 1);
}

.dock {
  transition: opacity 0.5s ease;
}

.dock.fade-out {
  opacity: 0;
}

.fade-in {
  opacity: 1;
}

.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 28px;
  background: var(--top-bar-bg);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  color: white;
  font-size: 14px;
  z-index: 1000;
}

.activities-button {
  cursor: pointer;
  padding: 0 12px;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.activities-button:hover {
  color: var(--accent-blue);
}

.activities-menu {
  position: absolute;
  top: 28px;
  left: 0;
  background: var(--dark-bg);
  min-width: 220px;
  padding: 8px 0;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  z-index: 1001;
}

.menu-item {
  padding: 10px 16px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background: var(--accent-blue);
}

.desktop-content {
  height: 100vh;
  padding: 60px 20px;
  color: white;
  text-align: center;
  overflow: hidden;
}

.bio-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  color: white;
  background: rgba(0, 0, 0, 0.3);
}

.bio-container::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1) 1px,
    transparent 2px
  );
  opacity: 0.5;
  z-index: -1;
  animation: smokeMove 15s linear infinite;
}

@keyframes smokeMove {
  0% {
    transform: translate(-30%, -30%) rotate(0deg);
  }
  100% {
    transform: translate(30%, 30%) rotate(360deg);
  }
}

.profile-image-container {
  width: 236px;
  height: 236px;
  border-radius: 50%;
  border: 2px solid var(--accent-blue);
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  accent-color: var(--accent-blue);
  cursor: pointer;
  transform-style: preserve-3d;
  animation: coinSpin 8s linear infinite;
  perspective: 1000px;
}

.profile-image {
  position: absolute;
  bottom: 0px;
  left: 35px;
  width: 236px;
  height: 236px;
  object-fit: cover;
  opacity: 0.8;
  backface-visibility: hidden;
}

@keyframes coinSpin {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

/* Add this to create a shiny effect during rotation */
.profile-image-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    transparent 40%,
    rgba(255, 255, 255, 0.2) 45%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0.2) 55%,
    transparent 60%
  );
  animation: shimmer 8s linear infinite;
  pointer-events: none;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) rotateY(0deg);
  }
  100% {
    transform: translateX(100%) rotateY(360deg);
  }
}

.dock {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: var(--dock-bg);
  backdrop-filter: blur(10px);
  padding: 6px 12px;
  border-radius: 12px 12px 0 0;
  display: flex;
  gap: 8px;
}

.dock-icon {
  width: 48px;
  height: 48px;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s;
}

.dock-icon:hover {
  transform: scale(1.1);
}

.dock-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--top-bar-bg);
  padding: 4px 8px;
  border-radius: 15px;
  font-size: 12px;
  color: white;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}

.dock-icon:hover .tooltip {
  opacity: 1;
}

.hover-image {
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid var(--accent-blue);
  background: transparent;
}

.video-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  border-radius: 50%;
  overflow: hidden;
  z-index: 2000;
}

.video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.terminal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;
  background: rgba(18, 18, 18, 0.95);
  border-radius: 8px;
  overflow: hidden;
  z-index: 2000;
  display: flex;
  flex-direction: column;
}

.terminal {
  height: 100%;
  padding: 20px;
  background: transparent;
}

.terminal-output {
  color: #00ff00;
  font-family: monospace;
  font-size: 14px;
}

.terminal-line {
  margin: 5px 0;
  opacity: 0;
  transform: translateY(5px);
  transition: all 0.3s ease;
}

.terminal-line.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.dark-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  pointer-events: none;
  opacity: 0;
  transition: opacity 1s ease;
  z-index: 1;
}

.dark-overlay.fade-in {
  opacity: 1;
}

.flashing-text {
  position: relative;
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
  transform-style: preserve-3d;
  perspective: 500px;
  height: 5rem;
}

.text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(45deg, var(--accent-blue), #ffffff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
}

.text-1 {
  animation: mainText 5s linear infinite;
}

.text-2 {
  animation: subliminalText 5s linear infinite;
}

@keyframes mainText {
  0%,
  94%,
  96%,
  98%,
  100% {
    opacity: 1;
    transform: translateX(-50%) translateZ(0);
  }
  95%,
  97%,
  99% {
    opacity: 0;
    transform: translateX(-50%) translateZ(20px);
  }
}

@keyframes subliminalText {
  0%,
  94%,
  96%,
  98%,
  100% {
    opacity: 0;
    transform: translateX(-50%) translateZ(20px);
  }
  95%,
  97%,
  99% {
    opacity: 1;
    transform: translateX(-50%) translateZ(0);
  }
}
</style>
