//wap to calculate perimeter of triangle, use default and parameterized constructor 

#include <iostream>
using namespace std;

class Triangle{
    float a,b,c;

    public:
    
    Triangle(){
        a=2;
        b=3;
        c=4; 
    }

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
    Triangle t1(1,2,3),t2;
    float result= t1.peri();
    float result2=t2.peri();
    cout<<"the perimeter is: "<<result<<endl;
    cout<<"the perimeter is: "<<result2;

    return 0;
}