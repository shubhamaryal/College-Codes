/* 
    Lab 1 : Implementation of Stack using 
        (i) Top varying method 
        (ii) Top fixed method
*/

#define MAX 5
#include <iostream>

using namespace std;

class Stack {
private:
    int data[MAX];
    int top;

public:
    Stack() {
        top = -1;
    }

    void push() {
        if (top == MAX - 1) {
            cout << "Stack is full" << endl;
        }
        else {
            int item;
            top++;
            cout << "Enter the element to be pushed: ";
            cin >> item;
            data[top] = item;
        }
    }

    void pop() {
        if (top == -1) {
            cout << "Stack is empty" << endl;
        }
        else {
            int item;
            item = data[top];
            top--;
            cout << "The popped element is: " << item << endl;
        }
    }

    void display() {
        if (top == -1) {
            cout << "Stack is empty" << endl;
        }
        else {
            for (int i = 0; i <= top; i++) {
                cout << data[i] << " ";
            }
            cout << endl;
        }
    }
};

int main() {
    Stack st;
    cout << "Enter your choice: " << endl;
    cout << "1. Push" << endl;
    cout << "2. Pop" << endl;
    cout << "3. Display" << endl;
    cout << "4. Exit" << endl;
    int choice;
    do {
        cout << "Enter your choice: ";
        cin >> choice;
        switch (choice) {
        case 1:
            st.push();
            break;
        case 2:
            st.pop();
            break;
        case 3:
            st.display();
            break;
        case 4:
            cout << "Exiting..." << endl;
            break;
        }
    } while (choice != 4);

    return 0;
}
