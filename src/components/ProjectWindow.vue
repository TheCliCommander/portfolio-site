<template>
  <div class="window-container" :class="{ minimized: isMinimized }">
    <div class="window" :class="{ maximized: isMaximized }">
      <div class="window-header">
        <div class="window-title">
          <span class="user">user</span>
          <span class="separator">@</span>
          <span class="hostname">localhost</span>
          <span class="separator">:~/{{ project.title }}$</span>
          <span class="title-text">{{ project.title }}</span>
        </div>
        <div class="window-controls">
          <button class="minimize" @click="handleMinimize">−</button>
          <button class="maximize" @click="toggleMaximize">□</button>
          <button class="close" @click="$emit('close')">×</button>
        </div>
      </div>
      <div class="window-content">
        <div v-if="project.video" class="video-wrapper">
          <video :src="project.video" controls></video>
        </div>
        <div v-else-if="project.isCodeEditor" class="code-editor-wrapper">
          <CodeEditor />
        </div>
        <div v-else-if="project.isResume" class="resume-wrapper">
          <ResumeViewer />
        </div>
        <div v-else-if="project.image" class="image-wrapper">
          <img :src="project.image" :alt="project.title" />
        </div>
        <div v-if="!project.isResume" class="project-description">
          <p>{{ project.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeEditor from "./CodeEditor/components/CodeEditor.vue";
import ResumeViewer from "./ResumeViewer.vue";

export default {
  name: "ProjectWindow",
  components: {
    CodeEditor,
    ResumeViewer,
  },
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isMinimized: false,
      isMaximized: false,
    };
  },
  methods: {
    handleMinimize() {
      this.$emit("minimize", this.project);
      this.isMinimized = true;
    },
    toggleMaximize(event) {
      event.stopPropagation();
      this.isMaximized = !this.isMaximized;
    },
  },
  watch: {
    project: {
      immediate: true,
      handler(newProject) {
        if (newProject) {
          this.isMinimized = false;
        }
      },
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
  height: 60vh;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
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
  transition: all 0.3s ease;
}

.window-content {
  padding: 20px;
  height: calc(100% - 76px);
  overflow-y: auto;
  overflow-x: auto;
}

.video-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-height: 500px;
}

.video-wrapper video {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.code-editor-wrapper {
  height: 100%;
  width: 100%;
  min-width: 768px;
  overflow-x: auto;
  overflow-y: hidden;
}

@media (max-width: 768px) {
  .code-editor-wrapper {
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
