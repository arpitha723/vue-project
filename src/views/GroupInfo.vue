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
        <div class="col-8 ">Full Name</div>
        <div class="col-4 text-end">Remove from group</div>
      </div>
      <div v-if="filteredUsers && filteredUsers.length >= 0">
      <div v-for="(node, index) in filteredUsers" :key="index" class="row py-2 border-bottom align-items-center">
        <div class="col-8">{{ node.name }}</div>
        <div class="col-4 text-end">
        <div >
          <i class="fa fa-trash" @click ="deleteChildNode(node)"></i> 
        </div>
        </div>
      </div>
    </div>
      <AddPopup :headerName="'Create Clinician'" :isAddOpen="showAddModal" :node="selectedNode" @closeAddModal="closeAddModal" @edit="edit"  @saveGroup="saveGroup" />
    </div>
  </template>
  
  <script>
  import AddPopup from '../components/AddPopup.vue';
  import { useRoute } from 'vue-router';
  import { mapState,mapActions } from 'vuex';
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
      ...mapState(['selectedNodeId', 'selectedNodeChildren']),
  
      filteredUsers() {
        console.log("selectedNodeChildren",this.selectedNodeChildren)
        return this.selectedNodeChildren?this.selectedNodeChildren.filter(node =>
          node.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        ):[];
      },
      
    },
    created(){
      const route = useRoute();
    this.nodeId = route.params.id;
    console.log("route",this.nodeId)
    },
    methods: {
      ...mapActions(['addChild', 'deleteChild']),
      removeUser(index) {
        this.users.splice(index, 1);
      },
      closeAddModal(){
        this.showAddModal = false;
      },
      openAddModal() {
      this.showAddModal = true;
    },
    fetchNodeChildren() {
      // Replace this with actual logic to fetch or retrieve the node and its children
      // Example:
      const node = this.findNodeById(this.nodeId, this.$root.data);
      if (node) {
        this.nodeChildren = node.children;
      }
    },
    saveGroup(name){
      if (name.trim()) {
        const newChild = {
          id: `child-${Date.now()}`, // Generate unique ID
          name: name,
          children: []
        };
        this.addChild(newChild);  // Dispatch action to add child
        // name  = ''; // Clear the input
      }
 

    },
    deleteChildNode(node){
      console.log("selectedNodeChildren",this.selectedNodeChildren);
      console.log("node",node)
      this.deleteChild(node);
    }
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
  