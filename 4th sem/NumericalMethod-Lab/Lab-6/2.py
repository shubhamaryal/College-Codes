# Simpson's 3/8 Rule

# Algorithm:
# 1. Start
# 2. Define function f(x)
# 3. Input the lower limit a and upper limit b 
# 4. Input the number of interval n, initialize sum=0
# 5. Compute h = (b - a) / n
# 6. For i=1 to n-1 do upto step 8
# 7. k = a + i * h
# 8. If i % 3 == 0 
        # sum = sum + 2 * f(k)
    # else
        # sum = sum + 3 * f(k)
# 9. Integration = (sum + f(a) + f(b)) * ((3*h)/8)
# 10. Print Integration
# 11. Stop

import numpy as np
def f(x):
    return 1/(1 + x**2)
a = float(input("Enter the lower limit a: "))
b = float(input("Enter the upper limit b: "))
n = int(input("Enter the number of intervals n: "))
sum = 0 
h = (b - a) / n
for i in range(1, n):
    k = a + i * h
    if i % 3 == 0:
        sum += 2 * f(k)
    else:
        sum += 3 * f(k)
integration = (sum + f(a) + f(b)) * ((3 * h) / 8)
print("The value of the integral is", integration)

# Enter the lower limit a: 0
# Enter the upper limit b: 6
# Enter the number of intervals n: 6
# The value of the integral is 1.3570808364926013