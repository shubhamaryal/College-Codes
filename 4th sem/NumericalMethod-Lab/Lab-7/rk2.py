import numpy as np

def f_rk2(x, y):
    return (2 * x * y) / x

def rk2_method():
    print("--- RK-2 Method ---")
    x0 = float(input("Enter the initial condition of x: "))
    y0 = float(input("Enter the initial condition of y: "))
    h = float(input("Enter the stepsize: "))
    xn = float(input("Enter the point where functional value is required: "))

    n = int((xn - x0) / h)
    current_x = x0
    current_y = y0

    for i in range(n):
        m1 = f_rk2(current_x, current_y)
        m2 = f_rk2(current_x + h, current_y + m1 * h)
        m = (m1 + m2) / 2
        next_y = current_y + m * h
        next_x = current_x + h
        current_x = next_x
        current_y = next_y
    print(f"The functional value at {xn} is {current_y}")
    print("\n")

rk2_method()