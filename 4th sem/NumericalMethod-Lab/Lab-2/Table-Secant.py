# Lab 2 : Secant method and Newton's Raphson method 

# Algorithm: 
# 1. Start 
# 2. Define the function f(x)
# 3. Set the error tolerance to 0.0001 , Iteration = 1
# 4. Input two initial guesses from the user 
# 5. Enter a loop that repeats step 5 to step 7 until |x2 - x1| < error 
# 6. Compute x3 = (x1*f(x2) - x2*f(x1)) / (f(x2) - f(x1))
# 7. Update x1 = x2 and x2 = x3 , Iteration += 1
# 8. Print the root x3
# 9. End

def f(x):
    return (x*x*x - 5*x - 9)

Error = 0.0001

x1 = float(input("Enter the first guess: "))
x2 = float(input("Enter the second guess: "))

i = 0 

print (f'|Itn|  x1   |  x2   |  x3   |')

while abs(x2 - x1) > Error:
    x3 = (x1 * f(x2) - x2 * f(x1)) / (f(x2) - f(x1))
    print (f'| {i} | {x1:.3f} | {x2:.3f} | {x3:.3f} |')
    i += 1
    x1 = x2
    x2 = x3
    
print("The root is: ", x3) 
    
# Enter the first guess: 4
# Enter the second guess: 3
# |Itn|  x1   |  x2   |  x3   |
# | 0 | 4.000 | 3.000 | 2.906 |
# | 1 | 3.000 | 2.906 | 2.858 |
# | 2 | 2.906 | 2.858 | 2.855 |
# | 3 | 2.858 | 2.855 | 2.855 |
# The root is:  2.8551966303005005
