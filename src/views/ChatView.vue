<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <SidebarItem />

    <!-- Main content -->
    <div class="flex-1 flex">
      <!-- Contacts List -->
      <div class="w-72 bg-[#3e75df] text-white">
        <div class="p-4">
          <div v-for="contact in contacts" :key="contact.email" :class="[
            'p-3 rounded-md flex justify-between items-center cursor-pointer mb-2',
            selectedContact === contact ? 'bg-[#6591e5]' : 'hover:bg-[#6591e5]'
          ]" @click="selectContact(contact)">
            <span class="truncate">{{ contact.email }}</span>
          </div>
        </div>
      </div>

      <!-- Chat Area -->
      <div class="flex-1 flex flex-col">
        <div class="p-6">
          <h1 class="text-2xl font-bold mb-6">Contacts</h1>
        </div>

        <!-- Messages -->
        <div class="flex-1 p-6 overflow-y-auto">
          <div class="space-y-4">
            <div v-for="(message, index) in messages" :key="index" class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                👤
              </div>
              <div class="bg-white p-3 rounded-lg shadow max-w-md">
                {{ message.text }}
              </div>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="p-4 border-t">
          <div class="flex gap-2">
            <input type="text" v-model="newMessage" placeholder="Type your message here..."
              class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @keyup.enter="sendMessage">
            <button @click="sendMessage"
              class="px-6 py-2 bg-[#3e75df] text-white rounded-md hover:bg-[#6591e5] focus:outline-none focus:ring-2 focus:ring-blue-500">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SidebarItem from '@/components/SidebarItem.vue'

const contacts = [
  { email: 'jhon@example.com' },
  { email: 'dukke@example.com' },
  { email: 'timmy@example.com' },
  { email: 'homer@example.com' }
]

const messages = ref([
  { text: 'Hi there' },
  { text: 'The advantages of Artificial Intelligence' }
])

const selectedContact = ref(contacts[0])
const newMessage = ref('')

function selectContact(contact) {
  selectedContact.value = contact
}

function sendMessage() {
  if (newMessage.value.trim()) {
    messages.value.push({
      text: newMessage.value
    })
    newMessage.value = ''
  }
}
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
