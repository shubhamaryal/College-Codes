/* WAP in CPP to write the details of n students entered by the user using the concept of formatted output to a file. */

#include <iostream>
#include <fstream>
using namespace std;

int main(){
    char name[20],addr[20];
    int roll;
    long int tel;

    ofstream file;

    file.open("3.text", ios::out);

    cout<<"Enter the number of records to be stroed: "<<endl;

    int n;
    cin>>n;

    for(int i=0;i<n;i++){
        cout<<"Enter name: "; 
        cin>>name;
        cout<<"Enter address: ";
        cin>>addr;
        cout<<"Enter roll: ";
        cin>>roll;
        cout<<"Enter number: ";
        cin>>tel;
        file<<name<<" "<<addr<<" "<<roll<<" "<<tel<<endl; // file ma rakhna lai simple syntax
    }

    cout<<"File written!";

    file.close();

    return 0;
}