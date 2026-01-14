// Quick Sort 

#include <iostream>
using namespace std; 

void quickSort(int arr[], int end, int start) {
    if (end < start) {
        int pivot = arr[start]; 
        int i = (end - 1); 

        for (int j = end; j < start; j++) {
            if (arr[j] < pivot) {
                i++;
                swap(arr[i], arr[j]);
            }
        }
        swap(arr[i + 1], arr[start]); 
        int pi = i + 1;
        quickSort(arr, end, pi - 1); 
        quickSort(arr, pi + 1, start); 
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    cout << "Original array: ";
    printArray(arr, n);

    quickSort(arr, 0, n - 1);

    cout << "Sorted array: ";
    printArray(arr, n);
    return 0;
}