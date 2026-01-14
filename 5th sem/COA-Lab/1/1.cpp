// WAP to perform unsigned binary addition

#include <iostream>
using namespace std;

int main() {
    int num1, num2, bit1, bit2, i = 0, j, carry = 0, sum[20];
    cout << "Enter the first binary number: ";
    cin >> num1;
    cout << "Enter the second binary number: ";
    cin >> num2;
    if(num1 ==0 && num2 == 0) {
        cout << "Addition is 0";
        return 0;
    }
    while (num1 != 0 || num2 != 0){
        bit1 = num1%10;
        bit2 = num2%10;
        sum[i++] = (bit1 + bit2 + carry) % 2;
        carry = (bit1 + bit2 + carry) / 2;
        num1 = num1 / 10;
        num2 = num2 / 10;
    }
    if (carry != 0) {
        sum[i++] = carry;
    }
    for (j = i - 1; j >= 0; j--) {
        cout << sum[j];
    }
    return 0;
}