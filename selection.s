.text
.global _start
.extern printf

_start:
	.global insertion_sort

insertion_sort:
	// load addresses of array and length
	ldr x6, =array
	ldr x7, =length
	ldr x7, [x7]
	// initialize i = 1
	mov x5, #1
	bl outerloop

exit:
	mov     x0, #0      /* status := 0 */
    mov     w8, #93     /* exit is syscall #1 */
    svc     #0          /* invoke syscall */
	

.func outerloop

// for(int i = 1; i < length; i++)
outerloop:
	subs xzr, x5, x7 // i < length
	b.ge output
	lsl x2, x5, #3    // i * 8
	add x2, x6, x2   
	ldr x2, [x2, 0]   // x2 = array[i] current value
	sub x9, x5, #1	  // x9 j = i - 1

// for(j = i - 1; j >= 0 && array[j] > current; j--)
innerloop:
	subs xzr, x9, #0 // j >= 0
	b.lt reset
	lsl x3, x9, #3    // j * 8
	add x3, x6, x3    
	ldr x3, [x3, 0]   // x3 = array[j] 
	subs xzr, x3, x2  // && array[j] > array[i]
	b.le reset
	add x4, x9, #1     // x4 = j + 1
	lsl x4, x4, #3     // (j + 1) * 8
	str x3, [x6, x4]  // array[j + 1] = array[j]
	sub x9, x9, #1    // decrement j
	b innerloop

reset:
	add x4, x9, #1   // x4 = j + 1
	lsl x4, x4, #3     // (j + 1) * 8
	str x2, [x6, x4]  // array[j + 1] = array[i]
	add x5, x5, 1	  // increment i
	b outerloop

output:
	// initialize i = 0
	sub x19, x19, x19
	// for(i = 0; i < length; i++)

print: 
	sub sp, sp, #32    // make space for stack
    str x30, [sp, 8]
	str x19, [sp, 0]    // i
	str x6, [sp, 16]   // address of array 
    str x7, [sp, 32]   // length of array  

	cmp x19, x7  // i < length
	b.ge return;
	lsl x20, x19, #3    // i * 8
	add x20, x6, x20   
	ldr x1, [x20, 0]  // x20 = array[i] current value 		
	ldr x0, =string
	bl printf

	ldr x30, [sp, 8]
    ldr x19, [sp, 0] 
	ldr x6, [sp, 16] 
	ldr x7, [sp, 32] 
    add sp, sp, #32             // pop stack
	add x19, x19, #1   // increment i

    b print	

return:
	br x30  // jump to callers

.endfunc

.data
array: .dword 5,3,2,4,1,7,6
length: .dword 7
string: .ascii " %d\n\0"

.end
