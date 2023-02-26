<template>
  <div class="container-xl p-2">
    <div class="row d-flex justify-content-between">
      <div class="col-lg-4 col-12 mb-md-2">
        <h3 class="text-start">
          <b>Employees Record</b>
        </h3>
      </div>
      <div class="col-lg-8 col-12 ">
        <div class="row d-flex justify-content-end">
            <div class="col-md-6 col-8 mb-md-2">
              <input
                type="text" id="search-orders" name="searchorders"
                class="form-control search-orders"
                v-model="searchData"
                placeholder="Search by Name or Designation"  data-v-d1f2b3da=""/>
            </div>
            <div class="col-md-3 col-4 mb-md-2">
              <select class="form-select" id="selectType" @change="employeeStatus()">
                <option class="m-2" :value="type.value" v-for="type in status" :key="type"
                >{{ type.value }}</option>
              </select>
            </div>
            <div class="col-md-auto my-md-0 my-2 text-end col-12">
              <button aria-hidden="true"  data-bs-toggle="modal"
              data-bs-target="#addModal"  class="btn btn-primary ma-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-square-fill me-1" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/></svg>
                Add Employee
              </button>
            </div>
        </div>
      </div>
    </div>
    <div class="border-bottom mt-2 mb-10"></div>
    <div class="tab-content" id="orders-table-tab-content ">
      <div
        class="tab-pane fade show active"
        id="orders-all"  role="tabpanel"  aria-labelledby="orders-all-tab">
        <div class="app-card app-card-orders-table shadow-sm pa-lg-2 p-0">
          <div class="app-card-body ma-0 pa-0">
            <div class="table-responsive rounded-3">
              <table class="table align-middle table-bordered position-relative  table-hover table-light mb-0 text-left" v-if="store.getters.getAllEmployeesData.length">
                <thead class="position-sticky">
                  <tr class="table-dark ">
                    <th class="cell">ID</th>
                    <th class="cell">Name</th>
                    <th class="cell">Designation</th>
                    <th class="cell">Salary</th>
                    <th class="cell text-center">Gender</th>
                    <th class="cell">Status</th>
                    <th class="cell text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                  :class="{'table-success': emp.status == 'Completed',
                  'table-danger': emp.status != 'Completed'}"
                  v-for="emp in employeeData" 
                  :key="emp">
                    <td class="cell">{{ emp.id }}</td>
                    <td class="cell">
                      <div class="d-flex flex-column align-items-center">
                        <div class="imageDiv">
                          <img v-if="emp.image" :src="emp.image" alt="image">
                          <img v-else src="../assets/profile.jpg" alt="alternative">
                          </div>
                        <div>{{ emp.name }}</div>
                      </div>
                    </td>
                    <td class="cell">{{ emp.designation }}</td>
                    <td class="cell">
                      <span class="note">Rs. {{ emp.salary }}</span>
                    </td>
                    <td class="cell text-center">
                      <span>{{ emp.gender }}</span>
                    </td>
                    <td class="cell">{{ emp.status }}</td>
                    <td class="cell text-center">
                      <div class="d-flex justify-content-center flex-md-row flex-column">
                      <span
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                      >
                        <svg
                          @click="selectEmployee(emp)"
                          xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"
                          fill="currentColor"  class="bi bi-trash me-md-4 mb-md-0 mb-sm-1 cursor-pointer text-danger"  viewBox="0 0 16 16">
                          <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                          <path
                            fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </span>
                      <span  class="text-center">
                        <router-link to="/update_employee">
                        <svg
                          @click="selectEmployee(emp)"
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"  height="18"
                          fill="currentColor"  class="bi bi-pencil-square cursor-pointer"  viewBox="0 0 16 16">
                          <path
                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                       </router-link>
                      </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="m-5 text-center" v-else>
                <div v-show="!store.getters.getAllEmployeesData.length > 0" >
                  <h2> No Data exist</h2>
                  <p>If you don't run first time So start the <b>JSON server</b></p>
                  <p><b>First install this command: </b>"npm install -g json-server"</p>
                  <p><b>This Command:</b> "npx json-server --watch src/data/db.json"  run in command Prompt in project</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const { onMounted, ref, computed}=require("@vue/runtime-core");
const { useStore } = require("vuex");

  const store = useStore();
  const searchData = ref();
  const selectEmployee = (emp) => {
    store.dispatch("selectedEmployee",emp)
  }

  const employeeStatus = () => {
    let type = document.getElementById("selectType").value
    if(type == "All"){
      type = ''
      searchData.value = type
    }else{
      searchData.value = type
    }
  }
  const employeeData = computed(() => {
    console.log(searchData)
    if(!store.getters.getAllEmployeesData.length || !searchData.value ){
      return store.getters.getAllEmployeesData
    }
    const query = searchData.value.toLowerCase();
    return store.getters.getAllEmployeesData.filter(
      emp => {
       return emp.name.toLowerCase().includes(query) || 
       emp.designation.toLowerCase().includes(query) ||
       emp.status.toLowerCase().slice(0, 3).includes(query.slice(0, 3)) ||
       emp.gender.toLowerCase().slice(0, 3).includes(query.slice(0, 3))
       
      }
    )
    
  });

    const status = [
    {value:"All"},
    {value:"Completed"},
    {value:"Not Completed"},
    {value:"Male"},
    {value:"Female"}
  ]

  onMounted(() => { 
    store.dispatch("allEmployeesData")
    .then((res) => {
      if(res != 200){
        employeeData.value = JSON.parse(localStorage.getItem("allEmployee"))
      }
    });
  });

</script>

<style scoped>
.imageDiv{
  display: inline-block;
    height: 50px;
    text-align: center;
    width: 50px;
    border-radius: 60px;
}
div > img{
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-radius: 40%;
}
</style>