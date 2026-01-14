#include<stdio.h>
int main()
{
	char st[]="SHUBHAM";
	int i,j;
	for(i=0;i<7;i++)
	{
		for(j=0;j<=i;j++)
		{
			printf("%c\t",st[j]);
		}
		printf("\n");
	}
}