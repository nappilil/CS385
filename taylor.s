.text
.global _start
.extern printf

// Lilli Nappi
// Computes Taylor Series for e^x = 1 + 1/1!(x) + 1/2!(x)^2 + 1/3!(x)^3 + ...

_start:

    adr x0, string  // load address of string
    // convert 5 to 5.0
    ldr x1, =n       // load address of n
    ldr x1, [x1]     // load value of n
    scvtf d11, x1    // convert n to a double

    ldr x2, =x   // load address of x
    ldr d12, [x2]    // load value of x

    mov x3, #1      // 1 to be divided by factorial, used to initialize values, and increment
    scvtf d13, x3   // convert 1 to double

    fmov d9, d13    // initialize i = 1
    fmov d0, d13    // initialize sum approximation

// for (i=1; i<=n; i++)
outerloop:
    fmov d19, d13   // initialize factorial = 1
    fmov d20, d13   // initialize exponent = 1
    fcmp d9, d11    // i <= n
    b.gt print
    fmov d10, d13   // initialize j = 1

// for (j=1; j<=i; j++)
innerloop:
    fcmp d10, d9
    b.gt reset
    fmul d19, d19, d10 // factorial = factorial * j
    fmul d20, d20, d12 // exponent = exponent * x
    fadd d10, d10, d13 // increment j
    b innerloop

reset:   
    bl ithterm
    fadd d0, d0, d22   // sum = sum + multiply
    fadd d9, d9, d13   // increment i
    b outerloop

.func ithterm
ithterm:
    fdiv d21, d13, d19 // divide = 1/factorial
    fmul d22, d21, d20 // multiply = divide * exponent
    br x30             // return to callers
.endfunc

print:
    bl printf
    mov     x0, #0      /* status := 0 */
    mov     w8, #93     /* exit is syscall #1 */
    svc     #0          /* invoke syscall */

.data
n: .quad 5
x: .double 0.45
string: .ascii "The approximation is: %f\n\0"

.end
