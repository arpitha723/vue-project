<template>
  <div class="tree-container">
    <draggable
      :list="nodes" 
      @start="onDragStart"
      @end="onDragEnd"
      :group="'nodes'"
      class="tree-node-list"
      @change="onNodesChange" 
    >
      <div v-for="node in nodes" :key="node.id" class="tree-node">
        <div class="node-header" @click="toggleCollapseAndLoad(node)">
          <span class="toggle-icon">{{ isCollapsed(node.id) ? '⊞' : '⊟' }} </span>
          <!-- <span v-if="!node.isLoaded" @click="loadChildren(node)">⌛</span> -->
          <input
            v-if="node.isEditing?node.isEditing:false"
            :key="node.id"
            v-model="currentNode.name"
            @blur="saveEdit(node)"
            @keyup.enter="saveEdit(node)"
            ref="editInput"
            class="edit-input"
          />
          
          <span v-else class="node-title">{{ node.name }}</span>
          <button class="button-class" @click.stop="showPopUp(node)">
            <div class="ellipsis">⋮</div>
          </button>

          <div v-if="isDelete ==true && currentNode?.id== node.id" class="popup-option" @click="removeGroup">
            <i class="fa fa-trash"></i> 
          </div>
        </div>

        <div v-show="!isCollapsed(node.id)" class="children">
          <TreeNode v-if="node.children && node.isLoaded" :nodes="node.children" @showPopUp="showPopUp" />
        </div>
      </div>
    </draggable>
  </div>
</template>
  
  <script>
  import {mapActions  } from 'vuex';
 import { VueDraggableNext } from 'vue-draggable-next'
  export default {
    components: {
      draggable: VueDraggableNext,
        },
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
    mounted() {
      this.nodes.forEach(node => {
    this.collapsedNodes.add(node.id); // Mark all nodes as collapsed initially
    if (node.children) {
      this.initializeNodes(node.children); // Ensure children nodes also have the collapsed state
    }
  });
  },
    watch: {
    // 🔥 Watch `editNode` and `currentNodeId` to update only the specific node
    editNode(newValue) {
      if (this.currentNode !== null) {
        this.updateNodeEditing(this.nodes, this.currentNode, newValue);
      }
      console.log("this.updateNodeEditing",newValue)
    }
  },
    methods: {
      ...mapActions(["loadNodeChildren"]),
      initializeNodes(nodes) {
     
      nodes.forEach((node) => {
        if (!("isEditing" in node)) {
          node.isEditing = false; // Vue 3 reactivity handles new properties automatically
        }
        if (node.children) {
          this.initializeNodes(node.children); // Recursively ensure all children have isEditing
        }
      });
      console.log("node ",nodes)
    },
    async toggleCollapseAndLoad(node) {
    if (this.collapsedNodes.has(node.id)) {
      // Node is collapsed; collapse it by removing it from the set
      this.collapsedNodes.delete(node.id);
      if (!node.isLoaded) {
        try {
          // Load children if not already loaded
          const children = await this.loadNodeChildren(node.id);
          if (children && Array.isArray(children)) {
            node.children = [...children];  // Force reactivity to detect changes
          }

          // Mark the node as loaded
          node.isLoaded = true;
          await this.$nextTick(); // Ensure DOM is updated properly
        } catch (error) {
          console.error("Error loading children:", error);
        }
      }
    } else {
      // Node is collapsed, expand it +
      this.collapsedNodes.add(node.id);

      // Check if children are loaded
      // if (!node.isLoaded) {
      //   try {
      //     // Load children if not already loaded
      //     const children = await this.loadNodeChildren(node.id);
      //     if (children && Array.isArray(children)) {
      //       node.children = [...children];  // Force reactivity to detect changes
      //     }

      //     // Mark the node as loaded
      //     node.isLoaded = true;
      //     await this.$nextTick(); // Ensure DOM is updated properly
      //   } catch (error) {
      //     console.error("Error loading children:", error);
      //   }
      // }
    }
  },

  isCollapsed(nodeId) {
    console.log("node",nodeId)
    return this.collapsedNodes.has(nodeId);
  },
      // toggleCollapse(nodeId) {
      //   if (this.collapsedNodes.has(nodeId)) {
      //     this.collapsedNodes.delete(nodeId);
      //   } else {
      //     this.collapsedNodes.add(nodeId);
      //   }
      // },
      // isCollapsed(nodeId) {
      //   return this.collapsedNodes.has(nodeId);
      // },
      showPopUp(node) {
        console.log("in tree node",node)
        this.currentNode = node
        this.$emit('showPopUp', node); // Emit event to parent with node details
    },
    deleteNode(node) {
      this.$emit('deleteNode', node); // Emit event to parent
    },
    updateNodeEditing(nodes, nodeId, newValue) {
      nodes.forEach(node => {
        if (node.id === nodeId.id) {
          node.isEditing = newValue;
        }
        if (node.children) {
          this.updateNodeEditing(node.children, nodeId, newValue);
        }
      });
      console.log(this.nodes)
    },
    saveEdit(node) {
      node.isEditing = false;
      this.$emit('saveEdit', node);
      if (!this.currentNode) return;
      node.name = this.currentNode.name; // Save updated name
      this.currentNode = null; // Exit edit mode
         node.isEditing = false;
    },
    loadChildren(node) {
      console.log(node)
      this.loadNodeChildren(node.id); // Lazy load children for this node
    },
    onNodesChange() {
    this.$emit('update:nodes', this.nodes);  // Emit the updated list of nodes to the parent
  },
  onDragStart(event) {
    console.log('Drag started', event);
  },
  onDragEnd(event) {
    console.log('Drag ended', event);
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
    position: relative;
    
  }
  
  .node-header {
    position: relative;
    display: flex;
    align-items: center;
  }
  .node-header::after {
  content: "";
  position: absolute;
  top: 50%;
  left: -20px;
  width: 20px;
  border-top: 2px dotted #000; 
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
  