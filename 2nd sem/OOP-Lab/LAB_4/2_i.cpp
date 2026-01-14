//wap to calculate perimeter of triangle, use default and parameterized constructor 

#include <iostream>
using namespace std;

class Triangle{
    float a,b,c;

    public:

    Triangle(float x,float y,float z){
        a=x;
        b=y;
        c=z;
    }

    float peri(){
        return a+b+c;
    }

};

int main(){
    Triangle t1(1,2,3);
    float result= t1.peri();
    cout<<"the perimeter is: "<<result;
    return 0;
} 