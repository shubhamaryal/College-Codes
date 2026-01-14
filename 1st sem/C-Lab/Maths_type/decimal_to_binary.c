#include <stdio.h>
int main()
{
    int num,bin=0,rem,base=1;
    printf ("Enter the number");
    scanf ("%d",&num);
    while (num>0)
    {
        rem=num%2;
        bin=bin+rem*base;
        base=base*10;
        num=num/2;
    }
    printf ("The number is = %d", bin);
}