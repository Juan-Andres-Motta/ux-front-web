<template>
  <div class="flex h-dvh bg-gray-50">
    <!-- Sidebar -->
    <SidebarItem />

    <!-- Main content -->
    <div class="flex-1 h-dvh">
      <div class="p-6 h-dvh overflow-y-auto">
        <h1 class="text-2xl font-bold mb-6">PQRS</h1>

        <!-- Search Filter -->
        <div class="mb-6">
          <input type="text" placeholder="Filter by title or email" v-model="searchQuery"
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
                <td class="px-4 py-3">{{ item.title }}</td>
                <td class="px-4 py-3">{{ item.email }}</td>
                <td class="px-4 py-3">{{ item.phone }}</td>
                <td class="px-4 py-3 text-right relative">
                  <button @click="toggleDropdown(item.id)" class="p-1 hover:bg-gray-100 rounded">
                    ⋮
                  </button>
                  <div v-if="dropdownOpen === item.id"
                    class="absolute -left-15 bg-white border border-gray-300 rounded shadow mt-2 z-10">
                    <ul class="p-3">
                      <li @click="editItem(item.id)"
                        class="hover:bg-gray-100 hover:rounded-md cursor-pointer px-4 mb-1 text-left">Edit</li>
                      <li @click="deleteItem(item.id)"
                        class="hover:bg-gray-100 hover:rounded-md cursor-pointer px-4 mb-1 text-left">Delete</li>
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import SidebarItem from '@/components/SidebarItem.vue'

const searchQuery = ref('')
const sortKey = ref('id')
const sortOrder = ref('asc')
const selected = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(16) // Change this value for more/less items per page
const dropdownOpen = ref(null)

const headers = [
  { key: 'id', label: 'id' },
  { key: 'title', label: 'title' },
  { key: 'email', label: 'email' },
  { key: 'phone', label: 'phone' }
]

const items = [
  { id: 1, title: 'App not working', email: 'jhon@example.com', phone: '+57 3011234567' },
  { id: 2, title: 'Cant create pet', email: 'dukke@example.com', phone: '+57 3006543214' },
  { id: 3, title: 'Pet not appearing', email: 'andres@example.com', phone: '+57 3005678907' },
  { id: 4, title: 'App not working', email: 'juan@example.com', phone: '+57 6015671234' },
  { id: 5, title: 'App not working', email: 'carol@example.com', phone: '+57 6013456789' },
  { id: 6, title: 'Cant login', email: 'maria@example.com', phone: '+57 3051230987' },
  { id: 7, title: 'Return 404', email: 'homer@example.com', phone: '+57 3101230987' },
  { id: 8, title: 'App not working', email: 'rick@example.com', phone: '+57 6011234567' },
  { id: 9, title: 'App not working', email: 'jhon@example.com', phone: '+57 3011234567' },
  { id: 10, title: 'Cant create pet', email: 'dukke@example.com', phone: '+57 3006543214' },
  { id: 11, title: 'Pet not appearing', email: 'andres@example.com', phone: '+57 3005678907' },
  { id: 12, title: 'App not working', email: 'juan@example.com', phone: '+57 6015671234' },
  { id: 13, title: 'App not working', email: 'carol@example.com', phone: '+57 6013456789' },
  { id: 14, title: 'Cant login', email: 'maria@example.com', phone: '+57 3051230987' },
  { id: 15, title: 'Return 404', email: 'homer@example.com', phone: '+57 3101230987' },
  { id: 16, title: 'App not working', email: 'rick@example.com', phone: '+57 6011234567' },
  { id: 17, title: 'App not working', email: 'rick@example.com', phone: '+57 6011234567' },
  { id: 18, title: 'App not working', email: 'rick@example.com', phone: '+57 6011234567' },
]

const filteredItems = computed(() => {
  if (!searchQuery.value) return items
  const query = searchQuery.value.toLowerCase()
  return items.filter(item =>
    item.title.toLowerCase().includes(query) ||
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

function sort(key) {
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

function toggleDropdown(itemId) {
  if (dropdownOpen.value === itemId) {
    dropdownOpen.value = null // Close if it's already open
  } else {
    dropdownOpen.value = itemId // Open the dropdown for this item
  }
}

function editItem(id) {
  // Handle editing the item
  console.log(`Editing item: ${id}`);
  dropdownOpen.value = null; // Close dropdown after action
}

function deleteItem(id) {
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

function handleKeydown(event) {
  if (event.key === 'Escape') {
    dropdownOpen.value = null; // Close the dropdown on Esc
  }
}
</script>

<style scoped>
/* Optional: additional styles for dropdown positioning */
</style>
