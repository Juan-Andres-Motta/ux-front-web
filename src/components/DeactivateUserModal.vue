<template>
  <div class="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
      <!-- Header -->
      <div class="p-6">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-xl font-bold">Deactivate User</h2>
            <p class="text-gray-600 mt-1">
              Make changes to your profile here. Click save when you're done.
            </p>
          </div>
          <button @click="handleCloseModal" class="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
      </div>

      <!-- Form -->
      <!-- Submit button -->
      <div class="mt-6 flex justify-center mb-7 gap-10">
        <button @click="handleCloseModal"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Cancel
        </button>
        <button @click="handleCloseModal"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Deactivate
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, onBeforeUnmount } from 'vue';

import { useModal } from '@/composables/useModal'

const { closeModal, isModalOpen } = useModal('deactivate-user');
const router = useRouter();

const handleCloseModal = () => {
  router.push(`/users`);
  closeModal();
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isModalOpen()) {
    router.push(`/users`);
    closeModal();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>
