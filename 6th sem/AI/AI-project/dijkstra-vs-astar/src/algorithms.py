"""
algorithms.py
--------------
Real-life-style pathfinding: Dijkstra's Algorithm vs A* Search.

Use case framed as: "GPS-style shortest route finder on a grid city map",
where some cells are blocked (buildings/traffic closures).

Both functions return:
    path            : list[(row, col)] from start to goal (empty if none found)
    nodes_expanded  : how many nodes were popped off the frontier (search effort)
    runtime_seconds : wall-clock time for the search
    visited_order   : list of nodes in the order they were expanded (for animation)
"""

import heapq
import time
import random


def make_grid(rows, cols, obstacle_prob=0.25, seed=None):
    """Create a grid maze. 0 = free cell, 1 = obstacle. Start/goal are kept free."""
    rng = random.Random(seed)
    grid = [[1 if rng.random() < obstacle_prob else 0 for _ in range(cols)] for _ in range(rows)]
    # keep a small clear pocket around start and goal so they're never sealed in
    for r, c in [(0, 0), (rows - 1, cols - 1)]:
        for dr, dc in ((0, 0), (0, 1), (1, 0), (0, -1), (-1, 0)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                grid[nr][nc] = 0
    return grid


def neighbors(grid, node):
    rows, cols = len(grid), len(grid[0])
    r, c = node
    for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
        nr, nc = r + dr, c + dc
        if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 0:
            yield (nr, nc)


def reconstruct_path(came_from, current):
    path = [current]
    while current in came_from:
        current = came_from[current]
        path.append(current)
    path.reverse()
    return path


def dijkstra(grid, start, goal):
    """Classic Dijkstra: explores purely by accumulated cost, no sense of direction."""
    t0 = time.perf_counter()
    frontier = [(0, start)]
    cost_so_far = {start: 0}
    came_from = {}
    visited_order = []
    nodes_expanded = 0

    while frontier:
        cost, current = heapq.heappop(frontier)
        if current in visited_order:
            continue
        nodes_expanded += 1
        visited_order.append(current)

        if current == goal:
            break

        for nxt in neighbors(grid, current):
            new_cost = cost_so_far[current] + 1
            if nxt not in cost_so_far or new_cost < cost_so_far[nxt]:
                cost_so_far[nxt] = new_cost
                came_from[nxt] = current
                heapq.heappush(frontier, (new_cost, nxt))

    runtime = time.perf_counter() - t0
    path = reconstruct_path(came_from, goal) if goal in came_from or goal == start else []
    return path, nodes_expanded, runtime, visited_order


def manhattan(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])


def a_star(grid, start, goal, heuristic=manhattan):
    """A*: like Dijkstra, but adds a heuristic that 'aims' the search at the goal."""
    t0 = time.perf_counter()
    frontier = [(0, start)]
    cost_so_far = {start: 0}
    came_from = {}
    visited_order = []
    nodes_expanded = 0
    visited_set = set()

    while frontier:
        _, current = heapq.heappop(frontier)
        if current in visited_set:
            continue
        visited_set.add(current)
        nodes_expanded += 1
        visited_order.append(current)

        if current == goal:
            break

        for nxt in neighbors(grid, current):
            new_cost = cost_so_far[current] + 1
            if nxt not in cost_so_far or new_cost < cost_so_far[nxt]:
                cost_so_far[nxt] = new_cost
                priority = new_cost + heuristic(nxt, goal)
                heapq.heappush(frontier, (priority, nxt))
                came_from[nxt] = current

    runtime = time.perf_counter() - t0
    path = reconstruct_path(came_from, goal) if goal in came_from or goal == start else []
    return path, nodes_expanded, runtime, visited_order


def make_solvable_grid(rows, cols, obstacle_prob=0.25, seed=None, max_tries=200):
    """Keep generating random mazes until one actually has a path start->goal."""
    rng_seed = seed if seed is not None else random.randint(0, 10_000)
    start, goal = (0, 0), (rows - 1, cols - 1)
    for attempt in range(max_tries):
        grid = make_grid(rows, cols, obstacle_prob, seed=rng_seed + attempt)
        path, _, _, _ = dijkstra(grid, start, goal)
        if path:
            return grid
    raise RuntimeError("Could not generate a solvable maze; lower obstacle_prob.")


if __name__ == "__main__":
    grid = make_solvable_grid(15, 15, obstacle_prob=0.25, seed=7)
    start, goal = (0, 0), (14, 14)

    d_path, d_nodes, d_time, _ = dijkstra(grid, start, goal)
    a_path, a_nodes, a_time, _ = a_star(grid, start, goal)

    print(f"Dijkstra -> nodes expanded: {d_nodes}, path length: {len(d_path)}, time: {d_time*1000:.3f} ms")
    print(f"A*       -> nodes expanded: {a_nodes}, path length: {len(a_path)}, time: {a_time*1000:.3f} ms")
