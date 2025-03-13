<template>
  <div class="flex h-dvh bg-gray-50">
    <!-- Sidebar -->
    <SidebarItem />

    <!-- Main content -->
    <div class="flex-1 h-dvh">
      <div class="p-6 h-dvh overflow-y-auto">
        <h1 class="text-2xl font-bold mb-6">Users</h1>

        <!-- Search Filter -->
        <div class="mb-6">
          <input type="text" placeholder="Filter by name or email" v-model="searchQuery"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg shadow h-max">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="w-12 px-4 py-3">
                  <input type="checkbox" v-model="selectAll" @change="toggleAll" class="rounded">
                </th>
                <th v-for="header in headers" :key="header.key"
                  class="px-4 py-3 text-left text-sm font-medium text-blue-600 cursor-pointer"
                  @click="sort(header.key)">
                  {{ header.label }}
                  <span v-if="sortKey === header.key">
                    {{ sortOrder === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th class="w-12"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="item in paginatedItems" :key="item.id" class="hover:bg-gray-50">
                <td class="px-4 py-3">
                  <input type="checkbox" v-model="selected" :value="item.id" class="rounded">
                </td>
                <td class="px-4 py-3">{{ item.id }}</td>
                <td class="px-4 py-3">{{ item.name }}</td>
                <td class="px-4 py-3">{{ item.email }}</td>
                <td class="px-4 py-3">{{ item.phone }}</td>
                <td class="px-4 py-3">{{ item.isActive }}</td>
                <td class="px-4 py-3 text-right relative">
                  <button @click="toggleDropdown(item.id)" class="p-1 hover:bg-gray-100 rounded">
                    ⋮
                  </button>
                  <div v-if="dropdownOpen === item.id"
                    class="absolute -left-15 bg-white border border-gray-300 rounded shadow mt-2 z-10">
                    <ul class="p-3">
                      <li @click="viewItem(item.id)"
                        class="hover:bg-gray-100 hover:rounded-md cursor-pointer px-4 mb-1 text-left">View</li>
                      <li @click="editItem(item.id)"
                        class="hover:bg-gray-100 hover:rounded-md cursor-pointer px-4 mb-1 text-left">Edit</li>
                      <li @click="editItem(item.id)"
                        class="hover:bg-gray-100 hover:rounded-md cursor-pointer px-4 mb-1 text-left">Add pet</li>
                      <li @click="deleteItem(item.id)"
                        class="hover:bg-gray-100 hover:rounded-md cursor-pointer px-4 mb-1 text-left">Deactivate</li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="mt-4 flex items-center justify-between">
          <div class="text-sm text-gray-500">
            {{ selected.length }} of {{ filteredItems.length }} row(s) selected.
          </div>
          <div class="flex gap-2">
            <button class="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 disabled:opacity-50"
              :disabled="currentPage === 1" @click="previousPage">
              Previous
            </button>
            <button class="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 disabled:opacity-50"
              :disabled="currentPage === totalPages" @click="nextPage">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <UserDetailModal v-if="isViewUserModalOpen()" :user="getViewUserModalContext()" @close="closeViewUserModal" />
  <EditUserModal v-if="isEditUserModalOpen()" :user="getEditUserModalContext()" @close="closeEditUserModal" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import SidebarItem from '@/components/SidebarItem.vue'
import { useModal } from '@/composables/useModal'
import UserDetailModal from '@/components/UserDetailModal.vue';
import EditUserModal from '@/components/EditUserModal.vue';

import type { User } from '@/types/user';

const {
  isModalOpen: isViewUserModalOpen,
  openModal: openViewUserModal,
  closeModal: closeViewUserModal,
  getContext: getViewUserModalContext
} = useModal<User>('view-user');
const {
  isModalOpen: isEditUserModalOpen,
  openModal: openEditUserModal,
  closeModal: closeEditUserModal,
  getContext: getEditUserModalContext
} = useModal<User>('edit-user');

const searchQuery = ref('')
const sortKey = ref('id')
const sortOrder = ref('asc')
const selected = ref<number[]>([])
const currentPage = ref(1)
const itemsPerPage = ref(16) // Change this value for more/less items per page
const dropdownOpen = ref<number | null>(null)

const headers = [
  { key: 'id', label: 'id' },
  { key: 'name', label: 'name' },
  { key: 'email', label: 'email' },
  { key: 'phone', label: 'phone' },
  { key: 'isActive', label: 'is active' },
]

const items = [
  { id: 1, name: 'Jhon Doe', email: 'jhon@example.com', phone: '+57 3011234567', isActive: true, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }, { id: 2, name: 'Mishi', type: 'Cat', breed: 'Siames', age: 2 }] },
  { id: 2, name: 'Andres Duque', email: 'dukke@example.com', phone: '+57 3006543214', isActive: true, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }, { id: 2, name: 'Mishi', type: 'Cat', breed: 'Siames', age: 2 }] },
  { id: 3, name: 'Homer Simpson', email: 'homer@example.com', phone: '+57 3005678907', isActive: false, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }, { id: 2, name: 'Mishi', type: 'Cat', breed: 'Siames', age: 2 }] },
  { id: 4, name: 'Timmy Turner', email: 'timmy@example.com', phone: '+57 6015671234', isActive: true, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }, { id: 2, name: 'Mishi', type: 'Cat', breed: 'Siames', age: 2 }] },
  { id: 5, name: 'Diego Fonseca', email: 'diego@example.com', phone: '+57 6013456789', isActive: false, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }, { id: 2, name: 'Mishi', type: 'Cat', breed: 'Siames', age: 2 }] },
  { id: 6, name: 'Karol G', email: 'karol@example.com', phone: '+57 3051230987', isActive: true, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }] },
  { id: 7, name: 'Juanito Alimaña', email: 'juanito@example.com', phone: '+57 3101230987', isActive: true, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }] },
  { id: 8, name: 'Pablo Navajas', email: 'pablo@example.com', phone: '+57 6011234567', isActive: true, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }] },
  { id: 9, name: 'Rick Sanchez', email: 'rick@example.com', phone: '+57 3011234567', isActive: true, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }] },
  { id: 10, name: 'Morty Smith', email: 'dukke@example.com', phone: '+57 3006543214', isActive: true, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }] },
  { id: 11, name: 'Ssuke Uchija', email: 'sasuke@example.com', phone: '+57 3005678907', isActive: true, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }] },
  { id: 12, name: 'Maria Carolina', email: 'maria@example.com', phone: '+57 6015671234', isActive: true, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }] },
  { id: 13, name: 'Miguel Angel', email: 'miguel@example.com', phone: '+57 6015671234', isActive: true, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }] },
  { id: 14, name: 'Lisa Simpson', email: 'lisa@example.com', phone: '+57 6015671234', isActive: true, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }] },
  { id: 15, name: 'Krusty el payaso', email: 'krusty@example.com', phone: '+57 6015671234', isActive: true, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }] },
  { id: 16, name: 'J Balvin', email: 'balvin@example.com', phone: '+57 6015671234', isActive: true, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }] },
  { id: 17, name: 'Pablo Gomez', email: 'pablo@example.com', phone: '+57 6015671234', isActive: true, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }] },
  { id: 18, name: 'Nino Nakano', email: 'nino@example.com', phone: '+57 6015671234', isActive: true, pets: [{ id: 1, name: 'Firulais', type: 'Dog', breed: 'Golden Retriever', age: 3 }] },
]

