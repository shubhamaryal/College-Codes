import heapq

# 1. Define the graph structure (Neighbors and actual path edge costs)
graph = {
    'A': [('B', 4), ('C', 3)],
    'B': [('D', 5), ('E', 2)],
    'C': [('F', 6)],
    'D': [('G', 3)],
    'E': [('G', 7)],
    'F': [('G', 5)],
    'G': []  # Goal node has no outgoing edges
}

# 2. Define the heuristic values (h values inside each circle)
heuristics = {
    'A': 10,
    'B': 6,
    'C': 8,
    'D': 3,
    'E': 5,
    'F': 4,
    'G': 0
}

def best_first_search(start, goal):
    # OPEN list stores elements as: (heuristic, current_node, path_taken, total_actual_cost)
    open_list = [(heuristics[start], start, [start], 0)]

    # CLOSED list to keep track of visited nodes
    closed_list = []

    print("Execution Trace:")
    print("-" * 60)

    while open_list:
        # Display current lists nicely
        open_display = [f"{node}(h={h})" for h, node, _, _ in open_list]
        print(f"OPEN   : {open_display}")
        print(f"CLOSED : {closed_list}\n")

        # Pop the node with the lowest heuristic value
        h_val, current_node, path, current_cost = heapq.heappop(open_list)

        # Add to closed list
        closed_list.append(current_node)

        # Check if we reached the goal
        if current_node == goal:
            print("-" * 60)
            print("GOAL NODE REACHED!")
            return path, closed_list, current_cost

        # Expand neighbors
        for neighbor, edge_cost in graph[current_node]:
            if neighbor not in closed_list and neighbor not in [n[1] for n in open_list]:
                # Accumulate the actual edge weights along the path
                new_cost = current_cost + edge_cost

                # Push to priority queue sorted strictly by the neighbor's h value
                heapq.heappush(open_list, (heuristics[neighbor], neighbor, path + [neighbor], new_cost))

    return None, closed_list, 0

# Run the Best-First Search
actual_path, exploration_order, total_path_cost = best_first_search('A', 'G')

# 3. Print Final Summary Results
print(f"Exploration Order (CLOSED List) : {exploration_order}")
print(f"Winning Path taken to Goal      : {' -> '.join(actual_path)}")
print(f"Total Actual Path Cost          : {total_path_cost}")