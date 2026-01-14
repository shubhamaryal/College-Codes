/*
    Wap with class template to represent array and add memeber function to find maximum and minimum value in the array.
*/

#include <iostream>
using namespace std;

template <class T>
class Check{
    T a[100]; 
    int n;  

public:
    void input(int size){
        n = size;
        cout<<"Enter the elements:"<<endl;
        for (int i=0;i<n;i++) {
            cin>>a[i];
        }
    }

    T max(){
        T maxValue=a[0];
        for (int i=1;i<n;i++){
            if (a[i]>maxValue){
                maxValue=a[i];
            }
        }
        return maxValue;
    }

    T min() {
        T minValue=a[0];
        for(int i=1;i<n;i++){
            if(a[i]<minValue){
                minValue =a[i];
            }
        }
        return minValue;
    }
};

int main() {
    Check<int> forInt;
    int n;

    cout<<"Enter the number of elements in the integer array: "<<endl;
    cin>>n;

    forInt.input(n);
    cout<<"Maximum value in the integer array: "<<forInt.max()<<endl;
    cout<<"Minimum value in the integer array: "<<forInt.min()<<endl;

    Check<float> forFloat;

    cout<<"Enter the number of elements in the float array: "<<endl;
    cin>>n;

    forFloat.input(n);
    cout<<"Maximum value in the float array: "<<forFloat.max()<<endl;
    cout<<"Minimum value in the float array: "<<forFloat.min()<<endl;

    return 0;
}