const filteredItems = computed(() => {
  if (!searchQuery.value) return items
  const query = searchQuery.value.toLowerCase()
  return items.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.email.toLowerCase().includes(query)
  )
})

const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / itemsPerPage.value)
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredItems.value.slice(start, end)
})

const selectAll = computed({
  get: () => selected.value.length === filteredItems.value.length,
  set: (value) => {
    selected.value = value ? filteredItems.value.map(item => item.id) : []
  }
})

function sort(key: string) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

function toggleAll() {
  if (selectAll.value) {
    selected.value = filteredItems.value.map(item => item.id)
  } else {
    selected.value = []
  }
}

function toggleDropdown(itemId: number) {
  if (dropdownOpen.value === itemId) {
    dropdownOpen.value = null // Close if it's already open
  } else {
    dropdownOpen.value = itemId // Open the dropdown for this item
  }
}

function editItem(id: number) {
  // Handle editing the item
  console.log(`Editing item: ${id}`);
  const userData = items.find(item => item.id === id);
  openEditUserModal(userData);
  dropdownOpen.value = null; // Close dropdown after action
}

function viewItem(id: number) {
  // Handle editing the item
  console.log(`Editing item: ${id}`);
  const userData = items.find(item => item.id === id);
  openViewUserModal(userData);
  dropdownOpen.value = null; // Close dropdown after action
}

function deleteItem(id: number) {
  // Handle deleting the item
  console.log(`Deleting item: ${id}`);
  dropdownOpen.value = null; // Close dropdown after action
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Setup for handling the Esc key
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    dropdownOpen.value = null; // Close the dropdown on Esc
  }
}
</script>

<style scoped>
/* Optional: additional styles for dropdown positioning */
</style>
