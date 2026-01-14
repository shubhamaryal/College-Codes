import numpy as np
import matplotlib.pyplot as plt

def f_rk4(x, y):
    return ((2 * x * y) / x)

def rk4_method():
    print("--- RK-4 Method ---")
    x0 = float(input("Enter the initial condition of x: "))
    y0 = float(input("Enter the initial condition of y: "))
    h = float(input("Enter the stepsize: "))
    xn = float(input("Enter the point where functional value is required: "))

    n = int((xn - x0) / h)
    current_x = x0
    current_y = y0

    plot_x = [x0]
    plot_y = [y0]

    for i in range(n):
        m1 = f_rk4(current_x, current_y)
        m2 = f_rk4(current_x + h / 2, current_y + m1 * h / 2)
        m3 = f_rk4(current_x + h / 2, current_y + m2 * h / 2)
        m4 = f_rk4(current_x + h, current_y + m3 * h)
        m = (m1 + 2 * m2 + 2 * m3 + m4) / 6
        next_y = current_y + m * h
        next_x = current_x + h
        current_x = next_x
        current_y = next_y
        plot_x.append(current_x)
        plot_y.append(current_y)

    plt.plot(plot_x, plot_y, 'rD')
    print(f"The functional value at {xn} is {current_y}")
    plt.title("RK-4 method")
    plt.xlabel("X-Axis")
    plt.ylabel("Y-Axis")
    plt.show()
    print("\n")

rk4_method()