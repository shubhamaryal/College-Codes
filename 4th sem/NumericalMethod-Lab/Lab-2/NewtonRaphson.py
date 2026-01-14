# Newton Raphson method 

# Algorithm: 
# 1. Start 
# 2. Define the function f(x) and its derivative g(x)
# 3. Set the error tolerance to 0.0001 
# 4. Input the initial guess x1
# 5. Ensure g(x1) =! 0 if not true go to step 4 again and input new initial guess
# 6. Compute x2 = x1 - f(x1) / g(x1)
# 7. Calculate temp |x2-x1|
# 8. Update x1 = x2 
# 9. Check if temp > error. If true go to step 6 or goto step 10
# 10. Print the root value x2

def f(x):
    return (x*x*x - 5*x - 9)

def g(x):
    return (3*x*x - 5)

Error = 0.0001

x1 = float(input("Enter the initial guess: "))

while g(x1) == 0:
    print("g(x1) cannot be zero. Please enter a new initial guess.")
    x1 = float(input("Enter the initial guess: "))
    
x2 = x1 - f(x1) / g(x1)
temp = abs(x2 - x1)

while temp > Error:
    x1 = x2
    x2 = x1 - f(x1) / g(x1)
    temp = abs(x2 - x1)
    
print("The root is: ", x2)

# Enter the initial guess: 4
# The root is:  2.8551965393207226

# ----------------------------------------------------------------------------------

# Other method

# def f(x):
#     return (x*x*x - 5*x - 9)
    
# def g(x):
#     return (3*x*x - 5)
    
# error = 0.0001

# while(True):
#     x1 = float(input("Enter the initial guess: "))
#     if (g(x1)!=0):
#         break 
#     else:
#         print("g(x1) can't be zero")

# while(True):
#     x2 = x1 - f(x1)/g(x1)
#     temp = abs(x2-x1)
#     x1=x2
#     if(temp<error):
#         break

# print("The root is: ", x2)