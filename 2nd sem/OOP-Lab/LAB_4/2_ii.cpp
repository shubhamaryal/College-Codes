//wap to calculate perimeter of triangle, use default and parameterized constructor 

#include <iostream>
using namespace std;

class Triangle{
    float a,b,c;

    public:
    
    Triangle(){
        a=1;
        b=2;
        c=3;
    }

    float peri(){
        return a+b+c;
    }

};

int main(){
    Triangle t1;
    float result= t1.peri();
    cout<<"the perimeter is: "<<result;

    return 0;
}