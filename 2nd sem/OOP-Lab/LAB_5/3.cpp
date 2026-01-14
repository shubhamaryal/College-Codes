// wap to add two objects of class height using friend function

#include <iostream>
using namespace std;

class Height{
    int ft, inch;

    public:

    void input(){
        cout<< "Enter the height (feet, inches) :";
        cin>>  ft>>inch;
    }

    friend void add(Height,Height);
};

void add(Height x, Height y){
    float a= x.ft + y.ft + (y.inch+x.inch)/12;
    float b = (x.inch+y.inch)%12;

    cout<<"The sum is: "<< a << "ft " << b<<"inch";
}

int main(){
    Height h1,h2;
    h1.input();
    h2.input();

    add(h1,h2);

    return 0;
}