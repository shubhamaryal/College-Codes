// Implementation of stack using Linked List
// LIFO - last in first out

#include <iostream>
using namespace std;

struct Node {
    // each node holds data and a pointer to next node 

    int data; // stores the element value
    Node* next; // pointer for next node 
};

class Stack {
private:
    Node* top; // pointer to the top node of the stack
public:
    Stack() { top = NULL; } // pointer for empty stack

    void push(int item) {
        Node* a = new Node; // creates a new node a
        a->data = item; 
        a->next = NULL;
        if (top == NULL) {
            top = a;
        } else {
            a->next = top;
            top = a;
        }
    }

    void pop() {
        if (top == NULL) {
            cout << "Stack is empty" << endl;
        } else {
            Node* temp = top;
            cout << "Popped element: " << top->data << endl << endl;
            top = top->next;
            delete temp;
        }
    }

    void display() {
        Node* temp = top;
        cout << "Stack elements: ";
        while (temp != NULL) {
            cout << temp->data << " ";
            temp = temp->next;
        }
        cout << endl << endl;
    }

};

int main() {
    Stack s;
    int choice;
    do {
        cout << "Menu" << endl;
        cout << "1. Push" << endl;
        cout << "2. Pop" << endl;
        cout << "3. Display" << endl;
        cout << "4. Exit" << endl << endl;
        cout << "Enter your choice: ";
        cin >> choice;
        cout << endl;

        switch (choice) {
            case 1:
                int item;
                cout << "Enter the element to be pushed: ";
                cin >> item;
                cout << endl;
                s.push(item);
                break;
            case 2:
                s.pop();
                break;
            case 3:
                s.display();
                break;
            case 4:
                cout << "Exiting..." << endl;
                break;
            default:
                cout << "Invalid choice, please try again." << endl;
        }
    } while (choice != 4);

    return 0;
}