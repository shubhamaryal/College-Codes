/*
    wap to find the sum of two complex numbers, a function call by one object passing the second object as a function argument,
    and returns the third object adding two objects.
*/
    
#include <iostream>
using namespace std;

class Complex{
    int real,img;

    public:
    void input(){
        cout<<"Enter the complex numbers(real, img): "<<endl;
        cin>> real>>img;
    }

    Complex sum(Complex a){
        Complex res;
        res.real=real+a.real;
        res.img=img+a.img;
        return res;
    }

    void display(){
        cout<<"The sum of two complex numbers is: "<<real<<"+i"<<img<<endl;
    }
};

int main(){
    Complex c1,c2,c3;
    c1.input();
    c2.input();

    c3= c1.sum(c2);

    c3.display();

    return 0;
}