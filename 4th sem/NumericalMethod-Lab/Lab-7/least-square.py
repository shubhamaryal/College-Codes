import numpy as np
import matplotlib.pyplot as plt

def least_square_method():
    print("--- Least Square Method (Linear Regression) ---")
    sumx = 0
    sumy = 0
    sumxy = 0
    sumx2 = 0

    n = int(input("Enter the number of data: "))
    x = np.zeros(n)
    y = np.zeros(n)

    for i in range(n):
        x[i] = float(input(f"Enter data for x[{i+1}]: "))

    for i in range(n):
        y[i] = float(input(f"Enter data for y[{i+1}]: "))

    for i in range(n):
        sumx += x[i]
        sumy += y[i]
        sumxy += (x[i] * y[i])
        sumx2 += (x[i] * x[i])

    b = (n * sumxy - sumx * sumy) / (n * sumx2 - sumx * sumx)
    a = (sumy - b * sumx) / n

    print(f"The best fit equation is: y = {a:.4f} + {b:.4f}x")

    plt.scatter(x, y, color='blue', label='Original Data')
    
    y_fit = a + b * x
    plt.plot(x, y_fit, color='red', label='Best Fit Line')

    plt.xlabel('X')
    plt.ylabel('Y')
    plt.title('Linear Regression - Best Fit Line')
    plt.legend()
    plt.show()
    print("\n")

least_square_method()