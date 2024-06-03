<template>
  <div class=" fixed bottom-24 left-6 right-6 z-10 flex justify-center">
    <div class="w-full max-w-lg">
      <br />
      <Transition>
        <div v-show="isTaskEmpty" class="text-lg font-semibold italic text-secondary mb-2">
          Task cannot be empty
        </div>
      </Transition>
      <Transition>
        <div v-show="isTimeInvalid" class="text-lg font-semibold italic text-red-500 mb-2">
          Start time must be less than end time
        </div>
      </Transition>

      <div class="flex w-auto items-center gap-4">
      
        <input
          class="h-12 w-84 rounded-full border-2 border-primary px-4 focus:shadow-md focus:shadow-primary focus:outline-none"
          v-model="task"
          type="text"
          placeholder="Enter task"
          @keyup.enter="createTask"
        />

        <input
          class="h-12 w-34 rounded-full border-2 border-primary px-4 focus:shadow-md focus:shadow-primary focus:outline-none"
          v-model="startTime"
          type="time"
        />

        <input
          class="h-12 w-34 rounded-full border-2 border-primary px-4 focus:shadow-md focus:shadow-primary focus:outline-none"
          v-model="endTime"
          type="time"
        />

        <button
          class="rounded-full bg-primary p-2 hover:bg-secondary"
          @click="createTask"
        >
          <PlusIcon class="size-8 text-alt" />
        </button>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import { useTasksStore } from "@/stores/tasksStore";

const task = ref("");
const startTime = ref("");
const endTime = ref("");
const isTaskEmpty = ref(false);
const isTimeInvalid = ref(false);
const tasksStore = useTasksStore();

const createTask = () => {
  if (task.value === "") {
    isTaskEmpty.value = true;
    setTimeout(() => {
      isTaskEmpty.value = false;
    }, 2000);
    return;
  }

  if (startTime.value >= endTime.value) {
    isTimeInvalid.value = true;
    setTimeout(() => {
      isTimeInvalid.value = false;
    }, 2000);
    return;
  }

  tasksStore.addTask(task.value, startTime.value, endTime.value);
  task.value = "";
  startTime.value = "";
  endTime.value = "";
  isTaskEmpty.value = false;
  isTimeInvalid.value = false;
};
</script>

<style scoped>
.v-enter-from,
.v-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-out;
}

input[type="time"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 0 10px;
  font-size: 1rem;
  border-radius: 9999px;
}

input[type="time"]::-webkit-inner-spin-button,
input[type="time"]::-webkit-clear-button {
  display: none;
}

input[type="time"]::-webkit-calendar-picker-indicator {
  color: #4A90E2;
  opacity: 0.5;
}
</style>
