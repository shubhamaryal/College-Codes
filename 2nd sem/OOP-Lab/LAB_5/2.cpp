// wap to add private data of three diff classes using the friend function

#include <iostream>
using namespace std;

class A;
class B;
class C;

class A{
    float one; 

    public:
    friend void add(A,B,C);
};

class B{
    float two; 

    public:
    friend void add(A,B,C);
};

class C{
    float three; 

    public:
    friend void add(A,B,C);
};

void add(A x,B y,C z){
    cout << "enter the numbers: "<<endl;
    cin >> x.one>>y.two>>z.three;
    cout << "The sum is: "<< x.one+y.two+z.three;
}

int main(){
    class A a;
    class B b;
    class C c;

    add (a,b,c);

    return 0;
}