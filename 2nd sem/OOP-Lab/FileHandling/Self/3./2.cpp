/* to read from file "1.cpp" */

#include <iostream>
#include <fstream>
using namespace std;

class Student {
    char name[20];
    char address[50];
    int roll;
    float marks;

public:
    void input() {
        cout << "Enter the name: ";
        cin >> name;
        cout << "Enter the address: ";
        cin >> address;
        cout << "Enter the roll no: ";
        cin >> roll;
        cout << "Enter the marks: ";
        cin >> marks;
    }

    void display() {
        cout << "Name: " << name << endl;
        cout << "Address: " << address << endl;
        cout << "Roll No: " << roll << endl;
        cout << "Marks: " << marks << endl;
    }
};

int main() {
    Student s;
    fstream file;
    file.open("1.text",ios::in);
    while (file.read((char*)&s,sizeof(s))){
        s.display();
    }
    file.close();

    return 0;
}