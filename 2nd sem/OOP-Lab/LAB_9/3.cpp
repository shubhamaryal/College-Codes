/*
    Create a function template to find the sum and average of array elements.
*/

#include <iostream>
using namespace std;

template <class T>
T sum(T a[], int size){
    T res=0;
    for (int i=0;i<size;i++){
        res= a[i] + res;
    }
    return res;
}

template <class T>
double average(T total, int count){
    double avg = double(total)/count;
    return avg;
}

int main(){
    int array[100],n;

    cout<<"Enter the number of array elements you want: "<<endl;
    cin>>n;

    cout << "Enter the array elements: "<<endl;
    for (int i=0;i<n;i++){
        cin>> array[i];
    }

    int totalSum = sum(array, n);
    double avg = average(totalSum, n);

    cout << "Sum of array elements: " << totalSum << endl;
    cout << "Average of array elements: " << avg << endl;

    return 0;
}