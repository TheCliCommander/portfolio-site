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
          <div v-if="minimizedProjects.length" class="menu-separator"></div>
          <div
            v-for="project in minimizedProjects"
            :key="project.id"
            class="menu-item"
            @click="restoreProject(project)"
          >
            {{ project.title }}
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
          @click.stop="openProject(project)"
          @mouseover="setHoveredProject(project)"
          @mouseleave="clearHoveredProject"
        >
          <img :src="project.icon" :alt="project.title" />
          <span class="tooltip">{{ project.title }}</span>
          <div v-if="hoveredProject === project" class="hover-image">
            <img
              v-if="project.darkImage && project.lightImage"
              :src="project.darkImage"
              class="theme-image dark-theme"
            />
            <img
              v-if="project.darkImage && project.lightImage"
              :src="project.lightImage"
              class="theme-image light-theme"
            />
            <img v-else :src="project.image" :alt="project.title" />
          </div>
        </div>
      </div>
      <div class="icons8-attribution">
        Github link by
        <a href="https://icons8.com/icon/LoL4bFzqmAa0/github">Icons8</a>
        Documents icon by
        <a href="https://icons8.com/icon/DVzc1vi8FDJt/document">Icons8</a>
      </div>
    </div>

    <div class="dark-overlay" :class="{ 'fade-in': isLoaded }"></div>

    <ProjectWindow
      v-if="activeProject"
      :project="activeProject"
      @close="closeProject"
      @minimize="handleMinimize"
    />
  </div>
</template>

<script>
import SubliminalMessage from "./components/SubliminalMessage.vue";
import PassBox2 from "./components/images/PassBox2.png";
import OnTime2 from "./components/images/OnTime2.png";
import selfCutout from "./components/images/selfCutout.png";
import ProjectWindow from "./components/ProjectWindow.vue";

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
          title: "Code Editor",
          icon: "/icons/icons8-document-94.png",
          darkImage: require("@/assets/images/darkMode.png"),
          lightImage: require("@/assets/images/lightMode.png"),
          description:
            "A collaborative code editor with syntax highlighting dark and light mode.",
          isCodeEditor: true,
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
          title: "Resume",
          icon: "/icons/preferences-system.svg",
          isResume: true,
          description: "Interactive Resume",
        },
        {
          id: 5,
          title: "Github",
          icon: "/icons/icons8-github-94.png",
          image: require("@/assets/images/GithubProfile.png"),
          description: "My Github featuring more of my projects",
        },
      ],
      hoveredProject: null,
      showVideo: false,
      showTerminal: false,
      terminalMessages: [],
      minimizedProjects: [],
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
      if (project.id === 5) {
        // GitHub
        const width = 800;
        const height = 600;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        window.open(
          "https://github.com/TheCliCommander",
          "GitHub Profile",
          `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );
      } else {
        this.activeProject = project;
      }
    },
    closeProject() {
      if (this.activeProject) {
        this.minimizedProjects = this.minimizedProjects.filter(
          (p) => p.id !== this.activeProject.id
        );
        this.activeProject = null;
      }
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
    handleMenuClick(action) {
      this.showActivitiesMenu = false;
      if (action === "resume") {
        const resumeProject = this.projects.find((p) => p.id === 4);
        if (resumeProject) {
          this.openProject(resumeProject);
        }
      }
      if (action === "summary") {
        // Handle summary action
      }
    },
    handleMinimize(project) {
      this.minimizedProjects.push(project);
      this.activeProject = null;
    },
    restoreProject(project) {
      // First set as active project
      this.activeProject = project;

      // Then remove from minimized list
      this.minimizedProjects = this.minimizedProjects.filter(
        (p) => p.id !== project.id
      );

      // Close activities menu
      this.showActivitiesMenu = false;
    },
    openCodeEditor() {
      window.open("https://michaelryberg.github.io/code-editor/", "_blank");
    },
  },
  mounted() {
    setInterval(this.updateTime, 1000);
    this.updateTime();

    // Store the handler as a property so we can remove it later
    this.documentClickHandler = (event) => {
      const isClickInsideDock = event.target.closest(".dock-icon");
      const isClickInsideTerminal = event.target.closest(".terminal");
      const isClickInsideVideo = event.target.closest(".video-container video");
      const isClickInsideHoverImage = event.target.closest(".hover-image");
      const isClickInsideWindow = event.target.closest(".window");
      const isClickInsideActivities = event.target.closest(".activities-menu");

      if (
        isClickInsideDock ||
        isClickInsideTerminal ||
        isClickInsideVideo ||
        isClickInsideHoverImage ||
        isClickInsideWindow ||
        isClickInsideActivities
      ) {
        return;
      }
      this.closeProject();
    };

    document.addEventListener("click", this.documentClickHandler);
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

.hover-image .theme-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1.5s ease-in-out;
}

.hover-image .dark-theme {
  opacity: 1;
}

.hover-image .light-theme {
  opacity: 0;
}

.hover-image:hover .dark-theme {
  opacity: 0;
}

.hover-image:hover .light-theme {
  opacity: 1;
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

.icons8-attribution {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.01);
  font-size: 4px;
  z-index: 1;
  pointer-events: none;
  margin-bottom: 2px;
}

.icons8-attribution a {
  color: inherit;
  text-decoration: none;
}
</style>
