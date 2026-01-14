#include<stdio.h>
int fact (int num);
int main()
{
    int number;
    long int result;
    printf ("Enter the numbers:");
    scanf ("%d",&number);
    result = fact (number);
    printf ("The factorial is %d", result);
    return 0;
}
int fact (int num)
{
    if (num==0||num==1)
    {
        return 1;
    }
    else
    {
        return num*fact(num-1);
    }
}