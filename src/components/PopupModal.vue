<template>
  <div v-if="isOpen" class="popup-overlay" @click="closePopup">
    <div class="popup-content" @click.stop>
      <div class="popup-options">
        <div class="popup-option" @click="editGroup">
          <i class="fa fa-pencil"></i> Edit Group
        </div>
        <div class="popup-option" :class="{ 'disabled': selectedNodeId.level === 4 }" @click="createChildGroup">
          <i class="fa fa-plus"></i> Create Child Group
        </div>
        <div class="popup-option" :class="{ 'disabled': selectedNodeId.level === 1 || selectedNodeId.level === 2 || selectedNodeId.level > 3}"  @click="addRemoveClinicians">
          <i class="fa fa-plus"></i> Add/Remove Clinicians
        </div>
        <div class="popup-option" :class="{ 'disabled': selectedNodeId.level === 3 ||selectedNodeId.level === 4 }" @click="addRemoveClinicians">
          <i class="fa fa-plus"></i> Add/Remove Group
        </div>
        <div class="popup-option" :class="{ 'disabled': selectedNodeId.level === 4 }" @click="removeGroup">
          <i class="fa fa-trash"></i> Remove Group
        </div>
      </div>
      <button  @click="close">X </button>
    </div>
  </div>
</template>

<script>
import { mapState  } from 'vuex';
export default {
  data() {
    return {
      isVisible: false
    };
  },
  props: {
    isOpen: Boolean,
    node: Object
  },
  computed: {
    ...mapState(["selectedNodeId",]), // Get tree data from Vuex
  },
  methods: {
    openPopup() {
      this.isVisible = true;
    },
    close() {
      this.$emit("closeModal"); // Emit event to close modal
    },
    editGroup() {
      this.$emit("edit");
      console.log('Edit Group clicked');
    },
    createChildGroup() {
      this.$emit("createChildGroup",this.selectedNodeId);
      console.log('Create Child Group clicked');
    },
    addRemoveClinicians() {
      this.$emit("addRemoveClinicians");
    },
    removeGroup() {
      this.$emit("addRemoveClinicians");
    }
  }
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 260px;
  text-align: right; /* Align content to the left inside the modal */
  z-index: 10000;
}

h3 {
  margin-bottom: 20px;
}

.popup-options {
  /* display: grid; */
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.popup-option {
  display: -webkit-box;
  align-items: center;
  justify-content: center;
  padding: 10px;
  /* background-color: #f1f1f1; */
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.popup-option:hover {
  background-color: #e0e0e0;
}

.popup-option i {
  margin-right: 10px;
  font-size: 20px;
}

.close-btn {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #d32f2f;
}
.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>