/*
    wap to find the sum of two complex number by passing two objects as arguments where the function call is done by third object.
*/

#include <iostream>
using namespace std;

class Complex{
    private:
    int real,img;

    public:
    void input(){
        cout<<"Enter the real and imaginary numbers: "<<endl;
        cin>>real>>img;
    }

    void sum(Complex a,Complex b){
        Complex res;
        res.img=a.img+b.img;
        res.real=a.real+b.real;
        res.display();
    }

    void display(){
        cout<<"The sum of 2 complex numbers are: "<<real<<"+i"<<img;
    }
};

int main(){
    Complex c1,c2,c3;

    c1.input();
    c2.input();

    c3.sum(c1,c2);

    return 0;
}