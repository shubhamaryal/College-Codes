// Implementation of tower of hanoi using recursion 

#include <iostream>
using namespace std;
void TOH(int n, char source, char auxiliary, char destination) {
    if (n == 1) {
        cout << "Move disk 1 from " << source << " to " << destination << endl;
        return;
    }
    TOH(n - 1, source, destination, auxiliary);
    cout << "Move disk " << n << " from " << source << " to " << destination << endl;
    TOH(n - 1, auxiliary, source, destination);
}
int main() {
    TOH(4, 'A', 'B', 'C'); 
    return 0;
}

// Move disk 1 from A to C
// Move disk 2 from A to B
// Move disk 1 from C to B
// Move disk 3 from A to C
// Move disk 1 from B to A
// Move disk 2 from B to C
// Move disk 1 from A to C