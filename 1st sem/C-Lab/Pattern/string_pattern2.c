#include<stdio.h>
int main()
{
	char st[]={'S','H','U','B','H','A','M'};
	int i,j,k;
	for(i=0;i<4;i++)
	{
        for (j = 0; j <= 4 - i - 1; j++)
        {
             printf(" ");
        }
                for (k = 0; k < (i * 2) + 1; k++) 
                {

			printf("%c",st[k]);
		}
		printf("\n");
	}
return 0;
}