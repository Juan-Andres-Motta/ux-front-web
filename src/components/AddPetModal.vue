<template>
  <div class="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
      <!-- Header -->
      <div class="p-6">
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-xl font-bold">Edit Pet</h2>
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
      <form @submit.prevent="savePet" class="p-6 pt-0">
        <div class="space-y-4">
          <!-- Name field -->
          <div class="flex items-center gap-4">
            <label class="w-20 text-right">Name</label>
            <input v-model="petCopy.name" type="text"
              class="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your pet name">
          </div>

          <!-- Email field -->
          <div class="flex items-center gap-4">
            <label class="w-20 text-right">Type</label>
            <input v-model="petCopy.type" type="text"
              class="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your pet type">
          </div>

          <!-- Phone field -->
          <div class="flex items-center gap-4">
            <label class="w-20 text-right">Breed</label>
            <input v-model="petCopy.breed" type="text"
              class="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your pet breed">
          </div>

          <div class="flex items-center gap-4">
            <label class="w-20 text-right">Age</label>
            <input v-model="petCopy.age" type="text"
              class="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your pet age">
          </div>
        </div>

        <!-- Submit button -->
        <div class="mt-6 flex justify-end">
          <button type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Save actions
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, onBeforeUnmount } from 'vue';
import { ref } from 'vue';

import { useModal } from '@/composables/useModal'

const { closeModal, isModalOpen } = useModal('edit-pet');
const router = useRouter();

interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: number;
}

const props = defineProps<{
  pet: Pet;
}>();

const petCopy = ref({ ...props.pet });

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
const savePet = () => {
  closeModal();
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>
