<template>
    <div v-if="isAddOpen"  class="popup-overlay" @click="closePopup">
      <div class="popup-content" @click.stop>
        <h3>{{ headerName }}</h3>
        <input v-model="name" type="text" placeholder="Enter name" class="input-field" />
        <div class="popup-options">
          <button @click="saveName" class="save-btn">Add</button>
          <button @click="close" class="close-btn">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        isAddOpen: Boolean,
        headerName:String
    },
    data() {
      return {
        name: ''
      };
    },
    methods: {
      close() {
        this.$emit("closeAddModal"); // Emit event to close modal
      },
      saveName() {
        if (this.name) {
          this.$emit("saveGroup", this.name); // Emit name to parent component
          this.close();
        } else {
          alert('Please enter a name');
        }
        this.name = ""
      },
      closePopup(event) {
        if (event.target === event.currentTarget) {
          this.close(); // Close if the overlay is clicked
        }
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
    width: 300px;
    text-align: center;
    z-index: 10000;
  }
  
  h3 {
    margin-bottom: 20px;
  }
  
  .input-field {
    width: 75%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .popup-options {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  
  .save-btn, .close-btn {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .save-btn {
    background-color: #4CAF50;
    color: white;
    border: none;
  }
  
  .save-btn:hover {
    background-color: #45a049;
  }
  
  .close-btn {
    background-color: #f44336;
    color: white;
    border: none;
  }
  
  .close-btn:hover {
    background-color: #d32f2f;
  }
  </style>