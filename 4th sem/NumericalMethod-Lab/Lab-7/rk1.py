import numpy as np

def f_rk1(x, y):
    return ((2 * y) / x)

def rk1_method():
    print("--- RK-1 Method ---")
    x0 = float(input("Enter the initial condition of x: "))
    y0 = float(input("Enter the initial condition of y: "))
    h = float(input("Enter the stepsize: "))
    xn = float(input("Enter the point where functional value is required: "))

    n = int((xn - x0) / h)
    current_x = x0
    current_y = y0

    for i in range(n):
        m = f_rk1(current_x, current_y)
        next_y = current_y + m * h
        next_x = current_x + h
        current_y = next_y
        current_x = next_x
    print(f"The functional value at {current_x} is {current_y}")
    print("\n")

rk1_method()