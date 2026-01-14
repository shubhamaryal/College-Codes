#include <stdio.h>
int sum (int num, int b);
int main ()
{
int n= 1;
int number;
int result = sum(number,1);
printf ("The sum is %d",result);
return 0;
}
int sum (int num, int b)
{
    if (b == 10)
    {
return num;
    }
else
{
return num+sum(num+1,b+1);
}
}