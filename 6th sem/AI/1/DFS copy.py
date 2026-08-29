# Graph representation using adjacency list
graph = {
    'S': ['A', 'B'],
    'A': ['C', 'D'],
    'B': ['E'],
    'C': ['F'],
    'D': [],
    'E': ['G'],
    'F': [],
    'G': ['H'],
    'H': []
}

def dfs(graph, start):
    visited = set()
    stack = [(start, 0)]  # (node, level)

    dfs_order = []
    levels = {}

    while stack:
        node, level = stack.pop()

        if node not in visited:
            visited.add(node)
            dfs_order.append(node)

            # Store nodes according to levels
            if level not in levels:
                levels[level] = []
            levels[level].append(node)

            # Add neighbors in reverse order to maintain left-to-right traversal
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    stack.append((neighbor, level + 1))

    return dfs_order, levels


# Run DFS starting from S
order, levels = dfs(graph, 'S')

# Display DFS Traversal
print("DFS Traversal:")
print(" → ".join(order))

print("\nNodes at each level:")
for level in levels:
    print(f"Level {level}: {levels[level]}")