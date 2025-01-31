<template>
  <div>
    <PopupModal @addRemoveClinicians="addRemoveClinicians" :isOpen="showModal" :node="selectedNode" @createChildGroup="createChildGroup" @closeModal="closeModal" @edit="edit"   />
    <AddPopup :headerName="'Create Child Group'" :isAddOpen="showAddModal" :node="selectedNode" @closeAddModal="closeAddModal" @edit="edit"  @saveGroup="saveGroup" />
    <TreeNode :nodes="data" @showPopUp="openModal" :updateData="updateData" :editNode="editNode" @saveEdit="saveEdit"/>
    </div>
</template>

<script>
// import { ref } from 'vue';
// import data from './data.js';
import { mapState,mapActions  } from 'vuex';
import PopupModal from '../components/PopupModal.vue';
import AddPopup from '../components/AddPopup.vue';
// import { useRouter } from 'vue-router';
import { nextTick } from 'vue';
import TreeNode from '../components/TreeNode.vue';



export default {
  data() {
    return {
      // data,
      editNode:false,
      showModal: false,
      showAddModal:false,
      selectedNode: null,
      updateData:null,
      
    };
  },
  components: { PopupModal,TreeNode,AddPopup },
  computed: {
    ...mapState(["data"]), // Get tree data from Vuex
  },
  methods: {
    ...mapActions(["startEditing", "saveNodeEdit","addNode"]),
    showPopup(node) {
      this.updateData = node;
      console.log("node",node)
    nextTick(() => {
      console.log("ref",this.$refs.popupRef);
      if (this.$refs.popupRef) {
        this.$refs.popupRef.openPopup(); // Open the modal
      }
    });
  },

    toggleCollapse(node){
     node.collapsed = !node.collapsed;
  },
  startEdit(child) {
      child.isEditing = true;
    },
    endEdit(child) {
      child.isEditing = false;
    },
    openModal(node) {
      this.selectedNode = node;
      this.showModal = true;
    },
    openAddModal(node) {
      this.selectedNode = node;
      this.showAddModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedNode = null;
    },
    closeAddModal() {
      this.showAddModal = false;
      this.selectedNode = null;
    },
    edit() {
      this.editNode = true;
      this.showModal = false;
     console.log("editNode")
    },
    createChildGroup() {
      console.log()
      this.showAddModal = true;
      this.showModal = false;
     console.log("editNode")
    },
    saveEdit(updatedNode) {
  
      this.saveNodeEdit({ nodeId: updatedNode.id, newName: updatedNode.name })

       this.editNode = false
    },
    saveGroup(name){
      this.addNode({ nodeId: this.selectedNode.id, newName: name })
    },
    addRemoveClinicians(){
     
      this.$router.push('/group-info');
    }

}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tree {
      list-style-type: none;
      padding-left: 20px;
      position: relative;
    }
    .tree::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 10px;
      width: 2px;
      background-color: gray;
    }
    .tree-node {
      cursor: pointer;
      font-weight: bold;
      display: block;
      margin: 5px 0;
      position: relative;
    }
    .tree-branch {
      list-style-type: none;
      padding-left: 20px;
      position: relative;
    }
    .tree-branch::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 50%;
      left: -10px;
      width: 2px;
      background-color: gray;
    }
    .tree-branch::after {
      content: '';
      position: absolute;
      top: 50%;
      left: -10px;
      width: 210px;
      height: 2px;
      background-color: gray;
    }
    .tree-leaf {
      list-style-type: none;
      padding-left: 20px;
      position: relative;
    }
    .tree-leaf::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 50%;
      left: -10px;
      width: 2px;
      background-color: lightgray;
    }
    .tree-leaf::after {
      content: '';
      position: absolute;
      top: 50%;
      left: -10px;
      width: 10px;
      height: 2px;
      background-color: lightgray;
    }

    .ellipsis {
  font-size: 30px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
}
</style>
