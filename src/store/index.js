import { createStore } from 'vuex';
import data from '../data/data'; // Import your tree data
function findNodeById(nodes, id) {
  for (let node of nodes) {
    if (node.id === id) {
      return node; // Found the node
    }
    if (node.children) {
      const found = findNodeById(node.children, id); // Recursively search in children
      if (found) {
        return found; // Return the found node
      }
    }
  }
  return null; // Return null if no match is found
}
const resetEditing = (nodes) => {
  nodes.forEach(node => {
    node.isEditing = false; // Reset isEditing flag for all nodes
    if (node.children) {
      resetEditing(node.children); // Recurse into children
    }
  });
};
function updateNodeEditing(nodes, nodeId) {
  resetEditing(nodes)
  for (let node of nodes) {
    if (node.id === nodeId) {
      node.isEditing = true; // Update the node
      return true; // Stop recursion if found
    }
    if (node.children && updateNodeEditing(node.children, nodeId)) {
      return true; // Continue searching in children
    }
  }
  return false;
}
export default createStore({
  state: {
    data: data, // Store tree data globally
    editingNodeId: null,
    selectedNodeId: null,
    selectedNodeChildren: [] ,
    result:false// Track which node is being edited
  },
  mutations: {
    SET_SELECTED_NODE(state, nodeObject) {
      state.selectedNodeId = nodeObject;
    //   console.log('state.data:', state.data); // Log state data
    // console.log('nodeObject.id:', nodeObject.id)
    if(!nodeObject){
      return
    }
  
    const node = findNodeById(state.data, nodeObject.id);
      console.log(node)
      if (node) {
        state.selectedNodeChildren = node.children?node.children:[];
      }
      console.log('state.selectedNodeChild',state.selectedNodeChildre)
    },

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
          // console.log("node click",node)
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
    ADD_CHILD(state, newChild) {

      const node = findNodeById(state.data, state.selectedNodeId.id);
      console.log(node)
      if (node) {
        if (!node.children) {
          node.children = [];  // Ensure 'children' exists
        }
        node.children.push(newChild); 

        if (node.id === state.selectedNodeId.id) {
          state.selectedNodeChildren = node.children;
        }

        console.log("state.selectedNodeChildren",state.selectedNodeChildren )
      }
    
    },
   // Vuex Store Mutation
   DELETE_CHILD(state, childId) {
    console.log("Deleting child with ID:", childId);

    const node = findNodeById(state.data, state.selectedNodeId.id);
    if (node) {
      const childNode = node.children.find(child => child.id === childId.id);

      if (childNode) {
        if (childNode.children && childNode.children.length > 0) {
          state.result = false; // Cannot delete if there are children
        } else {
          node.children = node.children.filter(child => child.id !== childId.id);
          state.selectedNodeChildren = state.selectedNodeChildren.filter(child => child.id !== childId.id);
          state.result = true; // Successful deletion
        }
      }
    }
  },

    SET_EDIT_FLAG(state,newId){
      updateNodeEditing(state.data, newId);
    },
    UPDATE_CHILD(state,updatedData){

      if (!state.selectedNodeId) return;
      updatedData.name = state.selectedNodeId.name;
    },
    LOAD_CHILDREN(state, nodeId) {
      // Find node by ID and mark its children as loaded
      const node = findNodeById(state.data, nodeId);
      if (node) {
        node.isLoaded = true;
      }
    }
  },
  actions: {
    selectNode({ commit }, nodeId) {
      commit('SET_SELECTED_NODE', nodeId);
    },

    startEditing({ commit }, nodeId) {
      commit("SET_EDITING_NODE", nodeId);
    },
    saveNodeEdit({ commit }, { nodeId, newName }) {
      commit("UPDATE_NODE_NAME", { nodeId, newName });
      commit("SET_EDITING_NODE", null); // Exit edit mode
    },
    addNode({ commit }, { nodeId, newName }) {
      commit("ADD_NODE_NAME", { nodeId, newName });
    },
    addChild({ commit }, child) {
      commit('ADD_CHILD', child);
      // this.$forceUpdate();
    },
    deleteChild({ commit }, childId) {
      commit('DELETE_CHILD', childId);
    },
    setEditFlag({ commit }, childId) {
      commit('SET_EDIT_FLAG', childId);
    },
    updateChild({ commit }, childId) {
      commit('UPDATE_CHILD', childId);
    },
    loadNodeChildren({ commit }, nodeId) {
      commit('LOAD_CHILDREN', nodeId);
    }
  },
  getters: {
    getTreeData: (state) => state.data,
    getEditingNodeId: (state) => state.editingNodeId,
  },

});