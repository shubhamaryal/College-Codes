// Implementation of a Circular Queue using an array

#include <iostream>

using namespace std;
#define MAX 5

class CircularQueue
{
private:
    int data[MAX];
    int front, rear;

public:
    CircularQueue()
    {
        front = -1;
        rear = -1;
    }

    void enqueue(int value)
    {
        if (rear == -1)
        {
            front = 0;
            rear = 0;
            data[rear] = value;
        }
        else
        {
            if ((rear + 1) % MAX == front)
            {
                cout << "Queue is full!" << endl;
            }
            else
            {
                rear = (rear + 1) % MAX; 
                data[rear] = value;
            }
        }
    }

    int dequeue()
    {
        int item;
        if (front == -1)
        {
            cout << "Queue is empty!" << endl;
            return -1;
        }
        else
        {
            item = data[front];
            if (front == rear)
            {
                front = -1;
                rear = -1;
            }
            else
            {
                front = (front + 1) % MAX;
            }
            return item;
        }
    }

    void display()
    {
        if (front == -1)
        {
            cout << "Queue is empty!" << endl;
            return;
        }
        cout << "Queue elements: ";
        int i = front;
        while (true)
        {
            cout << data[i] << " ";
            if (i == rear)
                break;
            i = (i + 1) % MAX; 
        }
        cout << endl;
    }
};

int main()
{
    CircularQueue q;
    cout << "Menu" << endl;
    cout << "1. Enqueue" << endl;
    cout << "2. Dequeue" << endl;
    cout << "3. Display" << endl;
    cout << "4. Exit" << endl
         << endl;

    int choice, value;
    do
    {
        cout << "Enter your choice: ";
        cin >> choice;
        switch (choice)
        {
        case 1:
            cout << "Enter value to enqueue: ";
            cin >> value;
            q.enqueue(value);
            break;
        case 2:
            value = q.dequeue();
            if (value != -1)
            {
                cout << "Dequeued value: " << value << endl;
            }
            break;
        case 3:
            q.display();
            break;
        case 4:
            cout << "Exiting..." << endl;
            break;
        default:
            cout << "Invalid choice! Please try again." << endl;
        }
    } while (choice != 4);

    cout << "Exiting the program..." << endl;

    return 0;
}