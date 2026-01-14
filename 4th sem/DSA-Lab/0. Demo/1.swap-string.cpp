#include <iostream>
#include <string.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    int length;
    length = s.length();
    for (int i = 0; i < length / 2; i++) {
        char temp = s[i];
        s[i] = s[length - i - 1];
        s[length - i - 1] = temp;
        // normal method use gareko vye 10 iteration lagthiyo, but yo method ma 5 iteration matra lagxa
    }
    cout << s;
    return 0;
}