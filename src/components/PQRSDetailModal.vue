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
          PQRS details
        </h2>

        <div class="space-y-4">
          <div>
            <div class="inline-block px-2 py-1">
              Title: {{ props.report.title }}
            </div>
          </div>
          <div>
            <div class="inline-block px-2 py-1">
              Id: {{ props.report.id }}
            </div>
          </div>

          <div>
            <div class="inline-block px-2 py-1">
              Email: {{ props.report.email }}
            </div>
          </div>
          <div>
            <div class="inline-block px-2 py-1">
              Phone: {{ props.report.phone }}
            </div>
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

const { closeModal, isModalOpen } = useModal('view-pqrs');
const router = useRouter();

interface Report {
  id: number;
  title: string;
  email: string;
  phone: string;
  isActive: boolean;
}

const props = defineProps<{
  report: Report;
}>();

const handleCloseModal = () => {
  closeModal();
  router.push(`/pqrs`);
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isModalOpen()) {
    router.push(`/pqrs`);
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
