from collections import deque

# Graph representation using adjacency list
graph = {
    'S': ['A', 'B'],
    'A': ['C', 'D'],
    'B': ['G', 'H'],
    'C': ['E', 'F'],
    'D': [],
    'G': ['I'],
    'H': [],
    'E': ['K'],
    'F': [],
    'I': [],
    'K': []
}

def bfs(graph, start):
    visited = set()
    queue = deque([(start, 0)])  # (node, level)

    visited.add(start)
    bfs_order = []
    levels = {}

    while queue:
        node, level = queue.popleft()

        bfs_order.append(node)

        # Store nodes according to their levels
        if level not in levels:
            levels[level] = []
        levels[level].append(node)

        # Visit adjacent nodes
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, level + 1))

    return bfs_order, levels


# Run BFS starting from S
order, levels = bfs(graph, 'S')

# Display BFS Traversal
print("BFS Traversal:")
print(" → ".join(order))

print("\nNodes at each level:")
for level in levels:
    print(f"Level {level}: {levels[level]}")