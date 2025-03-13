<template>
  <div class="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg w-full max-w-md relative">
      <!-- Close button -->
      <button @click="handleCloseModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        ✕
      </button>

      <!-- User Details Section -->
      <div class="mb-8">
        <h2 class="text-xl font-bold mb-4 inline-block px-2 py-1">
          User details
        </h2>

        <div class="space-y-4">
          <div>
            <div class="inline-block px-2 py-1">
              Name: {{ props.user.name }}
            </div>
          </div>

          <div>
            <div class="inline-block px-2 py-1">
              Email: {{ props.user.email }}
            </div>
          </div>

          <div>
            <div class="inline-block px-2 py-1">
              Phone: {{ props.user.phone }}
            </div>
          </div>

          <div class="text-right">
            <button @click="createPet" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Create pet
            </button>
          </div>
        </div>
      </div>

      <!-- Pet Details Section -->
      <div v-for="pet, index in props.user.pets" :key="pet.id" class="mb-8">
        <h2 class="text-xl font-bold mb-4 inline-block px-2 py-1">
          Pet {{ index + 1 }} details
        </h2>

        <div class="space-y-4">
          <div>
            <div class="inline-block px-2 py-1">
              Name: {{ pet.name }}
            </div>
          </div>

          <div>
            <div class="inline-block px-2 py-1">
              Type: {{ pet.type }}
            </div>
          </div>

          <div>
            <div class="inline-block px-2 py-1">
              Bread: {{ pet.breed }}
            </div>
          </div>

          <div>
            <div class="inline-block px-2 py-1">
              Age: {{ pet.age }}
            </div>
          </div>

          <div class="text-right">
            <button @click="editPet(pet.id)" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Edit pet
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, onBeforeUnmount } from 'vue';

import { useModal } from '@/composables/useModal'

const { closeModal, isModalOpen } = useModal('view-user');
const router = useRouter();

const {
  openModal: openEditPetModal,
} = useModal<Pet>('edit-pet');

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  pets: Pet[];
}

interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: number;
}

const props = defineProps<{
  user: User;
}>();

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

const createPet = () => {
  openEditPetModal();
  closeModal();

};

const editPet = (id: number) => {
  closeModal();
  openEditPetModal(props.user.pets.find(pet => pet.id === id));
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});

</script>
