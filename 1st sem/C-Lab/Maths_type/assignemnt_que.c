#include <stdio.h>
int main()
{
int a=5,b=3,c=2;
a=(b++)+(--c)+a; 
c= a>b ? a:b;
b=(++a)+(b--)+c;
c=c++ * b--;
printf ("%d\n%d\n%d",a,b,c);
return 0;
}
