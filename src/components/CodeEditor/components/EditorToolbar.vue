<template>
  <div class="toolbar" :class="{ 'dark-theme': isDarkTheme }">
    <div class="toolbar-left">
      <select
        :value="language"
        @input="$emit('update:language', $event.target.value)"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="csharp">C#</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
      </select>
      <input
        type="file"
        ref="fileInput"
        @change="$emit('load', $event)"
        style="display: none"
      />
      <button @click="$refs.fileInput.click()">Load</button>
    </div>

    <div class="toolbar-actions">
      <button @click="$emit('share')">Share</button>
      <button @click="$emit('save')">Save</button>
      <button @click="$emit('toggle-theme')">
        {{ isDarkTheme ? "☀️" : "🌙" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  language: String,
  isDarkTheme: Boolean,
});

defineEmits(["update:language", "share", "save", "toggle-theme", "load"]);
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #2f2f2f;
  color: white;
  border-bottom: 1px solid #1a1a1a;
  -webkit-app-region: drag;
}

.dark-theme.toolbar {
  background: #1a1a1a;
  border-color: #000;
}

.toolbar select,
.toolbar button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.dark-theme select,
.dark-theme button {
  background: #1a1a1a;
  border-color: #444;
  color: white;
}

.toolbar-actions {
  display: flex;
  gap: 0.5rem;
}

.toolbar-left {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.window-controls {
  display: flex;
  gap: 0.5rem;
  margin-right: 1rem;
}

.window-control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  -webkit-app-region: no-drag;
  cursor: pointer;
}

.close {
  background: #ff5f57;
}
.minimize {
  background: #ffbd2e;
}
.maximize {
  background: #28c940;
}
</style>
