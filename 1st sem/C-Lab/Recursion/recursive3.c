#include <stdio.h>
int sum(int a, int b);
int main()
{
    int num;
    printf ("Enter the number");
    scanf ("%d",&num);
    int result= sum(num,1);
    printf ("the sum is %d",result);
    return 0;
}
int sum(int a, int b)
{
    if (b==10)
    {
        return a;
    }
    else 
    {
        int nn;
        printf ("Enter the nxt number");
        scanf ("%d",&nn);
        return a+sum(nn,b+1);
    }
}