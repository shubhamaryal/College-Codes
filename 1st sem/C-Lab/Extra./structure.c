#include <stdio.h>
struct employee
{
    char n[50];
    char a[50];
    float s;
};
int main()
{
    struct employee e[5];
    struct employee temp;
    int i,j;
    for (i=0;i<5;i++)
    {
        printf ("Enter the name, adress and salary of employee [%d]\n",i+1);
        scanf ("%s%s%f",e[i].n,e[i].a,&e[i].s);
    }
    for (i=0;i<5-1;i++)
    {
        for (j=1;j<5;j++)
        {
            if (e[i].s>e[j].s)
            {
                temp=e[i];
                e[i]=e[j];
                e[j]=temp;
            }
        }
    }
    printf ("the employee with third highest salary is:\n");
    printf ("Name : %s\n Address : %s\n Salary : %f\n",e[2].n,e[2].a,e[2].s);
}