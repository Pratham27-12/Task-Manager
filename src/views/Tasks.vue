<template>
  <div class="h-10"><Navbar /></div>

  <main class="flex-0 " >
    <h1 class="mb-8 mt-4 text-3xl font-semibold">
      what's up, {{ userStore.userName }}!
    </h1>

    <div
      v-if="showTaskInput"
      @click="showTaskInput = false"
      class="fixed bottom-6 right-6 flex justify-end"
    >
      <button
        class="rounded-full bg-primary p-2 shadow-lg shadow-primary hover:bg-secondary hover:shadow-secondary"
      >
        <XMarkIcon class="size-8 text-alt" />
      </button>

    </div>

    <div
      v-if="!showTaskInput"
      @click="showTaskInput = true"
      class="fixed bottom-6 right-6 flex justify-end"
    >
      <button
        class="rounded-full bg-primary p-2 shadow-lg shadow-primary hover:bg-secondary hover:shadow-secondary"
      >
        <PlusIcon class="size-8 text-alt" />
      </button>
    </div>

    <CreateTask v-else />
    
    <div
      v-if="tasksLoaded && tasksStore.tasks.length > 0"
      class="flex flex-col gap-2 pb-20"
    >
      <TransitionGroup name="task-list" appear>
        <Task v-for="task in sortedTasks" :key="task.id" :task="task" />
      </TransitionGroup>
    </div>

    <div v-else class="flex flex-col items-center gap-4">
      <p v-if="!showTaskInput" class="text-8xl font-semibold lg:my-24 lg:text-center">
        you are free today!
      </p>
      <p v-if="!showTaskInput" class="text-xl font-semibold lg:my-15 lg:text-center">
        Got something to add?
      </p>
    </div>

  </main>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, watch } from "vue";
import { PlusIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { onBeforeRouteLeave } from "vue-router";

import Navbar from "@/components/Navbar.vue";
import Task from "./Task.vue";
import CreateTask from "./CreateTask.vue";
import { useTasksStore } from "@/stores/tasksStore";
import { useUserStore } from "@/stores/userStore";

const tasksStore = useTasksStore();
const showTaskInput = ref(false);
const userStore = useUserStore();
const tasksLoaded = ref(false);

onBeforeRouteLeave(() => {
  tasksStore.tasks.forEach((task : any) => {
    task.isEditing = false;
  });
});

onMounted(() => {
  tasksStore.fetchTasks();
  tasksLoaded.value = true;
  userStore.fetchUserName();
});

watch(
  tasksStore.tasks,
  () => {
    tasksStore.saveTasks();
    tasksStore.fetchTasks();
  },
  { deep: true },
);

const sortedTasks = computed(() => {
  return tasksStore.tasks.slice().sort((a : any, b : any) => {
    if (a.isCompleted && !b.isCompleted) return 1;
    if (!a.isCompleted && b.isCompleted) return -1;
    return 0;
  });
});
</script>

<style scoped>
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.4s ease-in-out;
}

.task-list-enter-from {
  transform: translateY(20%);
  opacity: 0;
}

.task-list-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
