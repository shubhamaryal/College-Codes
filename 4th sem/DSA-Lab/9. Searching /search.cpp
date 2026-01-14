#include <iostream>

using namespace std;

int linear_search(int arr[], int size, int item_to_be_found){
    for(int i = 0; i < size; i++){
        if(arr[i] == item_to_be_found){
            return i; 
        }
    }
    return -1; 
}

int main(){
    int array[] = {4, 7, 1, 9, 2};
    int size = 5;
    int item_to_find;
    
    cout << "Array elements: ";
    for(int i = 0; i < size; i++){
        cout << array[i] << " ";
    }
    cout << endl;
    
    cout << "Enter the element to search: ";
    cin >> item_to_find;
    
    int result = linear_search(array, size, item_to_find);
    
    if(result != -1){
        cout << "Element " << item_to_find << " found at index " << result << endl;
    } else {
        cout << "Element " << item_to_find << " not found in the array" << endl;
    }
    
    return 0;
}