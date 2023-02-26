<template>
  <div class="container-lg my-4">
    <div class="mb-4">
      <h1 class="text-center">
        <span class="border-bottom  border-4 p-1"><b>VueJs Task</b></span>
      </h1>
    </div>
    <div style="border-radius:20px" class="card shadow-sm py-3">
      <div class="card-body p-0 p-lg-2">
        <EmployeesTable />
      </div>
    </div>
    <DeleteEmp />
    <AddEmployeeModal />
  </div>
</template>

<script setup>
import EmployeesTable from "@/components/EmployeesTable.vue";
import DeleteEmp from '@/components/modals/deleteEmp.vue';
import AddEmployeeModal from '../components/modals/AddEmp.vue';
</script>

<style scoped>

</style>