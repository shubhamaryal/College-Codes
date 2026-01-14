# Lab 2 : Secant method and Newton's Raphson method 

# Algorithm: 
# 1. Start 
# 2. Define the function f(x)
# 3. Set the error tolerance to 0.0001
# 4. Input two initial guesses from the user 
# 5. Enter a loop that repeats step 5 to step 7 until |x2 - x1| < error 
# 6. Compute x3 = (x1*f(x2) - x2*f(x1)) / (f(x2) - f(x1))
# 7. Update x1 = x2 and x2 = x3
# 8. Print the root x3
# 9. End

def f(x):
    return (x*x*x - 5*x - 9)

Error = 0.0001

x1 = float(input("Enter the first guess: "))
x2 = float(input("Enter the second guess: "))

while abs(x2 - x1) > Error:
    x3 = (x1 * f(x2) - x2 * f(x1)) / (f(x2) - f(x1))
    x1 = x2
    x2 = x3
    
print("The root is: ", x3) 
    
# Enter the first guess: 3
# Enter the second guess: 4
# The root is:  2.8551965398968973
