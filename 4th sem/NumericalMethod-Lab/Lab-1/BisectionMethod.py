# LAB 1 : Introduction to Python & Bisection Method

# Data Type

# name = "kec"
# age = 26
# price = 22.55

# print(type(name))  
# print(type(age))
# print(type(price))


# a = int(input("Enter a number: "))
# if a%2 == 0:
#     print("Even")
# else:
#     print("Odd")




# Loops 

# for i in range(1, 11, 2):
#     print(i)
    
# i = 1
# while i <= 10:
#     print(i)
#     i += 1





# Bisection Method

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
        
while abs(x2-x1) > Error:
    x0 = (x1 + x2) / 2
    if (f(x0) * f(x1) < 0):
        x2 = x0
    else:
        x1 = x0
        
print("The root is: ", x0)

# Roots 
# -2.114948272705078, 1.86077880859375, 0.25408935546875