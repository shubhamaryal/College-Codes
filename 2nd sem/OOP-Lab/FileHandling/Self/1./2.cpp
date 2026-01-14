/* WAP TO READ THE FILE USING THE CONCEPT OF CHARACTER INPUT FROM FILE */

#include<iostream>
#include<fstream>
using namespace std;

int main(){
    char ch;
    ifstream file;

    file.open("1.text", ios::in);

    if (file.fail()){
        cout<<"Error opening the file!"<<endl;
        cout<<"Exiciting."<<endl;
        exit(1);
    }

    cout<<"Contents of the file: "<<endl;

    while(file.get(ch)){
        cout<<ch;
    }

    file.close();

    return 0;
}