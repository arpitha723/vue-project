<template>
    <div class="tree-container">
      <div v-for="node in nodes" :key="node.id" class="tree-node">
        <div class="node-header" @click="toggleCollapse(node.id)">
          <span class="toggle-icon">{{ isCollapsed(node.id) ? '▶' : '▼' }}</span>

        
          <input
          v-if="currentNode?.id== node.id"
          :key="node.id"
          v-model="currentNode.name"
          @blur="saveEdit(node)"
          @keyup.enter="saveEdit(node)"
          ref="editInput"
          class="edit-input"
        />

          <span  v-else class="node-title">{{ node.name }}</span>
          <button class="button-class" @click.stop="showPopUp(node)">
          <div class="ellipsis">⋮</div>
        </button>
        <div v-if="isDelete ==true && currentNode?.id== node.id" class="popup-option" @click="removeGroup">
          <i class="fa fa-trash"></i> 
        </div>
        
        </div>
        <div v-show="!isCollapsed(node.id)" class="children">
          <TreeNode v-if="node.children" :nodes="node.children"  @showPopUp="showPopUp" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TreeNode',
    props: {
      nodes: {
        type: Array,
        required: true
      },
      updateData: {
        type: Array,
      },
      editNode:{
        type:Boolean,
      }
    },
    data() {
      return {
        node:{
            isEditing:true ,
           
        },
        currentNode:null,
        collapsedNodes: new Set() 
      };
    },
    methods: {
      toggleCollapse(nodeId) {
        if (this.collapsedNodes.has(nodeId)) {
          this.collapsedNodes.delete(nodeId);
        } else {
          this.collapsedNodes.add(nodeId);
        }
      },
      isCollapsed(nodeId) {
        return this.collapsedNodes.has(nodeId);
      },
      showPopUp(node) {
        console.log("in tree node",node)
        this.currentNode = node
      this.$emit('showPopUp', node); // Emit event to parent with node details
    },
    // editNode(node) {
    //   node.isEditing = true;
    //   console.log("in tree node",this.updateData)
    //   this.$nextTick(() => {
    //     this.$refs.editInput?.[0]?.focus(); // Auto-focus input
    //   });
    // },
    deleteNode(node) {
      this.$emit('deleteNode', node); // Emit event to parent
    },
    saveEdit(node) {
      this.$emit('saveEdit', node);
      if (!this.currentNode) return;
      node.name = this.currentNode.name; // Save updated name
      this.currentNode = null; // Exit edit mode
         node.isEditing = false;
    },

    }
  };
  </script>
  
  <style scoped>
  .tree-container {
    padding-left: 20px;
    border-left: 2px dotted #000;
  }
  
  .tree-node {
    margin: 5px 0;
  }
  
  .node-header {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  
  .toggle-icon {
    margin-right: 5px;
    font-size: 12px;
  }
  
  .node-title {
    font-weight: bold;
  }
  
  .children {
    padding-left: 20px;
  }
  .edit-input {
  font-size: 14px;
  padding: 2px;
  border: 1px solid #ccc;
  outline: none;
}
  .button-class{
    background-color: white;
    border: 0;
  }

  .ellipsis {
  font-size: 30px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
}
.editable-item {
  display: inline-block;
  margin: 10px 0;
  font-family: 'Arial', sans-serif;
}

.edit-input {
  font-size: 16px;
  padding: 8px 12px;
  border: 2px solid #4CAF50;  /* Green border for emphasis */
  border-radius: 6px;
  background-color: #f9f9f9; /* Light grey background */
  color: #333;
  outline: none;
  transition: all 0.3s ease; /* Smooth transition for focus */
}


  </style>
  