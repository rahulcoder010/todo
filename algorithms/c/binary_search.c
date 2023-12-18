#include <stdio.h>

int binarySearch(int arr[], int low, int high, int target);

int main()
{
   int arr[] = {2, 3, 4, 10, 40};
   int n = sizeof(arr) / sizeof(arr[0]);
   int target = 10;
   int result = binarySearch(arr, 0, n - 1, target);
   (result == -1) ? printf("Element is not present in array")
                  : printf("Element is present at index %d", result);
   return 0;
}

int binarySearch(int arr[], int low, int high, int target)
{
   if (high >= low)
   {
      int mid = low + (high - low) / 2;

      if (arr[mid] == target)
         return mid;

      if (arr[mid] > target)
         return binarySearch(arr, low, mid - 1, target);

      return binarySearch(arr, mid + 1, high, target);
   }

   return -1;
}