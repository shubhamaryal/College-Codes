/* 
    Create a class called Volume that uses three variables (length, width, height) of type distance (feet and inches) to model 
    the volume of a room. read the three dimension of the room and calculate the volume it represents and display the result. 
    the valume should be in feet^3
*/ 

#include <iostream>
using namespace std;

class Distance{
    int feet;
    int inch;
    
    public:
    Distance(){}
    
    Distance(int a,int b){
        feet=a;
        inch=b;
    }
    
    float getInFeet(){
        return feet+inch/12.0;
    }
    
};

class Volume{
    Distance length;
    Distance breadth;
    Distance height;
    
    public:
    void input(){
        int f,i;
        cout<<"ENter the length(feet,inch): "<<endl;
        cin>>f>>i;
        length = Distance(f,i);
        cout<<"ENter the width (feet,inch):: "<<endl;
        cin>>f>>i;
        breadth = Distance(f,i);
        cout<<"ENter the height(feet,inch): "<<endl;
        cin>>f>>i;
        height = Distance(f,i);
    }
    
    void calculate(){
        float l,b,h;
        l=length.getInFeet();
        b=breadth.getInFeet();
        h=height.getInFeet();
        cout<<"The volume of is: "<<l*b*h<<endl;
    }
};

int main(){
    Volume v1;
    v1.input();
    v1.calculate();
    
    return 0;
}