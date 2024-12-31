<template>
  <div class="resume-container">
    <div class="menu-bar">
      <div
        v-for="(menu, index) in menus"
        :key="index"
        class="menu-item"
        @click="toggleMenu(index)"
        :class="{ active: menu.isOpen }"
      >
        {{ menu.title }}
        <div class="dropdown" v-if="menu.isOpen">
          <div
            v-for="(item, idx) in menu.items"
            :key="idx"
            class="dropdown-item"
            @click.stop="selectItem(menu.title, item)"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="content-area">
      <div v-if="selectedContent" class="content-card">
        <h3>{{ selectedContent.title }}</h3>
        <div v-if="selectedContent.date" class="date">
          {{ selectedContent.date }}
        </div>
        <div v-if="selectedContent.company" class="company">
          {{ selectedContent.company }}
        </div>
        <div v-if="selectedContent.description" class="description">
          {{ selectedContent.description }}
        </div>
        <div v-if="selectedContent.level" class="skill-level">
          Proficiency:
          <div class="level-bar">
            <div
              :style="{ width: selectedContent.level + '%' }"
              class="level-fill"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResumeViewer",
  data() {
    return {
      selectedContent: null,
      menus: [
        {
          title: "Work History",
          isOpen: false,
          items: [
            {
              title: "Lead Developer",
              company: "If By Chance Media",
              date: "2024 - Present",
              description:
                "Lead developer creating a python application. Signed an NDA so I cannot disclose details.",
            },
            {
              title: "Systems Analyst",
              company: "CoffeTree Group",
              date: ` May '22 - Nov '23`,
              description:
                "Handled POS systems for RaceTrac gas stations. Setup, connected and installed VMs on over 600 separate servers. Automated several processes. Fixed server issues including problems with SQL server. Worked with Splunk, Punchh, Meraki, and SolarWinds to monitor and maintain nodes and systems and handle network issues. ",
            },
            {
              title: "Relief Manager",
              company: "Waffle House",
              date: "2015 - 2019",
              description:
                "Handled normal day to day operations of the store. Handled cash, inventory, and payroll. Coordinated shifts and trained new employees.",
            },

            // Add more work history items
          ],
        },
        {
          title: "Tech Stack",
          isOpen: false,
          items: [
            {
              title: "Vue.js",
              level: 80,
              description:
                "Expert in Vue.js development including Vuex, Vue Router, and Vue CLI",
            },
            {
              title: "Python",
              level: 85,
              description:
                "Well versed in Python, my first language. I have developed countless applications and scripts.",
            },
            // Add more skills
          ],
        },
        {
          title: "Education",
          isOpen: false,
          items: [
            {
              title: "Some College",
              company: "Independence University",
              date: "2018 - 2019",
              description:
                "Focus on Cybersecurity and Networking. Fincances kept me from finishing; pursuing certificates.",
            },
          ],
        },
      ],
    };
  },
  methods: {
    toggleMenu(index) {
      this.menus.forEach((menu, idx) => {
        menu.isOpen = idx === index ? !menu.isOpen : false;
      });
    },
    selectItem(menuTitle, item) {
      this.selectedContent = item;
      this.menus.forEach((menu) => (menu.isOpen = false));
    },
  },
};
</script>

<style scoped>
.resume-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(rgba(30, 30, 30, 0.97), rgba(30, 30, 30, 0.97)),
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23729fcf' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  color: var(--text-color);
}

.menu-bar {
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.95),
    rgba(0, 0, 0, 0.85)
  );
  padding: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.menu-item {
  position: relative;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.menu-item.active {
  background: rgba(255, 255, 255, 0.15);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--top-bar-bg);
  border-radius: 4px;
  padding: 4px 0;
  min-width: 200px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.dropdown-item {
  padding: 8px 16px;
  white-space: nowrap;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.content-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.content-card {
  background: rgba(30, 30, 30, 0.95);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  color: #ffffff;
  border: 1px solid rgba(114, 159, 207, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
}

.level-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
}

.level-fill {
  height: 100%;
  background: linear-gradient(
    to right,
    var(--accent-blue),
    rgba(114, 159, 207, 0.8)
  );
  transition: width 0.3s ease;
}

.date,
.company {
  color: #a0a0a0;
  margin: 4px 0;
}

.description {
  color: #ffffff;
  line-height: 1.5;
}
</style>
