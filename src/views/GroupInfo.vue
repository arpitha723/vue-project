<template>
    <div class="container mt-4">
      <h2>Clinicians in group</h2>
      <div class="row mb-3">
        <div class="col-4 d-flex justify-content-start">
        <button type="button" class="btn btn-success" @click="openAddModal"><i class="fa fa-plus"></i> </button>
        </div>
        <div class="col-8 d-flex justify-content-end">
          <input v-model="searchQuery" type="text" class="form-control w-25" placeholder="Search..." />
        </div>
      </div>
  
      <!-- User List with Row & Columns -->
      <div class="row border-bottom py-2 fw-bold">
        <div class="col-8 text-end">Full Name</div>
        <div class="col-4 text-end">Remove from group</div>
      </div>
  
      <div v-for="(user, index) in filteredUsers" :key="index" class="row py-2 border-bottom align-items-center">
        <div class="col-8">{{ user.fullName }}</div>
        <div class="col-4 text-end">
        <div >
          <i class="fa fa-trash"></i> 
        </div>
        </div>
      </div>
      <AddPopup :headerName="'Create Clinician'" :isAddOpen="showAddModal" :node="selectedNode" @closeAddModal="closeAddModal" @edit="edit"  @saveGroup="saveGroup" />
    </div>
  </template>
  
  <script>
  import AddPopup from '../components/AddPopup.vue';

  export default {
    data() {
      return {
        searchQuery: "",
        users: [
          { fullName: "John Doe" },
          { fullName: "Jane Smith" },
          { fullName: "Alice Johnson" }
        ],
        showAddModal:false
      };
    },
    components: {AddPopup },
    computed: {
      filteredUsers() {
        return this.users.filter(user =>
          user.fullName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
      removeUser(index) {
        this.users.splice(index, 1);
      },
      closeAddModal(){
        this.showAddModal = false;
      },
      openAddModal() {
      this.showAddModal = true;
    },
    }
  };
  </script>
  
  <style scoped>
  .row {
    border-radius: 5px;
  }
  
  .row:nth-child(even) {
    background-color: #f8f9fa;
  }
  </style>
  