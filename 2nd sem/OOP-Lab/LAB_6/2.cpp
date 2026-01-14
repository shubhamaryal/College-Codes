// wap to concatenate two user given strings using the concept of operator overloading.

#include <iostream>
using namespace std;

class String{
    char str[20];

    public:
    void input(){
        cout<<"Enter the string: ";
        cin>> str;
    }

    //friend string operator +(String, String)
    // for friend function ^^

    String operator +(String s){
        String res;
        strcpy(res.str,str);
        strcat(res.str,s.str);
        return res;
    } 
    
    /*
    String operator +(String);
    */

    void display(){
        cout << "the new string is: " << str;
    }
};

/*  
String String::operator +(String s){
    String res;
    strcpy(res.str,str);
    strcat(res.str,s.str);
    return res;
}
*/

int main(){
    String s1,s2,s3;
    s1.input();
    s2.input();
    s3=s1+s2; // s1 as function and s2 as argument
    s3.display();
    return 0;
}