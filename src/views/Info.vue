<template>
  <div class="flex h-10 items-center justify-end">
    
    <RouterLink to="/tasks">
      <ArrowUturnLeftIcon class="size-6 text-primary hover:text-secondary xl:size-8" />
    </RouterLink>

  </div>

  <div class="flex flex-col items-center justify-center text-center">
    <h1
      class="mb-12 bg-gradient-to-br from-primary from-45% to-secondary bg-clip-text text-7xl font-semibold text-transparent"
    >
      Task Manager
    </h1>
  
    <div class="prose xl:prose-xl 2xl:prose-2xl">
  
      <h3>
      
      
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, aliquid est eos nesciunt modi saepe quasi beatae suscipit quibusdam .
      </h3>

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis ipsa 
        fugit similique odit aliquid ex nihil eveniet repudiandae necessitatibus 
        eligendi reprehenderit est illo, quas dignissimos deleniti. 
        Officiis sequi unde tempore placeat eveniet ducimus eius nisi?
      </p>

      <blockquote>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus accusantium quod animi.
      </blockquote>

    </div>
  </div>
</template>  
  <script setup lang="ts">
  import { ArrowUturnLeftIcon } from "@heroicons/vue/24/solid";
  </script>
  

  