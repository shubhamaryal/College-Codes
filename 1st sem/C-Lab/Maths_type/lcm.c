#include <stdio.h>

int main() {
    int num1, num2, max, lcm;

    printf("Enter two numbers: ");
    scanf("%d %d", &num1, &num2);

    if (num1 > num2)
        max = num1;
    else
        max = num2;

    while (1) {
        if (max % num1 == 0 && max % num2 == 0) { 
            lcm = max;
            break;
        }
        ++max;
    }

    printf("The LCM of %d and %d is %d\n", num1, num2, lcm);

    return 0;
}