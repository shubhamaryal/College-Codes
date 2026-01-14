#include<stdio.h>
int main ()
{
    int v =3;
    int *pv;
    pv =&v;
    printf ("\n*pv=%d \t v=%d",*pv,v);
    *pv=0;
    printf ("\n\n*pv =%d \t v=%d",*pv,v);
    return 0;
}