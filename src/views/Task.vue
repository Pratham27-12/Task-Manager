<template>
  <Transition>
    <div class="group flex h-14 w-full items-center gap-2 rounded-lg bg-primary/40 px-4 hover:bg-primary/50">
      <!-- Checkbox -->
      <label class="flex w-1/12 cursor-pointer items-center">
        <input
          type="checkbox"
          :checked="task.isCompleted"
          @input="tasksStore.toggleTaskCompletion(task.id)"
          class="hidden"
        />
        <div class="flex size-6 items-center justify-center rounded-full border-2 border-primary">
          <CheckCircleIcon v-if="task.isCompleted" class="pointer-events-none text-primary" />
        </div>
      </label>

      <!-- Task Name -->
      <div class="flex items-center" :class="isConfirmationPending || task.isEditing ? 'w-5/12 overflow-hidden' : 'w-7/12'">
        <input
          v-if="task.isEditing"
          type="text"
          class="flex-grow border-b-2 border-primary bg-transparent focus:outline-none"
          v-model="editedTask"
          @keyup.enter="updateTask"
        />
        <div v-else :class="task.isCompleted && 'line-through'" class="truncate">
          {{ task.task }}
        </div>
      </div>

      <!-- Start and End Times -->
      <div class="flex items-center gap-2 w-3/12">
        <div class="flex items-center">
          <input
            v-if="task.isEditing"
            type="time"
            class="border-b-2 border-primary bg-transparent focus:outline-none"
            v-model="editedStartTime"
          />
          <div v-else :class="task.isCompleted && 'line-through'" class="truncate">{{ task.startTime }}</div>
        </div>
        <div class="flex items-center">
          <input
            v-if="task.isEditing"
            type="time"
            class="border-b-2 border-primary bg-transparent focus:outline-none"
            v-model="editedEndTime"
          />
          <div v-else :class="task.isCompleted && 'line-through'" class="truncate">{{ task.endTime }}</div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex w-2/12 justify-end gap-2" :class="task.isEditing || isConfirmationPending === true ? 'visible w-5/12' : 'invisible group-hover:visible'">
        <CheckIcon v-if="task.isEditing" @click="updateTask" class="size-6 cursor-pointer transition-all duration-150 hover:scale-125" />
        <XMarkIcon v-if="task.isEditing" @click="cancelEdit" class="size-6 cursor-pointer hover:text-secondary" />
        <PencilIcon v-if="!task.isEditing && !task.isCompleted && isConfirmationPending === false" @click="tasksStore.editTask(task.id)" class="size-6 cursor-pointer transition-all duration-150 hover:scale-125" />
        <TrashIcon v-if="isConfirmationPending === false" @click="isConfirmationPending = true" class="size-6 cursor-pointer transition-all duration-150 hover:scale-125 hover:text-secondary" />
        <div v-if="isConfirmationPending === true" class="flex items-center gap-2 rounded-lg p-1">
          <p class="font-semibold">Delete?</p>
          <TrashIcon @click="deleteTask" class="size-6 cursor-pointer transition-all duration-150 hover:scale-125 hover:text-secondary" />
          <ArrowUturnLeftIcon @click="isConfirmationPending = false" class="size-6 cursor-pointer transition-all duration-150 hover:scale-90" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useTasksStore } from "@/stores/tasksStore";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon, CheckCircleIcon, ArrowUturnLeftIcon } from "@heroicons/vue/24/solid";

const isConfirmationPending = ref(false);
const tasksStore = useTasksStore();

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const editedTask = ref(props.task.task);
const editedStartTime = ref(props.task.startTime);
const editedEndTime = ref(props.task.endTime);

const updateTask = () => {
  tasksStore.updateTask(props.task.id, editedTask.value, editedStartTime.value, editedEndTime.value);
  isConfirmationPending.value = false;
};

const cancelEdit = () => {
  tasksStore.cancelEdit(props.task.id);
  editedTask.value = props.task.task;
  editedStartTime.value = props.task.startTime;
  editedEndTime.value = props.task.endTime;
};

const deleteTask = () => {
  tasksStore.deleteTask(props.task.id);
  isConfirmationPending.value = false;
};

watch(
  tasksStore.tasks,
  () => {
    tasksStore.saveTasks();
    tasksStore.fetchTasks();
  },
  { deep: true },
);
</script>
