/*
    wap to find the sum of two complex numbers by passing an object as an argument.
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

    void sum(Complex c){
        Complex res;
        res.real=c.real+real;
        res.img=c.img+img;
        res.display();
    }

    void display(){
        cout<<"The sum of two complex numbers is: "<<real<<"+i"<<img<<endl;
    }

};

int main(){
    Complex c1,c2;

    c1.input();
    c2.input();

    c1.sum(c2);

    return 0;
}