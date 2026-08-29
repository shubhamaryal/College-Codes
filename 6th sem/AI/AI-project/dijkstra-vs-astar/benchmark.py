"""
benchmark.py
------------
Runs Dijkstra vs A* across increasingly large grid "cities" and measures:
  - nodes expanded (search effort / memory footprint proxy)
  - wall-clock runtime
  - path length (to confirm both find the SAME optimal route)

Produces:
  results.csv          raw numbers
  benchmark_chart.png  bar chart for the slide deck
"""

import csv
import statistics as stats

from algorithms import make_solvable_grid, dijkstra, a_star

SIZES = [10, 20, 30, 40, 50, 60]
TRIALS_PER_SIZE = 8
OBSTACLE_PROB = 0.22


def run_benchmark():
    rows = []
    for size in SIZES:
        d_nodes_list, a_nodes_list = [], []
        d_time_list, a_time_list = [], []
        for trial in range(TRIALS_PER_SIZE):
            seed = size * 1000 + trial
            grid = make_solvable_grid(size, size, OBSTACLE_PROB, seed=seed)
            start, goal = (0, 0), (size - 1, size - 1)

            d_path, d_nodes, d_time, _ = dijkstra(grid, start, goal)
            a_path, a_nodes, a_time, _ = a_star(grid, start, goal)

            # sanity check: both must find equally-short optimal paths
            assert len(d_path) == len(a_path), "Paths differ in length -- bug!"

            d_nodes_list.append(d_nodes)
            a_nodes_list.append(a_nodes)
            d_time_list.append(d_time)
            a_time_list.append(a_time)

        row = {
            "grid_size": f"{size}x{size}",
            "dijkstra_nodes_avg": round(stats.mean(d_nodes_list), 1),
            "astar_nodes_avg": round(stats.mean(a_nodes_list), 1),
            "reduction_pct": round(
                100 * (1 - stats.mean(a_nodes_list) / stats.mean(d_nodes_list)), 1
            ),
            "dijkstra_time_ms_avg": round(stats.mean(d_time_list) * 1000, 3),
            "astar_time_ms_avg": round(stats.mean(a_time_list) * 1000, 3),
        }
        rows.append(row)
        print(row)

    with open("results.csv", "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)

    return rows


def plot_results(rows):
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt

    sizes = [r["grid_size"] for r in rows]
    d_nodes = [r["dijkstra_nodes_avg"] for r in rows]
    a_nodes = [r["astar_nodes_avg"] for r in rows]

    fig, ax = plt.subplots(figsize=(9, 5.2), dpi=150)
    x = range(len(sizes))
    width = 0.36

    bars1 = ax.bar([i - width / 2 for i in x], d_nodes, width,
                   label="Dijkstra", color="#4C6EF5")
    bars2 = ax.bar([i + width / 2 for i in x], a_nodes, width,
                   label="A*", color="#F76707")

    ax.set_xticks(list(x))
    ax.set_xticklabels(sizes)
    ax.set_ylabel("Avg. nodes expanded (lower = more efficient)")
    ax.set_xlabel("Grid size")
    ax.set_title("Search Effort: Dijkstra vs A*  (same optimal path found by both)")
    ax.legend(frameon=False)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)

    for bars in (bars1, bars2):
        ax.bar_label(bars, fmt="%.0f", padding=2, fontsize=8)

    fig.tight_layout()
    fig.savefig("benchmark_chart.png", transparent=False)
    print("Saved benchmark_chart.png")

    # second chart: runtime, log scale (differences get dramatic at larger sizes)
    d_time = [r["dijkstra_time_ms_avg"] for r in rows]
    a_time = [r["astar_time_ms_avg"] for r in rows]

    fig2, ax2 = plt.subplots(figsize=(9, 5.2), dpi=150)
    ax2.plot(sizes, d_time, marker="o", linewidth=2.5, color="#4C6EF5", label="Dijkstra")
    ax2.plot(sizes, a_time, marker="o", linewidth=2.5, color="#F76707", label="A*")
    ax2.set_yscale("log")
    ax2.set_ylabel("Avg. runtime, ms (log scale)")
    ax2.set_xlabel("Grid size")
    ax2.set_title("Runtime: Dijkstra vs A* as the map grows")
    ax2.legend(frameon=False)
    ax2.spines["top"].set_visible(False)
    ax2.spines["right"].set_visible(False)
    ax2.grid(axis="y", linestyle="--", alpha=0.4)

    fig2.tight_layout()
    fig2.savefig("runtime_chart.png", transparent=False)
    print("Saved runtime_chart.png")


if __name__ == "__main__":
    rows = run_benchmark()
    plot_results(rows)
