/* WAP in CPP to write the details of n students entered by the user to a file using the concept of writing objects to a file. */

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
};

int main() {
    Student s;
    fstream file;

    file.open("1.text", ios::out);
    int n;
    cout << "Enter the number of students: ";
    cin >> n;
    for (int i = 0; i < n; i++) {
        s.input();
        file.write((char*)&s,sizeof(s)); // yo syntax nai ho
    }

    cout<<"File written!";
    file.close();

    return 0;
}
