<template>
  <div class="editor-container">
    <div class="toolbar">
      <select v-model="language">
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
      </select>
      <button @click="shareCode">Share</button>
      <button @click="saveCode">Save</button>
      <button @click="toggleTheme">Toggle Theme</button>
    </div>
    <div class="editor-wrapper">
      <textarea
        ref="editor"
        v-model="code"
        @input="handleInput"
        :class="{ 'dark-theme': isDarkTheme }"
      ></textarea>
      <pre class="preview" v-html="highlightedCode"></pre>
    </div>
    <div v-if="shareUrl" class="share-url">Share URL: {{ shareUrl }}</div>
  </div>
</template>
