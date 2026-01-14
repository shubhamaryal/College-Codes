#include <stdio.h>

// Function prototype
int sum(int number);

int main() 
{
    int number,result;
    printf("Enter numbers to sum (negative number to stop): \n");
    
    // Start the first input and recursive summation
    scanf("%d", &number);
    
    result = sum(number); // Start the recursive summation

    printf("The sum is: %d\n", result);

    return 0;
}

// Recursive function to sum numbers
int sum(int number) 
{
    if (number < 0) 
    {
        return 0; // Base case: if the number is negative, stop the recursion
    } 
    else 
    {
        int next_number;
        scanf("%d", &next_number);
        return number + sum(next_number); // Recursive case: add the number to the result of the next call
    }
}