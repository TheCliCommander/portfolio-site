<template>
  <div class="window-container" @click.self="$emit('close')">
    <div class="window">
      <div class="window-header">
        <div class="window-title">{{ project.title }}</div>
        <div class="window-controls">
          <button class="minimize">−</button>
          <button class="maximize">□</button>
          <button class="close" @click="$emit('close')">×</button>
        </div>
      </div>
      <div class="window-content">
        <!-- Video Content -->
        <div
          v-if="project.video && !project.video.includes('youtube')"
          class="video-wrapper"
        >
          <video :src="project.video" controls></video>
        </div>
        <!-- Website Project Content -->
        <div v-else-if="project.website" class="website-content">
          <h2>{{ project.title }}</h2>
          <p>{{ project.description }}</p>
          <a :href="project.website" target="_blank" class="website-link"
            >Visit Website</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.window-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.window {
  background: var(--dark-bg);
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.window-header {
  background: var(--top-bar-bg);
  padding: 8px 12px;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.window-title {
  color: white;
  font-size: 14px;
}

.window-controls button {
  border: none;
  background: none;
  color: white;
  font-size: 16px;
  padding: 0 8px;
  cursor: pointer;
}

.window-content {
  padding: 20px;
  max-height: calc(80vh - 40px);
  overflow-y: auto;
}

.video-wrapper video {
  width: 100%;
  border-radius: 4px;
}

.website-content {
  color: white;
}

.website-link {
  display: inline-block;
  margin-top: 20px;
  padding: 8px 16px;
  background: var(--accent-blue);
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
</style>
