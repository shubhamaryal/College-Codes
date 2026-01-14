#include <stdio.h>
#include <string.h>
int main()
{
    char a[50];
    int i,l=0;
    printf("Enter the string");
    scanf ("%s",a);
    for (i=0;a[i]!='\0';i++)
    {
        l=l+1;
    }
    l=l;
    printf ("%d",l);
    for (i=l;i<0;i--)
    {
        printf ("%s",a);
    }
}