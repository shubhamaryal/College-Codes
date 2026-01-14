// FRIEND FUNCTION AND CLASS

// wap to create class called Rational with data members nume and deno. Using friend function find the greater between two rational member.

#include <iostream>
using namespace std;

class Rational{
    int nume;
    int deno;

    public:
    void input(){
        cout<<"Enter the rational numbers (numerator, denominator)"<<endl;
        cin>> nume>>deno;
    }

    friend void ggreater(Rational, Rational);
};

void ggreater(Rational a, Rational b){
    if (b.deno==a.deno){
        if (a.nume>b.nume){
            cout<< "Greater is:"<<a.nume<<"/"<<a.deno;
        }
        else{
            cout<< "Greater is:"<<b.nume<<"/"<<b.deno;
        }
    }
    else{
        if ((a.nume * b.deno)>(b.nume *a.deno)){
            cout<< "Greater is:"<<a.nume<<"/"<<a.deno;
        }
        else{
            cout<< "Greater is:"<<b.nume<<"/"<<b.deno;
        }
    }
}

int main(){
    Rational r1,r2;

    r1.input();
    r2.input();
    ggreater(r1,r2);

    return 0;
}