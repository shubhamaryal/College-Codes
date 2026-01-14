#include <iostream>
using namespace std;

class Person {
    string name;
    int age;

public:
    void input() { // inside fun
        cout<<"Enter name and age";
        cin>>name>>age;
    }

    void display(); // yo ni initialize grnu prxa class bahira fun lai
};
void Person::display() { //outside fun
    cout << "the name is:" << name << " and age is" << age ;
}
int main(){
    Person p;
    p.input();
    p.display();
    return 0;
}