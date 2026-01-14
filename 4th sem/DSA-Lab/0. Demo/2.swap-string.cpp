#include <iostream>
#include <string.h>
using namespace std;

int main() {
    string a;
    cout << "enter:" << endl;
    cin >> a;
    int n;
    n = a.length();

    for (int i = 0; i < (n / 2); i++) {
        swap(a[i], a[n - i - 1]);
    }
    
    cout << a;

    return 0;
}

int swap(char *x, char *y) {
    char temp = *x;
    *x = *y;
    *y = temp;
}