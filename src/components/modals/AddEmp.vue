<template>
  <!-- Add Employee Modal -->
  <div class="container-xl">
  <div
    class="modal fade "
    id="addModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog form pa-4 modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header d-flex justify-center">
          <h5 class="modal-title" id="exampleModalLabel">Add Employee</h5>
        </div>
        <div class="modal-body text-start">
          <div class="row mb-2">
            <div class="col-12 mb-3">
              <div class="text-center">
                <div class="imageDiv text-center">
                  <img v-if="employee.image" :src="employee.image" alt="" />
                  <svg v-else @click="$refs.addImage.click()" class="cursor-pointer" style="width:24px;height:24px" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z" />
                  </svg>
                </div>
                <input
                
                  type="file"
                  ref="addImage"
                  name="name"
                  @change="getImage"
                  id="name"
                  hidden
                  class="form-control input-alignment"
                />
              </div>
            </div>
            <div class="col-12 mb-3">
              <label> Name </label>
              <input
              v-model="employee.name"
                type="text"
                name="name"
                id="name"
                class="form-control input-alignment"
                required
              />
            </div>
            <div class="col-6 mb-3">
              <label>Designation </label>
              <input
                v-model="employee.designation"
                type="text"
                class="form-control input-alignment"
                name="Designation"
                required
              />
            </div>
            <div class="col-6 mb-3">
              <label>Salary </label>
              <input
                v-model="employee.salary"
                type="number"
                class="form-control input-alignment"
                name="salary"
                required
              />
            </div>
            <div class="col-6 mb-3">
              <div class="position-relative">
                <label> Gender</label>
                <select
                  v-model="employee.gender" 
                  required
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option selected disabled value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div class="col-6 mb-3">
              <div class="position-relative">
                <label> Status</label>
                <select
                  v-model="employee.status"
                  required
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option selected disabled value="">Select Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Not Completed">Not Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary text-white"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button @click="addEmployee"  type="submit" class="btn btn-primary text-white">Add Employee</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
const {  ref }=require("@vue/reactivity");
const { useStore }=require("vuex");
  const store = useStore()
  var employee = ref({
      name: "",
      image:"",
      designation: "",
      salary: "",
      gender: "",
      status: "",
})
  const addEmployee = () =>{
      store.dispatch("addEmployeeData",employee.value);
      employee.value = []
  }


  const getImage = (e) => {
    console.log(e.target.files)
    const files = e.target.files
        encodeImageFileAsURL(files[0]);
  }

 const encodeImageFileAsURL = file => {
    const reader = new FileReader();
    reader.onloadend = function () {
      employee.value.image = reader.result;
    }
    reader.readAsDataURL(file);
  }
</script>

<style scoped>
label {
  margin-bottom: 5px;
}
.imageDiv{
  display: inline-block;
    height: 81px;
    text-align: center;
    width: 89px;
    border-radius: 60px;
}
div > img{
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-radius: 40%;
}

</style>
