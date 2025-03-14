<template>
  <div class="flex flex-col md:flex-row h-screen w-full font-sans">
    <!-- Sign In Form -->
    <div class="flex flex-col justify-center items-center p-8 md:w-1/2 max-w-md mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-1">Sign In</h1>
      <p class="text-gray-600 mb-8">Choose your preferred sign in method</p>

      <div class="w-full mb-4">
        <input type="email" placeholder="jhon@example.com" v-model="email"
          class="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500" />
      </div>

      <div class="w-full mb-4">
        <input type="password" placeholder="************" v-model="password"
          class="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500" />
      </div>

      <RouterLink @click="signIn" to="/dashboard"
        class="w-full py-3 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-900 transition-colors mb-8 text-center">
        Sign In
      </RouterLink>

      <div class="flex gap-4 w-full">
        <RouterLink
          class="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          to="/dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 12 L16 12"></path>
            <path d="M12 8 L12 16"></path>
          </svg>
          <span class="text-sm">Google</span>
        </RouterLink>
        <RouterLink
          class="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          to="/dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
          <span class="text-sm">Facebook</span>
        </RouterLink>
        <RouterLink
          class="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          to="/dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
            <path
              d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
            </path>
          </svg>
          <span class="text-sm">Github</span>
        </RouterLink>
      </div>
    </div>

    <!-- Illustration Container -->
    <div class="hidden md:flex bg-amber-500 md:w-1/2 h-64 md:h-auto overflow-hidden items-end justify-center">
      <img class="w-full h-full object-cover" src="/catbackground.webp" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const signIn = () => {
  // Handle sign in logic here
  console.log('Signing in with:', email.value, password.value);
};
</script>
