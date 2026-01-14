/* create classes c1 and c2 with each having one private member. Add member function to set a value for each class. Add one more 
function max() that is friendly to both classes. max() function should compare two private member of two classes and show 
maximum among them, Create one_one object of each class and then set a valur on them. display the maximum value between them. */

#include <iostream>
using namespace std;

class Class1;
class Class2;

class Class1{
    float a;

    public:
    void input1(){
        cout << "enter the number: "<<endl;
        cin>> a;
    }

    friend void max(Class1,Class2);
};

class Class2{
    float b;

    public:
    void input2(){
        cout << "enter the number: "<<endl;
        cin>> b;
    }

    friend void max(Class1,Class2);
};

void max(Class1 a1, Class2 b1){
    if (a1.a>b1.b){
        cout << a1.a<< " is greater " ;
    }
    else{
        cout << b1.b<< " is greater " ;
    }
}

int main(){
    Class1 C1;
    Class2 C2;

    C1.input1();
    C2.input2();

    max(C1,C2);

    return 0;
}