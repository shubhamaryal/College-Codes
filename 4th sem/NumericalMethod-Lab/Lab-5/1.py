# Lab-5 : Lagrenger's Interpolation & Least Square Method

# Lagrenger's Interpolation

# Algorithm: 
# 1. Start
# 2. Initialize sum=0 and input the number of data 'n'
# 3. Input data in array x[i] and y[i]
# 4. Input xf where y is required
# 5. For i in range(n) do step 6 to 10
# 6. mul=1
# 7. For j in range(n) do step 8 to 9
# 8. If (i!=j) do step 9
# 9. mul=mul*(xf-x[j])/(x[i]-x[j])
# 10. sum += mul*y[i]
# 11. Display sum
# 12. Stop

# Question 
# x : 1, 2, 3, 4
# y : 1, 1.414, 1.732, 2
# y(2.5) = ?

import numpy as np
sum=0
n = int(input("Enter the number of data points: "))
x = np.zeros(n)
y = np.zeros(n)

print("Enter the data points:")
for i in range(n):
    x[i] = float(input(f"Enter x[{i}]: "))
for i in range(n):
    y[i] = float(input(f"Enter y[{i}]: "))

xf = float(input("Enter the value of x where y is required: "))
for i in range(n):
    mul=1
    for j in range(n):
        if i != j:
            mul *= (xf - x[j]) / (x[i] - x[j])
    sum += mul * y[i]
print("The value of y at x =", xf, "is", sum)

# Enter the number of data points: 4
# Enter the data points:
# Enter x[0]: 1
# Enter x[1]: 2
# Enter x[2]: 3
# Enter x[3]: 4
# Enter y[0]: 1
# Enter y[1]: 1.414
# Enter y[2]: 1.732
# Enter y[3]: 2
# Enter the value of x where y is required: 2.5
# The value of y at x = 2.5 is 1.582125
