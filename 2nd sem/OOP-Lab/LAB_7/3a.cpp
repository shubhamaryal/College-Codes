/* 
    wap to convert rectangle cordinate to polar cordinate by using
        a, conversion routine in source class                           
        b, conversion routine in destination class

        Hint: radius = root(x^2+y^2)
            : angle = tan inverse (y/x) --------> atan()  [cmath]
*/

#include <iostream>
#include <cmath>
using namespace std;

class Polar{
    float r,a;

public:
    void setR(float rad){
        r=rad;
    }
    void setA(float ang){
        a=ang;
    }

    void display(){
        cout<< "the converted coordinates are: "<<r<<" and "<<a;
    }
};

class Rectangle{
    int x,y;

public:
    void input(){
        cout<<"Enter the cordinate of the rectangle: ";
        cin>> x>>y;
    }

    operator Polar(){
        Polar p1;
        p1.setR(sqrt(x*x+y*y));
        p1.setA(atan(y/float(x)));
        return p1;
    }
};

int main(){
    Rectangle r;
    r.input();

    Polar p=r;
    p.display();

    return 0;
}