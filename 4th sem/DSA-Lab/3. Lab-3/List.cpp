// Implementation of List using an array

#include <iostream>
using namespace std;
#define MAX 5

class List
{
private:
    int data[MAX];
    int size;

public:
    List()
    {
        size = 0;
    }
    
    void appendAtLast(int item);
    void appendAtFirst(int item);
    void removeAtLast(int item);
    void removeAtFirst(int item);
    void find(int item);
    void display();
};

void List::appendAtLast(int item)
{
    if (size < MAX)
    {
        data[size] = item;
        size++;
    }
    else
    {
        cout << "List is full, cannot append at last." << endl;
    }
}

void List::appendAtFirst(int item)
{
    if (size < MAX)
    {
        for (int i = size; i > 0; i--)
        {
            data[i] = data[i - 1];
        }
        data[0] = item;
        size++;
    }
    else
    {
        cout << "List is full, cannot append at first." << endl;
    }
}

void List::removeAtLast(int item)
{
    if (size > 0)
    {
        size--;
    }
    else
    {
        cout << "List is empty, cannot remove at last." << endl;
    }
}

void List::removeAtFirst(int item)
{
    if (size > 0)
    {
        for (int i = 0; i < size - 1; i++)
        {
            data[i] = data[i + 1];
        }
        size--;
    }
    else
    {
        cout << "List is empty, cannot remove at first." << endl;
    }
}

void List::find(int item)
{
    if (size > 0)
    {
        for (int i = 0; i < size; i++)
        {
            if (item == data[i])
            {
                cout << "The value is there in the list.";
            }
            else
            {
                cout << "The value isn't there.";
            }
        }
    }
    else
    {
        cout << "List is empty";
    }
}

void List::display()
{
    cout << "List elements: ";
    for (int i = 0; i < size; i++)
    {
        cout << data[i] << " ";
    }
    cout << endl;
}

int main()
{
    List myList;
    int choice, item, pos;

    cout << "Menu" << endl;
    cout << "1. Append At First" << endl;
    cout << "2. Append At Last" << endl;
    cout << "3. Remove At First" << endl;
    cout << "4. Remove At Last" << endl;
    cout << "5. Display" << endl;
    cout << "6. Find" << endl;
    cout << "7. Exit" << endl;

    do
    {
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice)
        {
        case 1:
            cout << "Enter item to Append At Last: ";
            cin >> item;
            myList.appendAtLast(item);
            break;
        case 2:
            cout << "Enter item to Append At First: ";
            cin >> item;
            myList.appendAtFirst(item);
            break;
        case 3:
            cout << "Enter item to Remove At First: ";
            cin >> item;
            myList.removeAtFirst(item);
            break;
        case 4:
            cout << "Enter item to Remove At Last: ";
            cin >> item;
            myList.removeAtLast(item);
            break;
        case 5:
            myList.display();
            break;
        case 6:
            cout << "Enter the item to find: ";
            cin >> item;
            myList.find(item);
            break;
        case 7:
            cout << "Exiting..." << endl;
            break;
        default:
            cout << "Invalid choice!" << endl;
        }
    } while (choice != 6);

    return 0;
}