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

class Rectangle{
    int x,y;

public:
    void input(){
        cout<<"Enter the cordinate of the rectangle: ";
        cin>> x>>y;
    }

    int getX(){
        return x;
    }

    int getY(){
        return y;
    }
};

class Polar{
    float r,a;

public:
    Polar (Rectangle rec){
        int rx,ry;
        rx=rec.getX();
        ry=rec.getY();
        r=sqrt(rx*rx+ry*ry);
        a=atan(ry/float(rx));
    }

    void display(){
        cout<< "the converted coordinates are: "<<r<<" and "<<a;
    }
};

int main(){
    Rectangle r;
    r.input();

    Polar p=r;
    p.display();

    return 0;
}