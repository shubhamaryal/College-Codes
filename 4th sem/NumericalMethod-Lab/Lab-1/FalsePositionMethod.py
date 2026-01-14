# False Position Method

def f(x):
    return (x*x*x - 4*x + 1)

Error = 0.0001

while True:
    x1 = float(input("Enter the first guess: "))
    x2 = float(input("Enter the second guess: "))
    if f(x1) * f(x2) < 0:
        break
    else:
        print("Enter new guesses")
        
while (x2-x1) > Error:
    x0 = (x1 * f(x2) - x2 * f(x1)) / (f(x2) - f(x1))
    if (f(x0) * f(x1) < 0):
        x2 = x0
    else:
        x1 = x0
        
print("The root is: ", x0)

# Roots
# 0.2541016883650524, 


# lab report 
# algorithm, pseudocode, source code, output, conclusion