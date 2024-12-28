<template>
  <div class="window-container">
    <div class="window-header">
      <div class="window-title">Code Collaborator</div>
      <div class="window-controls">
        <button @click="$emit('close')" class="close-btn">×</button>
      </div>
    </div>
    <div class="window-content">
      <CodeEditorApp />
    </div>
  </div>
</template>

<script>
import CodeEditorApp from "./CodeEditor/App.vue";

export default {
  name: "CodeEditorWindow",
  components: {
    CodeEditorApp,
  },
  emits: ["close"],
};
</script>

<style scoped>
.window-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid #333;
}

.window-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: #2d2d2d;
  color: #fff;
}

.window-content {
  flex: 1;
  overflow: hidden;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  padding: 0 8px;
}

.close-btn:hover {
  background: #ff4444;
}
</style>
