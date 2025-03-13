<template>
  <div class="w-64 bg-[#3e75df] text-white flex flex-col">
    <div class="p-5 ml-2 text-2xl font-bold">
      <RouterLink to="/dashboard">
        PetMinder
      </RouterLink>
    </div>

    <nav class="flex-1">
      <div class="px-3 py-2">
        <RouterLink class="p-3 flex justify-between items-center cursor-pointer" activeClass="bg-[#6591e5] rounded-md"
          to="/dashboard">
          <div class="flex items-center">
            <span class="mr-3">
              <DashboardIcon />
            </span>
            <span>Dashboard</span>
          </div>
        </RouterLink>

        <RouterLink class="p-3 flex justify-between items-center cursor-pointer" activeClass="bg-[#6591e5] rounded-md"
          to="/users">
          <div class="flex items-center">
            <span class="mr-3">
              <UserIcon />
            </span>
            <span>Users</span>
          </div>
        </RouterLink>

        <RouterLink class="p-3 flex justify-between items-center cursor-pointer" activeClass="bg-[#6591e5] rounded-md"
          to="/reports">
          <div class="flex items-center">
            <span class="mr-3">
              <ReportsIcon />
            </span>
            <span>Reports</span>
          </div>
        </RouterLink>

        <RouterLink class="p-3 flex justify-between items-center cursor-pointer" activeClass="bg-[#6591e5] rounded-md"
          to="/pqrs">
          <div class="flex items-center">
            <span class="mr-3">
              <PqrsIcon />
            </span>
            <span>PQRS</span>
          </div>
        </RouterLink>

        <RouterLink class="p-3 flex justify-between items-center cursor-pointer" activeClass="bg-[#6591e5] rounded-md"
          to="/chat">
          <div class="flex items-center">
            <span class="mr-3">
              <ChatIcon />
            </span>
            <span>Contact</span>
          </div>
        </RouterLink>
      </div>
    </nav>

    <!-- User profile at bottom -->
    <div class="mt-auto p-4 flex items-center border-t border-blue-500">
      <div
        class="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center mr-3 overflow-hidden select-none">
        <img class="object-cover h-full w-full select-none" src="/sprigatito.webp" alt="">
      </div>
      <div class="flex-1">
        <div class="font-medium select-none">Jhon Doe</div>
        <div class="text-xs text-blue-200 select-none">jhondoe@example.com</div>
        <RouterLink class="text-xs text-blue-200 mt-2 hover:text-white" to="/">Logout</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardIcon from '@/components/DashboardIcon.vue'
import UserIcon from '@/components/UserIcon.vue'
import ReportsIcon from '@/components/ReportIcon.vue'
import PqrsIcon from '@/components/PqrsIcon.vue'
import ChatIcon from '@/components/ChatIcon.vue'
</script>
