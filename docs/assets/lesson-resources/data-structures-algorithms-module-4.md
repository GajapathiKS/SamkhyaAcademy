# Data Structures & Algorithms

## Module 4: Graphs and Dynamic Programming

Solve graph problems by matching the algorithm to the edge model.

### 4.1 Graph builder

Represent vertices and edges explicitly, including whether edges are directed or weighted. An adjacency list is efficient for many sparse graphs. Validate duplicate or missing vertex references and decide how self-loops are represented.

### 4.2 BFS and DFS simulation

BFS uses a queue and discovers vertices by edge distance in an unweighted graph. DFS explores depth first. Mark discovery consistently to avoid duplicate work in cycles, and represent disconnected vertices rather than silently ignoring them.

### 4.3 Shortest paths

BFS minimizes edge count only when that matches cost. Dijkstra’s algorithm requires nonnegative edge weights. State the assumptions before comparing results, and reconstruct a path from predecessor information instead of returning only a distance.

### 4.4 Dynamic programming patterns

Dynamic programming stores solutions to recurring subproblems. Define state, transition and base cases before implementation. The table dimensions come from the information needed for future decisions, not from the visual shape of the input.

## Worked lab

Edges: A-B, A-C, B-D, C-D, D-E
BFS from A: distances A=0, B=1, C=1, D=2, E=3
One route to E: A-B-D-E
Mark D discovered when queued so C does not queue D again.

With adjacency lists, traversing the reachable graph takes O(V+E) time and O(V) auxiliary space in the usual bound.

## Assignment

1. Run the graph simulation and record queue states.
   Your evidence: 

2. Add a disconnected vertex and explain its result.
   Your evidence: 

3. Change an edge weight and reconsider the shortest-path method.
   Your evidence: 

## Evidence to submit

Graph trace, path reconstruction and assumptions.

## Review

Does BFS always find the least-cost path in a weighted graph?

Your reasoning: 
