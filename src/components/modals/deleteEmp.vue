<template>
    <!-- Delete Employee -->
  <div class="modal fade " id="deleteModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5 class="modal-title " id="exampleModalLabel">Delete Employee</h5>
        </div>
        <div class="modal-body">
          Are you sure you want to Delete this Employee ?
            <div class="d-flex flex-row justify-content-around my-4">
              <div class="pe-0"><b>ID: </b> {{selectEmp.id}}</div>
              <div ><b>Name: </b> {{selectEmp.name}}</div>
              <div ><b>Designation: </b> {{selectEmp.designation}}</div>
              <div ><b>Status: </b> {{selectEmp.status}}</div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
          <button @click="deleteEmployee(selectEmp.id)" type="button" class="btn btn-primary" data-bs-dismiss="modal">Yes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {

  setup(){
    const store = useStore()
    const deleteEmployee = (id) =>{
      store.dispatch("deleteEmployee",id)
    }
    return{
      deleteEmployee,
      selectEmp: computed(() => store.getters.getSelectedEmployee)
    }
  }

  
}
</script>

<style>

</style>