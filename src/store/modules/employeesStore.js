import axios from 'axios'
import { ref } from 'vue'
import { useToast } from "vue-toastification";
const toast = useToast();
export const state = {
    allEmployees:[],
    selectedEmployee:{}
  }

export const  getters = {
    getAllEmployeesData: (state => state.allEmployees),
    getSelectedEmployee: (state => state.selectedEmployee)
  }

export const  mutations = {

    setAllEmployeesData(state,data){
      state.allEmployees = data
    },
    setSelectedEmployee(state,data){
      state.selectedEmployee = data
    }
  }

  export const  actions = {
    async allEmployeesData({commit}){
      const res = await axios.get("http://localhost:3000/employees")
      if(res.status == 200){
        commit("setAllEmployeesData",res.data)
        localStorage.setItem("allEmployee",JSON.stringify(res.data))
      }else{
        console.log(res)
      }
      return res;
    },

    async deleteEmployee({commit, getters},id){
      const res = await axios.delete(`http://localhost:3000/employees/${id}`)
      if(res.status == 200){
        toast.success("Employee deleted Successfully");
        const empData = ref(getters.getAllEmployeesData.filter(emp => emp.id != id) )
        commit("setAllEmployeesData",empData)
        localStorage.setItem("allEmployee",JSON.stringify(empData.value))
      }else{
        toast.error("Employee deleted failure");
        console.log(res)
      }
      return res;
    },

    async addEmployeeData({getters},payload){
      const res = await axios.post("http://localhost:3000/employees",{
      name: payload.name,
      designation: payload.designation,
      salary: payload.salary,
      image: payload.image,
      gender: payload.gender,
      status: payload.status,
      })
      
      if(res.status == 201){
        toast.success("Employee added Successfully");
        const empData = ref(getters.getAllEmployeesData)
        empData.value.push(res.data)
        localStorage.setItem("allEmployee",JSON.stringify(empData.value))
      }
      else{
        toast.error("Employee added failure");
        console.log(res)
      }
      return res;
    },

    async updateEmployeeData({commit,getters},payload){
      const res = await axios.put(`http://localhost:3000/employees/${payload.id}`,{
      name: payload.name,
      designation: payload.designation,
      salary: payload.salary,
      gender: payload.gender,
      status: payload.status,
      })

      if(res.status == 200){
        toast.success("Employee updated Successfully");
        const empData = ref(getters.getAllEmployeesData.map(emp => emp.id==res.data.id ? {...res.data} : {...emp}))
        commit("setAllEmployeesData",empData.value)
        localStorage.setItem("allEmployee",JSON.stringify(empData.value))
      }else{
        toast.error("Employee added failure");
        console.log(res)
      }
      return res;
    },

    selectedEmployee({commit},selectEmpData){
      commit("setSelectedEmployee",selectEmpData)
    }
    
  }
