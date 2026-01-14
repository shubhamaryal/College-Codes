/* 
    Write a program to calculate and display the cube of integer, float and 
    double number using function overloading (passing single argument to 
    function).
*/

#include <iostream>
using namespace std;

int cube(int x){
    return x * x * x;
}

float cube(float x){
    return x * x * x;
}

double cube(double x){
    return x * x * x;
}

int main() {
    int intValue;
    float floatValue;
    double doubleValue;

    cout<<"Enter an integer: ";
    cin>>intValue;
    cout<<"Cube of integer is: " << cube(intValue) << endl;

    cout << "Enter a float: ";
    cin >> floatValue;
    cout << "Cube of floats is: " << cube(floatValue) << endl;

    cout<<"Enter a double: ";
    cin>>doubleValue;
    cout<<"Cube of double is: " << cube(doubleValue) << endl;

    return 0;
}


/*

    #include <iostream>
    using namespace std;

    int cube(int x) {
        cout<< x * x * x;
    }

    float cube(float x) {
        cout<< x * x * x;
    }

    double cube(double x) {
        cout<< x * x * x;
    }

    int main() {
        cube(2);
        cube(3.1);
        cube(1.111111111);

        return 0;
    }

*/