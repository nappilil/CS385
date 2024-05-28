.text
.global _start
.extern printf

// Lilli Nappi
// Assembly implementation of Binary Search 

_start:
	.global binarysearch

binarysearch:
    ldr x0, =input
    ldr x1, =query
    bl scanf        
    ldr x1, =query
    ldr x1, [x1, #0]      // x1 = query

    ldr x2, =array        // address of array
    mov x19, #0          // x19 = low: first index in array
    ldr x4, =length      // address of size of array
    ldr x4, [x4]         // x4 = size of array
    sub x20, x4, #1      // x20 = high = size - 1
    bl whileloop

exit:
    bl printf
    mov     x0, #0      /* status := 0 */
    mov     w8, #93     /* exit is syscall #1 */
    svc     #0          /* invoke syscall */

.func whileloop
whileloop: 
    cmp x19, x20            // (low <= high)
    b.gt endloop
    // mid = low + (high - low) / 2

    sub x21, x20, x19       // high - low
    lsr x21, x21, #1        // x21 = mid = low + (high - low) / 2^1
    add x21, x19, x21       // low + (high - low)

    lsl x22, x21, #3        // mid * 8
    add x22, x2, x22        // array + mid
    ldr x22, [x22, #0]      // x22 = array[mid]

    cmp x22, x1             // if array[mid] == query
    b.eq return

    cmp x22, x1             // if array[mid] < query
    b.le setlow

    // else 
    sub x20, x21, #1         // high = mid - 1
    b whileloop

setlow:
    add x19, x21, #1         // low = mid + 1
    b whileloop

return:
    mov x1, x21              // return mid
    ldr x0, =found
    b exit

endloop:
    // return -1
    ldr x0, =notfound
    b exit
.endfunc

.data
array: .dword 1,2,3,4,5
length: .dword 5
query: .dword 0
input: .string "%ld"
found: .ascii "Query is found at index: %d\n\0"
notfound: .ascii "Query is not found.\n\0"

.end
