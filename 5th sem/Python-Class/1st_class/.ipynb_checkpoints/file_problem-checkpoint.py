# Write
with open("output.txt", "w") as f:
    f.write("Hello from python\n")
    f.write("Line 2")
    
#Read
with open("output.txt", "r") as f:
    lines = f.readlines()
    
for line in lines:
    print(line.strip())