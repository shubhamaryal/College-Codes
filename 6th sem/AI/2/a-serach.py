import heapq

# 1. Define the graph representation
# The graph is represented as a dictionary of dictionaries: {parent: {child: edge_cost}}
graph = {
    'S': {'A': 1, 'B': 4},
    'A': {'B': 2, 'C': 5, 'D': 12},
    'B': {'C': 2},
    'C': {'D': 3},
    'D': {}
}

# 2. Define the heuristic values table h(n)
heuristic = {
    'S': 7,
    'A': 6,
    'B': 2,
    'C': 1,
    'D': 0
}

def a_star_search(graph, heuristics, start, goal):
    # The open list stores tuples of: (f_score, current_node, g_score, path_taken)
    # Using a priority queue (heapq) ensures we always pop the node with the lowest f_score
    open_list = []
    heapq.heappush(open_list, (heuristics[start], start, 0, [start]))

    # The closed list tracks the best g_score (actual cost) found for each node so far
    closed_list = {}

    iteration = 0
    print(f"--- Starting A* Search from {start} to {goal} ---\n")

    while open_list:
        # Step 2: Select Node with lowest f(n)
        f_score, current_node, g_score, path = heapq.heappop(open_list)
        iteration += 1

        print(f"Iteration {iteration}:")
        print(f"  Selected Node: '{current_node}' with f(n) = {f_score} (g={g_score}, h={heuristics[current_node]})")
        print(f"  Current Path: {' -> '.join(path)}")

        # Step 3: Goal Test
        if current_node == goal:
            print(f"\n[SUCCESS] Goal node '{goal}' reached!")
            return path, g_score

        # If we have already found a cheaper path to this node in an earlier expansion, skip it
        if current_node in closed_list and closed_list[current_node] <= g_score:
            print(f"  * Skipping '{current_node}' (already explored with equal or lower cost) *\n")
            continue

        # Add/update the node in the closed list with its best g_score
        closed_list[current_node] = g_score

        # Step 4: Expand Node
        print("  Expanding neighbors:")
        for neighbor, edge_cost in graph[current_node].items():
            new_g = g_score + edge_cost
            new_f = new_g + heuristics[neighbor]

            # Step 4.b.i & ii: Check if we found a better path
            if neighbor in closed_list and closed_list[neighbor] <= new_g:
                print(f"    - Neighbor '{neighbor}': Skipped (already has a cheaper/equal path)")
                continue

            print(f"    - Neighbor '{neighbor}': Added/Updated in Open List -> g={new_g}, h={heuristics[neighbor]}, f={new_f}")
            heapq.heappush(open_list, (new_f, neighbor, new_g, path + [neighbor]))

        print("-" * 50)

    print("\n[FAILURE] Goal node could not be reached.")
    return None, float('inf')

# Run the algorithm
optimal_path, total_cost = a_star_search(graph, heuristic, start='S', goal='D')

# Output final results
print("\n" + "="*40)
print("FINAL RESULT")
print("="*40)
print(f"Optimal Path found : {' -> '.join(optimal_path)}")
print(f"Total Path Cost (g): {total_cost}")
print("="*40)