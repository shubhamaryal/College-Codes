/* WAP in CPP to read the details from a file "3.text" using the concept of formatted input from a file. */

#include<iostream> 
#include<fstream>

using namespace std;

int main (){
    char name [20], addr [20] ; 
    int roll;
    long int tel; 

    ifstream file;

    file.open("3.text", ios::in);
    file>>name>>addr>>roll>>tel;

    while(file){
        cout<<name<<" "<<addr<<" "<<roll<<" "<<tel<<endl;
        file>>name>>addr>>roll>>tel;
    }

    file.close();

    return 0;
}