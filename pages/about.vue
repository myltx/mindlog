<script setup lang="ts">
import type { Skill } from "~/types";

const skills: Skill[] = [
  { name: "Vue.js", level: 95, category: "前端框架" },
  { name: "React", level: 90, category: "前端框架" },
  { name: "Nuxt.js", level: 88, category: "前端框架" },
  { name: "TypeScript", level: 92, category: "编程语言" },
  { name: "JavaScript", level: 95, category: "编程语言" },
  { name: "Python", level: 85, category: "编程语言" },
  { name: "Node.js", level: 88, category: "后端技术" },
  { name: "Express", level: 85, category: "后端技术" },
  { name: "MongoDB", level: 80, category: "数据库" },
  { name: "PostgreSQL", level: 82, category: "数据库" },
  { name: "Docker", level: 78, category: "DevOps" },
  { name: "Git", level: 90, category: "工具" },
];

const skillCategories = computed(() => {
  const categories = new Map<string, Skill[]>();
  skills.forEach((skill) => {
    if (!categories.has(skill.category)) {
      categories.set(skill.category, []);
    }
    categories.get(skill.category)!.push(skill);
  });
  return categories;
});

const timeline = [
  {
    year: "2023",
    title: "全栈开发工程师",
    company: "科技公司",
    description: "负责公司核心产品的前后端开发，技术栈升级和性能优化",
  },
  {
    year: "2021",
    title: "前端开发工程师",
    company: "互联网公司",
    description: "参与多个大型项目的前端开发，积累了丰富的工程化经验",
  },
  {
    year: "2019",
    title: "计算机科学学士",
    company: "某大学",
    description: "主修计算机科学与技术，系统学习了编程基础和算法",
  },
];
</script>

<template>
  <div class="py-12">
    <div class="container">
      <!-- 标题 -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          <Icon name="carbon:user" class="inline-block text-primary mr-2" />
          关于我
        </h1>
        <p class="text-gray-400 text-lg">Hello, I'm a Full Stack Developer</p>
      </div>

      <!-- 个人简介 -->
      <section class="mb-16">
        <div class="card max-w-4xl mx-auto">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div
              class="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-6xl flex-shrink-0">
              👨‍💻
            </div>
            <div class="flex-1">
              <h2 class="text-3xl font-bold mb-4">你好，我是极客开发者</h2>
              <div class="text-gray-400 space-y-3 leading-relaxed">
                <p>
                  我是一名充满热情的全栈开发工程师，拥有多年的软件开发经验。
                  专注于构建高质量、可维护的Web应用程序。
                </p>
                <p>
                  热爱开源，喜欢分享技术知识。在工作之余，我会通过博客记录学习心得，
                  参与开源项目贡献，持续提升技术能力。
                </p>
                <p>
                  擅长使用现代前端框架（Vue.js, React,
                  Nuxt.js）和后端技术（Node.js, Python）
                  构建全栈应用。注重代码质量、性能优化和用户体验。
                </p>
              </div>

              <div class="flex gap-4 mt-6">
                <a
                  href="https://github.com/myltx"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn">
                  <Icon name="mdi:github" class="mr-2" />
                  GitHub
                </a>
                <a
                  href="mailto:865147643@qq.com"
                  class="btn bg-gray-700 hover:bg-gray-600">
                  <Icon name="mdi:email" class="mr-2" />
                  联系我
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 技能图谱 -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-center">
          <Icon
            name="carbon:skill-level-advanced"
            class="inline-block text-primary mr-2" />
          技能图谱
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div
            v-for="[category, categorySkills] in skillCategories"
            :key="category"
            class="card">
            <h3 class="text-xl font-bold mb-4 text-primary">{{ category }}</h3>
            <div class="space-y-4">
              <div v-for="skill in categorySkills" :key="skill.name">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-gray-300">{{ skill.name }}</span>
                  <span class="text-gray-500 text-sm">{{ skill.level }}%</span>
                </div>
                <div class="h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                    :style="{ width: `${skill.level}%` }" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 工作经历 -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-center">
          <Icon name="carbon:time" class="inline-block text-primary mr-2" />
          工作经历
        </h2>

        <div class="max-w-3xl mx-auto">
          <div class="relative">
            <!-- 时间轴线 -->
            <div
              class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary" />

            <div class="space-y-8">
              <div
                v-for="(item, index) in timeline"
                :key="index"
                class="relative pl-20">
                <!-- 时间节点 -->
                <div
                  class="absolute left-4 top-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-dark font-bold text-sm shadow-lg shadow-primary/50">
                  {{ index + 1 }}
                </div>

                <!-- 内容卡片 -->
                <div class="card">
                  <div class="flex items-start justify-between mb-2">
                    <h3 class="text-xl font-bold">{{ item.title }}</h3>
                    <span class="badge">{{ item.year }}</span>
                  </div>
                  <p class="text-secondary mb-2">{{ item.company }}</p>
                  <p class="text-gray-400 text-sm">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 联系方式 -->
      <section>
        <h2 class="text-3xl font-bold mb-8 text-center">
          <Icon name="carbon:email" class="inline-block text-primary mr-2" />
          联系方式
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <a
            href="mailto:865147643@qq.com"
            class="card text-center hover:scale-105 transition-transform">
            <Icon name="mdi:email" class="text-4xl text-primary mb-4" />
            <h3 class="font-bold mb-2">Email</h3>
            <p class="text-gray-400 text-sm">865147643@qq.com</p>
          </a>

          <a
            href="https://github.com/myltx"
            target="_blank"
            rel="noopener noreferrer"
            class="card text-center hover:scale-105 transition-transform">
            <Icon name="mdi:github" class="text-4xl text-primary mb-4" />
            <h3 class="font-bold mb-2">GitHub</h3>
            <p class="text-gray-400 text-sm">@myltx</p>
          </a>

          <a
            href="https://twitter.com/@myl_tx"
            target="_blank"
            rel="noopener noreferrer"
            class="card text-center hover:scale-105 transition-transform">
            <Icon name="mdi:twitter" class="text-4xl text-primary mb-4" />
            <h3 class="font-bold mb-2">Twitter</h3>
            <p class="text-gray-400 text-sm">@myl_tx</p>
          </a>
        </div>
      </section>
    </div>
  </div>
</template>
