<template>
    <div class="container text-center my-5">
    <h1 class="my-5 "> <span class="border-bottom">Update Employee</span></h1>
    <div class="row">
        <div class="row d-flex justify-content-center ">
          <div class="col-6 border p-5 rounded shadow-sm border-2">
            <div class="row text-start mb-2">
              <div class="col-12 mb-3">
              <div class="text-center">
                <div class="imageDiv text-center">
                  <img v-if="emp.image" :src="emp.image" alt="No Image Exist" />
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
              <label>Name </label>
              <input
              v-model="emp.name"
                  type="text"
                  name="name"
                  id="name"
                  class="form-control input-alignment"
              />
              </div>
              <div class="col-6 mb-3">
              <label>Designation </label>
              <input
                  v-model="emp.designation"
                  type="text"
                  class="form-control input-alignment"
                  name="Designation"
              />
              </div>
              <div class="col-6 mb-3">
              <label>Salary </label>
              <input
                  v-model="emp.salary"
                  type="number"
                  class="form-control input-alignment"
                  name="salary"
              />
              </div>
              <div class="col-6 mb-3">
              <div class="position-relative">
                  <label> Gender</label>
                  <select
                  v-model="emp.gender" 
                  class="form-select"
                  aria-label="Default select example"
                  >
                  <option selected value="" disabled>Select Gender</option>
                  <option v-for="gen in gender" :key="gen"
                  :selected=" gen.value == emp.gender"
                  :value="gen.value"
                  >{{ gen.value }}</option>
                  </select>
              </div>
              </div>
              <div class="col-6 mb-3">
              <div class="position-relative">
                  <label> Status</label>
                  <select
                  v-model="emp.status"
                  class="form-select"
                  aria-label="Default select example">
                  <option selected value="" disabled>Select Status</option>
                  <option v-for="stats in status" :key="stats"
                  :selected=" stats.value == emp.status" :value="stats.value"
                  >{{ stats.value }}</option>
                  </select>
              </div>
              </div>
            </div> 
            <div class="row mt-3">
              <div>
                <router-link to="/">
                  <button
                  type="button"
                  class="btn btn-secondary text-white me-3"  data-bs-dismiss="modal">
                  back
                  </button>
                </router-link>
                  <button @click="updateEmployee" data-bs-dismiss="modal" type="button" class="btn btn-primary text-white">Update Employee</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
export default{

  setup(){
    const store = useStore();
    const router = useRouter();
      const emp = reactive({
            id: '',
            image:'',
            name: '',
            designation: '',
            salary: '',
            gender: '',
            status: '',
      })

      const selectedEmployee = ref(computed(() => store.getters.getSelectedEmployee))
      emp.id = selectedEmployee.value.id
      emp.image = selectedEmployee.value.image
      emp.name = selectedEmployee.value.name
      emp.designation = selectedEmployee.value.designation
      emp.salary = selectedEmployee.value.salary
      emp.gender = selectedEmployee.value.gender
      emp.status = selectedEmployee.value.status

      const gender = [
        {value:"Male"},
        {value:"Female"}
      ]
      const status = [
        {value:"Completed"},
        {value:"Not Completed"}
      ]

      const updateEmployee = () =>{
        console.log(emp)
          store.dispatch("updateEmployeeData",emp)
          .then((res) => {
            if(res.status == 200){
              router.push("/")
            }
          })
      }
      const getImage = (e) => {
        console.log(e.target.files)
        const files = e.target.files
            encodeImageFileAsURL(files[0]);
      }

    const encodeImageFileAsURL = file => {
        const reader = new FileReader();
        reader.onloadend = function () {
          emp.image = reader.result;
        }
        reader.readAsDataURL(file);
      }
    return{
      getImage,
      updateEmployee,
      emp,
      gender,
      status
    }
  }
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