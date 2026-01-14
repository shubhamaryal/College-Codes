#include <stdio.h>

int main() {
    int num1, num2, min, hcf;

    printf("Enter two numbers: ");
    scanf("%d %d", &num1, &num2);

    if (num1 > num2)
        min = num2;
    else
        min = num1;

    while (1) {
        if (num1 % min == 0 && num2 % min == 0) {
            hcf = min;
            break;
        }
        --min;
    }

    printf("The HCF of %d and %d is %d\n", num1, num2, hcf);

    return 0;
}