/*
    WAP to perform sum and product of two integer and two floating point data using class templete
*/

#include <iostream>
using namespace std;

template <class T>
class Example{
    T a,b;

    public:
    void input(){
        cin>> a>>b;
    }

    T sum(){
        return a+b;
    }

    T product(){
        return a*b;
    }

};

int main(){
    Example<int> e1;

    cout<<"Enter two numbers(integer): "<<endl;
    e1.input();
    cout<<"The sum of two number(integer) is: "<<e1.sum()<<endl;
    cout<<"The sum of two number(integer) is: "<<e1.product()<<endl;

    Example<float> e2;

    cout<<"Enter two numbers(float): "<<endl;
    e2.input();
    cout<<"The sum of two number(float) is: "<<e2.sum()<<endl;
    cout<<"The sum of two number(float) is: "<<e2.product()<<endl;

    return 0;
}