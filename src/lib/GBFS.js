// Define the heuristic function
function heuristic(state) {
    let conflicts = 0;
    for (let i = 0; i < state.length; i++) {
      for (let j = i + 1; j < state.length; j++) {
        if (state[i] === state[j] || Math.abs(state[i] - state[j]) === j - i || state[i] === -1 || state[j] === -1) {
          conflicts++;
        }
      }
    }
    return conflicts;
  }
  
  // Define the function to generate the initial state
  function generateInitialState(size) {
    const state = new Array(size);
    for (let i = 0; i < size; i++) {
      state[i] = i;
    }
    shuffle(state);
    return state;
  }
  
  // Define a helper function to shuffle an array in place
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Define the function to generate the successor states
  function generateSuccessors(state) {
    const successors = [];
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state.length; j++) {
        if (j !== state[i]) {
          const successor = [...state];
          successor[i] = j;
          successors.push(successor);
        }
      }
    }
    return successors;
  }
  
  // Define the function to check if a state is a goal state
  function isGoalState(state) {
    for (let i = 0; i < state.length; i++) {
      for (let j = i + 1; j < state.length; j++) {
        if (state[i] === state[j] || Math.abs(state[i] - state[j]) === j - i || state[i] === -1 || state[j] === -1) {
          return false;
        }
      }
    }
    return true;
  }
  
  // Define the Greedy Best-First Search algorithm
  export function gbfs(size) {
    const initial = Array(size).fill(-1);
    const queue = [{ state: initial, heuristic: heuristic(initial) }];
    const visited = new Set();

    while (queue.length > 0) {
      //queue.sort((a, b) => a.heuristic - b.heuristic);
      const { state } = queue.shift();
      visited.add(state);

      if (isGoalState(state)) {
        const arrVisited =  Array.from(visited)
        arrVisited.pop()
        arrVisited.shift()
        return { initial, visited:arrVisited, final:state};
      }
  
      const successors = generateSuccessors(state);
      

      //console.log(successors)
      for (const successor of successors) {
        if (visited.has(successor) && queue.includes(successor)) {
            // This state has already been visited, so skip it
            continue;
          }
        queue.push({ state: successor, heuristic: heuristic(successor) });
      }
      
    }
  
    // If we've exhausted the search space and haven't found a goal state, return null
    return { initial:[], visited:[], final:[]};
  }
  