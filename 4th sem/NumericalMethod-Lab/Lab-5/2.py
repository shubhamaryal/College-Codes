# Lab-5 : Lagrenger's Interpolation & Least Square Method

# Least Square Method

# Algorithm:
# 1. Start
# 2. Input number of data points 'n'
# 3. Initialize sumx, sumy, sumxy, sumx2 to 0
# 4. Input all data points x[i] and their functional value y[i]
# 5. for i to n
#    sumx += x[i]
#    sumy += y[i]
#    sumxy += x[i] * y[i]
#    sumx2 += x[i] * x[i]
#    end for i
# 6. Compute 'a' and 'b' using:
#    a = (n * sumxy - sumx * sumy) / (n * sumx2 - sumx * sumx)
#    b = (sumy - a * sumx) / n
# 7. Print the result in the form of y = a + bx
# 8. Stop

# Question
# x : 1, 2, 3, 4, 5
# y : 3, 4, 5, 6, 8
# Find best fit in the form of y = a + bx



import numpy as np
sum=0
n = int(input("Enter the number of data points: "))
x = np.zeros(n)
y = np.zeros(n)

sumx = 0
sumy = 0
sumxy = 0
sumx2 = 0

print("Enter the data points:")
for i in range(n):
    x[i] = float(input(f"Enter x[{i}]: "))
for i in range(n):
    y[i] = float(input(f"Enter y[{i}]: "))

for i in range(n):
    sumx += x[i]
    sumy += y[i]
    sumxy += x[i] * y[i]
    sumx2 += x[i] * x[i]

a = (n * sumxy - sumx * sumy) / (n * sumx2 - sumx * sumx)
b = (sumy - a * sumx) / n
print(f"The equation of the line is: y = {a} + {b} * x")

# Enter the number of data points: 5
# Enter the data points:
# Enter x[0]: 1
# Enter x[1]: 2
# Enter x[2]: 3
# Enter x[3]: 4
# Enter x[4]: 5
# Enter y[0]: 3
# Enter y[1]: 4
# Enter y[2]: 5
# Enter y[3]: 6
# Enter y[4]: 8
# The equation of the line is: y = 1.2 + 1.6 * x