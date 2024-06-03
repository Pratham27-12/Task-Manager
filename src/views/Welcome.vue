<template class="bg-white dark:bg-black">
  <div class="flex h-full flex-col items-center justify-center gap-24">

    <div
      class="bg-gradient-to-br from-primary from-45% to-secondary bg-clip-text text-7xl font-semibold text-transparent xl:text-7xl"
    >
      Task Manager 
    </div>

    <div
      v-if="userStore.userName"
      class="flex items-center justify-center text-center text-5xl font-semibold"
    >
      Welcome back, {{ userStore.userName }}
    </div>

    <div
      v-else
      class="flex items-center justify-center text-center text-5xl font-semibold"
    >
      Welcome to Task Manager
    </div>

    <div class="relative">
     
      <Transition>
        <p
          v-if="isUserNameEmpty === true"
          class="absolute -top-10 left-1/4 text-lg font-semibold italic text-secondary"
        >
          enter your name
        </p>
      </Transition>

      <input
        v-if="!userStore.userName"
        class="h-10 w-64 rounded-lg border-2 border-primary bg-white/90 p-2 italic focus:outline-none"
        type="text"
        placeholder="your name"
        v-model="inputUserName"
        @keyup.enter="login"
      />

    </div>

    <div>
      <button
        @click="login"
        class="w-64 rounded-lg bg-primary py-2 text-alt transition-all duration-300 hover:bg-secondary active:scale-90"
      >
        Login
      </button>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useUserStore } from "@/stores/userStore";
  
  const inputUserName = ref("");
  const isUserNameEmpty = ref(false);
  const router = useRouter();
  const userStore = useUserStore();
  
  const login = () => {
    if (userStore.userName) {
      router.push("/tasks");
    } else {
      if (inputUserName.value === "") {
        isUserNameEmpty.value = true;
        setTimeout(() => {
          isUserNameEmpty.value = false;
        }, 5000);
      } else {
        userStore.setUserName(inputUserName.value);
        router.push("/tasks");
      }
    }
  };
  
  onMounted(() => {
    userStore.fetchUserName();
   });
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
</style>
  