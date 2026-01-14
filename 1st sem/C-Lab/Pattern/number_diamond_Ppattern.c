#include <stdio.h>

int main() {
    int rows = 5; // Number of rows in the pattern

    for (int i = 0; i < rows; i++) {
        // Print spaces
        for (int j = 0; j < i; j++) {
            printf("  ");
        }

        // Print numbers in ascending order
        for (int j = 1; j <= rows - i; j++) {
            printf("%d ", j);
        }

        // Print numbers in descending order
        for (int j = rows - i - 1; j >= 1; j--) {
            printf("%d ", j);
        }

        printf("\n");
    }

    return 0;
}

