
#include <stdlib.h>
#include <stdio.h>

int main()
{
	char numArr[] = "ar";
	int b = 7;
	//scanf("Enter a name %s", numArr);
	int* a = b;
	printf("%d %c", numArr, *numArr);
}

