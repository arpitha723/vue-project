import { createStore } from 'vuex';
import data from '../data/data'; // Import your tree data

export default createStore({
  state: {
    data: data, // Store tree data globally
    editingNodeId: null, // Track which node is being edited
  },
  mutations: {
    SET_EDITING_NODE(state, nodeId) {
      state.editingNodeId = nodeId; // Store ID of node being edited
    },
    UPDATE_NODE_NAME(state, { nodeId, newName }) {
      function updateNode(nodes) {
        nodes.forEach((node) => {
          if (node.id === nodeId) {
            node.name = newName; // Update name
          }
          if (node.children) {
            updateNode(node.children); // Recursively update children
          }
        });
      }
      updateNode(state.data);
    },

    ADD_NODE_NAME(state, { nodeId, newName }) {
    
      function addNode(nodes) {
        nodes.forEach((node) => {
          console.log("node click",node)
          if (node.id === nodeId) {
             let data ={
              id: `child-${Date.now()}`, name: newName
            }
            if (!node.children) {
              node.children = [];
            }
            
            // Push the new child to the children array
            node.children.push(data);
          }
    
          // Recursively update children if present
          if (node.children) {
            addNode(node.children); // Recursively check children
          }
        });
      }
      addNode(state.data);
    },
    

  },
  actions: {
    startEditing({ commit }, nodeId) {
      commit("SET_EDITING_NODE", nodeId);
    },
    saveNodeEdit({ commit }, { nodeId, newName }) {
      commit("UPDATE_NODE_NAME", { nodeId, newName });
      commit("SET_EDITING_NODE", null); // Exit edit mode
    },
    addNode({ commit }, { nodeId, newName }) {
      commit("ADD_NODE_NAME", { nodeId, newName });
    }
  },
  getters: {
    getTreeData: (state) => state.data,
    getEditingNodeId: (state) => state.editingNodeId,
  }
});