#include <stdio.h>

int main() {
    int i, j, k, n;
    printf("Enter the number of rows you want: ");
    scanf("%d", &n);
    for (i = 0; i < n; i++) {
        // Print spaces before stars
        for (j = 0; j < n - i - 1; j++) {
            printf(" ");
        }
        // Print stars
        for (k = 0; k < (i * 2) + 1; k++) {
            printf("*");
        }
        printf("\n");
    }
    return 0;
}
