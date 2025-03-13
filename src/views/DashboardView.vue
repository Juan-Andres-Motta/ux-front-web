<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <SidebarItem />

    <!-- Main content -->
    <div class="flex-1 overflow-auto">
      <div class="p-6">
        <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Reports by week -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-medium mb-4">Reports by week</h2>
            <div class="flex items-baseline mb-1">
              <div class="text-4xl font-bold">178</div>
              <div class="ml-2 text-red-500 text-sm flex items-center">
                <span class="mr-1">▼</span>
                2.1% vs last week
              </div>
            </div>
            <div class="text-sm text-gray-500 mb-6">Reports from 1-8 Mar, 2025</div>

            <!-- Placeholder for chart -->
            <div class="h-48 mb-4 bg-gray-200 flex items-center justify-center">
              <ChartItem />
            </div>

            <!-- Legend -->
            <div class="flex items-center justify-start space-x-6">
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                <span class="text-sm text-gray-600">Last 6 days</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                <span class="text-sm text-gray-600">Last Week</span>
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-lg font-medium mb-4">Quick Stats</h2>
            <div class="grid grid-cols-2 gap-4 h-80">
              <!-- Users connected -->
              <div class="bg-white rounded-lg shadow p-4 flex">
                <div class="flex items-center mb-1">
                  <div class="w-20 h-20 rounded-full bg-[#3e75df] text-white flex items-center justify-center mr-3">
                    <UserIcon width="48" height="48" />
                  </div>
                </div>
                <div class="flex flex-col justify-center gap-2 ml-3">
                  <div class="text-sm text-gray-500 mb-1">users connected</div>
                  <div class="text-3xl font-bold">27</div>
                  <div class="text-green-500 text-xs">
                    + 2.3 % vs last week
                  </div>
                </div>
              </div>

              <!-- Reports created -->
              <div class="bg-white rounded-lg shadow p-4 flex">
                <div class="flex items-center mb-1">
                  <div class="w-20 h-20 rounded-full bg-[#3e75df] text-white flex items-center justify-center mr-3">
                    <WarningReportIcon width="24" height="24" />
                  </div>
                </div>
                <div class="flex flex-col justify-center gap-2 ml-3">
                  <div class="text-sm text-gray-500 mb-1">reports created</div>
                  <div class="text-3xl font-bold">47</div>
                  <div class="text-green-500 text-xs">
                    + 1.2 % vs last week
                  </div>
                </div>
              </div>

              <!-- Reports solved -->
              <div class="bg-white rounded-lg shadow p-4 flex">
                <div class="flex items-center mb-1">
                  <div class="w-20 h-20 rounded-full bg-[#3e75df] text-white flex items-center justify-center mr-3">
                    <CheckReportIcon width="48" height="48" />
                  </div>
                </div>
                <div class="flex flex-col justify-center gap-2 ml-3">
                  <div class="text-sm text-gray-500 mb-1">reports solved</div>
                  <div class="text-3xl font-bold">5</div>
                  <div class="text-green-500 text-xs">
                    + 15.6 % vs last week
                  </div>

                </div>
              </div>

              <!-- Users created -->
              <div class="bg-white rounded-lg shadow p-4 flex">
                <div class="flex items-center mb-1">
                  <div class="w-20 h-20 rounded-full bg-[#3e75df] text-white flex items-center justify-center mr-3">
                    <UserIcon width="48" height="48" />
                  </div>
                </div>
                <div class="flex flex-col justify-center gap-2 ml-3">
                  <div class="text-sm text-gray-500 mb-1">users created</div>
                  <div class="text-3xl font-bold">3</div>
                  <div class="text-red-500 text-xs">
                    - 1.9 % vs last week
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Reports heatmap -->
          <div class="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <h2 class="text-lg font-medium mb-4">Reports heatmap</h2>
            <div class="h-80 w-full bg-gray-200 rounded flex items-center justify-center overflow-hidden">
              <img class="object-cover h-full w-full rounded-3xl" src="/map.webp" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarItem from '@/components/SidebarItem.vue'
import ChartItem from '@/components/ChartItem.vue'
import UserIcon from '@/components/UserIcon.vue'
import CheckReportIcon from '@/components/CheckReportIcon.vue'
import WarningReportIcon from '@/components/WarningReportIcon.vue'
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
