# Lab 5: Find dominant eigen value and corresponding eigen vector using power method 

import numpy as np
eigenvalue = 0 
n = int(input("Enter the size of square matrix: "))
a = np.zeros((n, n))
x = np.zeros(n)
y = np.zeros(n)
print("Enter the elements of A: ")
for i in range(n):
    for j in range(n):
        a[i][j] = float(input("Enter elements: "))
print("Enter Eigen vector :")
for i in range(n):
    x[i] = float(input("Enter elements: "))
error = 0.001
while(True):
    for i in range(n):
        y[i] = 0
        for j in range(n):
            y[i] += a[i][j] * x[j]  
    emax = abs(y[0])
    for i in range(n):
        if(emax < y[i]):
            emax = y[i]
    for i in range(n):
        x[i] = y[i] / emax
    temp = abs(eigenvalue - emax)
    eigenvalue = emax
    if(temp < error):
            break
print("Eigen value is: ", emax)
print("Eigen vector is: ", x)

# Enter the size of square matrix: 3
# Enter the elements of A: 
# Enter elements: 5
# Enter elements: 2
# Enter elements: 3
# Enter elements: 2
# Enter elements: 4
# Enter elements: 2
# Enter elements: 3
# Enter elements: 2
# Enter elements: 5
# Enter Eigen vector :
# Enter elements: 1
# Enter elements: 0
# Enter elements: 1
# Eigen value is:  9.463917525773196
# Eigen vector is:  [1.         0.73202614 1.        ]