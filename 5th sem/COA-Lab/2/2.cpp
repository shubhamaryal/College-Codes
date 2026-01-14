// Subtraction of two unsigned binary numbers

#include <iostream>
using namespace std;

// Function to compare if a >= b for unsigned binary numbers
bool isGreater(int a[], int b[], int n) {
    for (int i = 0; i < n; i++) {
        if (a[i] > b[i]) return true;
        if (a[i] < b[i]) return false;
    }
}

// Function to print a binary array
void printBinary(int res[], int n) {
    for (int i = 0; i < n; i++) {
        cout << res[i];
    }
    cout << endl;
}

void subtractUnsigned(int n, int a[], int b[]) {
    // Check if both numbers are zero
    bool isZeroA = true, isZeroB = true;

    for (int i = 0; i < n; i++) {
        if (a[i] != 0) isZeroA = false;
        if (b[i] != 0) isZeroB = false;
    }

    if (isZeroA && isZeroB) {
        cout << "Result (a - b) in binary: ";
        for (int i = 0; i < n; i++) cout << "0";
        cout << endl;
        return;
    }

    if (!isGreater(a, b, n)) {
        cout << "Error: Cannot subtract a larger number from a smaller one in unsigned binary." << endl;
        return;
    }

    // Copy and compute 2's complement of b
    int bComp[32];

    for (int i = 0; i < n; i++) {
        bComp[i] = 1 - b[i]; // 1's complement
    }

    // Add 1 to 1's complement
    for (int i = n - 1; i >= 0; i--) {
        if (bComp[i] == 0) {
            bComp[i] = 1;
            break;
        } else {
            bComp[i] = 0;
        }
    }

    // Add a + bComp
    int result[32], carry = 0;

    for (int i = n - 1; i >= 0; i--) {
        int sum = a[i] + bComp[i] + carry;
        result[i] = sum % 2;
        carry = sum / 2;
    }

    cout << "Result (a - b) in binary: ";
    printBinary(result, n);
}

int main() {
    int n;

    cout << "Enter the number of bits: ";
    cin >> n;

    int a[32], b[32];

    cout << "Enter the first binary number (minuend) bit by bit (space separated):\n";

    for (int i = 0; i < n; i++) {
        cin >> a[i];
        if (a[i] != 0 && a[i] != 1) {
            cout << "Invalid bit. Only 0 or 1 allowed." << endl;
            return 1;
        }
    }

    cout << "Enter the second binary number (subtrahend) bit by bit (space separated):\n";

    for (int i = 0; i < n; i++) {
        cin >> b[i];
        if (b[i] != 0 && b[i] != 1) {
            cout << "Invalid bit. Only 0 or 1 allowed." << endl;
            return 1;
        }
    }

    subtractUnsigned(n, a, b);

    return 0;
}