
#ifndef ADD_CODE
#define ADD_CODE(...)  do { unsigned char buf[] = {__VA_ARGS__}; add_code(buf, sizeof(buf)); } while (0)
#endif
#ifndef ADD_LABEL
#define ADD_LABEL(label)  do { add_label(label); add_asm_label(label); } while (0)
#endif
#ifndef ADD_ASM
#define ADD_ASM(...)  add_asm(__VA_ARGS__)
#endif
#ifndef ADD_LOC_REL8
#define ADD_LOC_REL8(label, ofs, base)  add_loc_rel8(label, ofs, base)
#endif
#ifndef ADD_LOC_REL32
#define ADD_LOC_REL32(label, ofs, base)  add_loc_rel32(label, ofs, base)
#endif

#define IM8(x)   (x)
#define IM16(x)  (x), ((x) >> 8)
#define IM32(x)  (x), ((x) >> 8), ((x) >> 16), ((x) >> 24)
#define IM64(x)  (x), ((x) >> 8), ((x) >> 16), ((x) >> 24), ((x) >> 32), ((x) >> 40), ((x) >> 48), ((x) >> 56)

#define MOV_IM8_AL(x)    do { ADD_ASM("mov $%d, %%al", (int)(x)); ADD_CODE(0xb0, x); } while (0)
#define MOV_IM32_EAX(x)  do { ADD_ASM("mov $%d, %%eax", (int)(x)); ADD_CODE(0xb8, IM32(x)); } while (0)
#define MOV_IM32_RAX(x)  do { ADD_ASM("mov $%d, %%rax", (int)(x)); ADD_CODE(0x48, 0xc7, 0xc0, IM32(x)); } while (0)
#define MOV_IM64_RAX(x)  do { ADD_ASM("mov $%ld, %%rax", (long)(x)); ADD_CODE(0x48, 0xb8, IM64(x)); } while (0)
#define MOV_IM32_EDI(x)  do { ADD_ASM("mov $%d, %%edi", (int)(x)); ADD_CODE(0xbf, IM32(x)); } while (0)
#define MOV_IM32_RDI(x)  do { ADD_ASM("mov $%d, %%rdi", (int)(x)); ADD_CODE(0x48, 0xc7, 0xc7, IM32(x)); } while (0)
#define MOV_IM64_RDI(x)  do { ADD_ASM("mov $%ld, %rdi", (long)(x)); ADD_CODE(0x48, 0xbf, IM64(x)); } while (0)
#define MOV_IM32_RDX(x)  do { ADD_ASM("mov $%d, %%rdx", (int)(x)); ADD_CODE(0x48, 0xc7, 0xc2, IM32(x)); } while (0)
#define MOVSX_AL_AX()    do { ADD_ASM("movsx %%al, %%ax"); ADD_CODE(0x66, 0x0f, 0xbe, 0xc0); } while (0)
#define MOVSX_AL_EAX()   do { ADD_ASM("movsbl %%al, %%eax"); ADD_CODE(0x0f, 0xbe, 0xc0); } while (0)
#define MOVSX_AL_RAX()   do { ADD_ASM("movsbq %%al, %%rax"); ADD_CODE(0x48, 0x0f, 0xbe, 0xc0); } while (0)
#define MOVSX_AX_EAX()   do { ADD_ASM("movsx %%ax, %%eax"); ADD_CODE(0x0f, 0xbf, 0xc0); } while (0)
#define MOVSX_AX_RAX()   do { ADD_ASM("movsx %%ax, %%rax"); ADD_CODE(0x48, 0x0f, 0xbf, 0xc0); } while (0)
#define MOVZX_AL_EAX()   do { ADD_ASM("movzbl %%al, %%eax"); ADD_CODE(0x0f, 0xb6, 0xc0); } while (0)
#define MOVZX_AL_RAX()   do { ADD_ASM("movzbq %%al, %%rax"); ADD_CODE(0x48, 0x0f, 0xb6, 0xc0); } while (0)
#define MOVSX_EAX_RAX()  do { ADD_ASM("movsx %%eax, %%rax"); ADD_CODE(0x48, 0x63, 0xc0); } while (0)
#define MOVSX_EAX_RDI()  do { ADD_ASM("movsx %%eax, %%rdi"); ADD_CODE(0x48, 0x63, 0xf8); } while (0)
#define MOV_EAX_EDI()    do { ADD_ASM("mov %%eax, %%edi"); ADD_CODE(0x89, 0xc7); } while (0)
#define MOV_RAX_RSI()    do { ADD_ASM("mov %%rax, %%rsi"); ADD_CODE(0x48, 0x89, 0xc6); } while (0)
#define MOV_RAX_RDI()    do { ADD_ASM("mov %%rax, %%rdi"); ADD_CODE(0x48, 0x89, 0xc7); } while (0)
#define MOV_DL_AL()      do { ADD_ASM("mov %%dl, %%al"); ADD_CODE(0x88, 0xd0); } while (0)
#define MOV_DX_AX()      do { ADD_ASM("mov %%dx, %%ax"); ADD_CODE(0x66, 0x89, 0xd0); } while (0)
#define MOV_EDX_EAX()    do { ADD_ASM("mov %%edx, %%eax"); ADD_CODE(0x89, 0xd0); } while (0)
#define MOV_RDX_RAX()    do { ADD_ASM("mov %%rdx, %%rax"); ADD_CODE(0x48, 0x89, 0xd0); } while (0)
#define MOV_RDI_RAX()    do { ADD_ASM("mov %%rdi, %%rax"); ADD_CODE(0x48, 0x89, 0xf8); } while (0)
#define MOV_RDI_RCX()    do { ADD_ASM("mov %%rdi, %%rcx"); ADD_CODE(0x48, 0x89, 0xf9); } while (0)
#define MOV_RSP_RBP()    do { ADD_ASM("mov %%rsp, %%rbp"); ADD_CODE(0x48, 0x89, 0xe5); } while (0)
#define MOV_RBP_RSP()    do { ADD_ASM("mov %%rbp, %%rsp"); ADD_CODE(0x48, 0x89, 0xec); } while (0)
#define MOV_RBP_RAX()    do { ADD_ASM("mov %%rbp, %%rax"); ADD_CODE(0x48, 0x89, 0xe8); } while (0)
#define MOV_AL_IND_RSI()   do { ADD_ASM("mov %%al, (%%rsi)"); ADD_CODE(0x88, 0x06); } while (0)
#define MOV_AL_IND_RDI()   do { ADD_ASM("mov %%al, (%%rdi)"); ADD_CODE(0x88, 0x07); } while (0)
#define MOV_AX_IND_RSI()   do { ADD_ASM("mov %%ax, (%%rsi)"); ADD_CODE(0x66, 0x89, 0x06); } while (0)
#define MOV_AX_IND_RDI()   do { ADD_ASM("mov %%ax, (%%rdi)"); ADD_CODE(0x66, 0x89, 0x07); } while (0)
#define MOV_IND_RAX_AL()   do { ADD_ASM("mov (%%rax), %%al"); ADD_CODE(0x8a, 0x00); } while (0)
#define MOV_IND_RAX_AX()   do { ADD_ASM("mov (%%rax), %%ax"); ADD_CODE(0x66, 0x8b, 0x00); } while (0)
#define MOV_IND_RAX_EAX()  do { ADD_ASM("mov (%%rax), %%eax"); ADD_CODE(0x8b, 0x00); } while (0)
#define MOV_IND_RAX_RAX()  do { ADD_ASM("mov (%%rax), %%rax"); ADD_CODE(0x48, 0x8b, 0x00); } while (0)
#define MOV_IND_RAX_RDI()  do { ADD_ASM("mov (%%rax), %%rdi"); ADD_CODE(0x48, 0x8b, 0x38); } while (0)
#define MOV_RAX_IND_RAX()  do { ADD_ASM("mov %%rax, (%%rax)"); ADD_CODE(0x48, 0x89, 0x00); } while (0)
#define MOV_EAX_IND_RSI()  do { ADD_ASM("mov %%eax, (%%rsi)"); ADD_CODE(0x89, 0x06); } while (0)
#define MOV_EAX_IND_RDI()  do { ADD_ASM("mov %%eax, (%%rdi)"); ADD_CODE(0x89, 0x07); } while (0)
#define MOV_RAX_IND_RSI()  do { ADD_ASM("mov %%rax, (%%rsi)"); ADD_CODE(0x48, 0x89, 0x06); } while (0)
#define MOV_RAX_IND_RDI()  do { ADD_ASM("mov %%rax, (%%rdi)"); ADD_CODE(0x48, 0x89, 0x07); } while (0)
#define MOV_RDI_IND_RAX()  do { ADD_ASM("mov %%rdi, (%%rax)"); ADD_CODE(0x48, 0x89, 0x38); } while (0)
#define MOV_DI_CX()            do { ADD_ASM("mov %%di, %%cx"); ADD_CODE(0x66, 0x89, 0xf9); } while (0)
#define MOV_DIL_CL()           do { ADD_ASM("mov %%dil, %%cl"); ADD_CODE(0x40, 0x88, 0xf9); } while (0)
#define MOV_EDI_ECX()          do { ADD_ASM("mov %%edi, %%ecx"); ADD_CODE(0x89, 0xf9); } while (0)
#define MOV_DIL_IND8_RBP(ofs)  do { ADD_ASM("mov %%dil, %d(%%rbp)", (int)(ofs)); ADD_CODE(0x40, 0x88, 0x7d, ofs); } while (0)
#define MOV_EDI_IND8_RBP(ofs)  do { ADD_ASM("mov %%edi, %d(%%rbp)", (int)(ofs)); ADD_CODE(0x89, 0x7d, ofs); } while (0)
#define MOV_RDI_IND8_RBP(ofs)  do { ADD_ASM("mov %%rdi, %d(%%rbp)", (int)(ofs)); ADD_CODE(0x48, 0x89, 0x7d, ofs); } while (0)
#define MOV_SIL_IND8_RBP(ofs)  do { ADD_ASM("mov %%sil, %d(%%rbp)", (int)(ofs)); ADD_CODE(0x40, 0x88, 0x75, ofs); } while (0)
#define MOV_ESI_IND8_RBP(ofs)  do { ADD_ASM("mov %%esi, %d(%%rbp)", (int)(ofs)); ADD_CODE(0x89, 0x75, ofs); } while (0)
#define MOV_RSI_IND8_RBP(ofs)  do { ADD_ASM("mov %%rsi, %d(%%rbp)", (int)(ofs)); ADD_CODE(0x48, 0x89, 0x75, ofs); } while (0)
#define MOV_DL_IND8_RBP(ofs)   do { ADD_ASM("mov %%dl, %d(%%rbp)", (int)(ofs)); ADD_CODE(0x88, 0x55, ofs); } while (0)
#define MOV_EDX_IND8_RBP(ofs)  do { ADD_ASM("mov %%edx, %d(%%rbp)", (int)(ofs)); ADD_CODE(0x89, 0x55, ofs); } while (0)
#define MOV_RDX_IND8_RBP(ofs)  do { ADD_ASM("mov %%rdx, %d(%%rbp)", (int)(ofs)); ADD_CODE(0x48, 0x89, 0x55, ofs); } while (0)
#define MOV_CL_IND8_RBP(ofs)   do { ADD_ASM("mov %%cl, %d(%%rbp)", (int)(ofs)); ADD_CODE(0x88, 0x4d, ofs); } while (0)
#define MOV_ECX_IND8_RBP(ofs)  do { ADD_ASM("mov %%ecx, %d(%rbp)", (int)(ofs)); ADD_CODE(0x89, 0x4d, ofs); } while (0)
#define MOV_RCX_IND8_RBP(ofs)  do { ADD_ASM("mov %%rcx, %d(%%rbp)", (int)(ofs)); ADD_CODE(0x48, 0x89, 0x4d, ofs); } while (0)
#define MOV_R8B_IND8_RBP(ofs)  do { ADD_ASM("mov %%r8b, %d(%%rbp)", (int)(ofs)); ADD_CODE(0x44, 0x88, 0x45, ofs); } while (0)
#define MOV_R8D_IND8_RBP(ofs)  do { ADD_ASM("mov %%r8d, %d(%%rbp)", (int)(ofs)); ADD_CODE(0x44, 0x89, 0x45, ofs); } while (0)
#define MOV_R8_IND8_RBP(ofs)   do { ADD_ASM("mov %%r8,%d(%%rbp)", (int)(ofs)); ADD_CODE(0x4c, 0x89, 0x45, ofs); } while (0)
#define MOV_R9B_IND8_RBP(ofs)  do { ADD_ASM("mov %%r9b,%d(%%rbp)", (int)(ofs)); ADD_CODE(0x44, 0x88, 0x4d, ofs); } while (0)
#define MOV_R9D_IND8_RBP(ofs)  do { ADD_ASM("mov %%r9d, %d(%%rbp)", (int)(ofs)); ADD_CODE(0x44, 0x89, 0x4d, ofs); } while (0)
#define MOV_R9_IND8_RBP(ofs)   do { ADD_ASM("mov %%r9, %d(%%rbp)", (int)(ofs)); ADD_CODE(0x4c, 0x89, 0x4d, ofs); } while (0)
#define MOV_IND8_RSP_RDI(ofs)  do { ADD_ASM("mov %d(%%rsp), %%rdi", (int)(ofs)); ADD_CODE(0x48, 0x8b, 0x7c, 0x24, ofs); } while (0)
#define MOV_IND8_RSP_RSI(ofs)  do { ADD_ASM("mov %d(%%rsp), %%rsi", (int)(ofs)); ADD_CODE(0x48, 0x8b, 0x74, 0x24, ofs); } while (0)
#define MOV_IND8_RSP_RDX(ofs)  do { ADD_ASM("mov %d(%%rsp), %%rdx", (int)(ofs)); ADD_CODE(0x48, 0x8b, 0x54, 0x24, ofs); } while (0)
#define LEA_OFS8_RSP_RSI(ofs)     do { ADD_ASM("lea %d(%rsp),%rsi", (int)(ofs)); ADD_CODE(0x48, 0x8d, 0x74, 0x24, ofs); } while (0)
#define LEA_OFS32_RAX(label)      do { ADD_ASM("lea %s,%rax", label); ADD_LOC_REL32(label, 4, 8); ADD_CODE(0x48, 0x8d, 0x04, 0x25, IM32(0)); } while(0)
#define LEA_OFS32_RIP_RAX(label)  do { ADD_ASM("lea %s(%rip),%rax", label); ADD_LOC_REL32(label, 3, 7); ADD_CODE(0x48, 0x8d, 0x05, IM32(0)); } while(0)
#define ADD_DIL_AL()         do { ADD_ASM("add %%dil, %%al"); ADD_CODE(0x40, 0x00, 0xf8); } while (0)
#define ADD_DI_AX()          do { ADD_ASM("add %%di, %%ax"); ADD_CODE(0x66, 0x01, 0xf8); } while (0)
#define ADD_EDI_EAX()        do { ADD_ASM("add %%edi, %%eax"); ADD_CODE(0x01, 0xf8); } while (0)
#define ADD_RDI_RAX()        do { ADD_ASM("add %%rdi, %%rax"); ADD_CODE(0x48, 0x01, 0xf8); } while (0)
#define ADD_IM32_RAX(x)      do { ADD_ASM("add $%d, %%rax", (int)(x)); ADD_CODE(0x48, 0x05, IM32(x)); } while (0)
#define ADD_IM32_RSP(x)      do { ADD_ASM("add $%d, %%rsp", (int)(x)); ADD_CODE(0x48, 0x81, 0xc4, IM32(x)); } while (0)
#define ADD_IM16_IND_RAX(x)  do { ADD_ASM("addw $%d, (%%rax)", (int)(x)); ADD_CODE(0x66, 0x81, 0x00, IM16(x)); } while (0)
#define ADD_IM32_IND_RAX(x)  do { ADD_ASM("addl $%d, (%%rax)", (int)(x)); ADD_CODE(0x81, 0x00, IM32(x)); } while (0)
#define ADD_IND_RDI_RAX()    do { ADD_ASM("add (%%rdi), %%rax"); ADD_CODE(0x48, 0x03, 0x07); } while (0)
#define SUB_DIL_AL()         do { ADD_ASM("sub %%dil, %%al"); ADD_CODE(0x40, 0x28, 0xf8); } while (0)
#define SUB_DI_AX()          do { ADD_ASM("sub %%di, %%ax"); ADD_CODE(0x66, 0x29, 0xf8); } while (0)
#define SUB_EDI_EAX()        do { ADD_ASM("sub %%edi, %%eax"); ADD_CODE(0x29, 0xf8); } while (0)
#define SUB_RDI_RAX()        do { ADD_ASM("sub %%rdi, %%rax"); ADD_CODE(0x48, 0x29, 0xf8); } while (0)
#define SUB_IM32_RAX(x)      do { ADD_ASM("sub $%d, %%rax", (int)(x)); ADD_CODE(0x48, 0x2d, IM32(x)); } while (0)
#define SUB_IM32_RSP(x)      do { ADD_ASM("sub $%d, %%rsp", (int)(x)); ADD_CODE(0x48, 0x81, 0xec, IM32(x)); } while (0)
#define SUB_IM16_IND_RAX(x)  do { ADD_ASM("subw $%d, (%%rax)", (int)(x)); ADD_CODE(0x66, 0x81, 0x28, IM16(x)); } while (0)
#define SUB_IM32_IND_RAX(x)  do { ADD_ASM("subl $%d, (%%rax)", (int)(x)); ADD_CODE(0x81, 0x28, IM32(x)); } while (0)
#define MUL_DIL()        do { ADD_ASM("mul %%dil"); ADD_CODE(0x40, 0xf6, 0xe7); } while (0)
#define MUL_DI()         do { ADD_ASM("mul %%di"); ADD_CODE(0x66, 0xf7, 0xe7); } while (0)
#define MUL_EDI()        do { ADD_ASM("mul %%edi"); ADD_CODE(0xf7, 0xe7); } while (0)
#define MUL_RDI()        do { ADD_ASM("mul %%rdi"); ADD_CODE(0x48, 0xf7, 0xe7); } while (0)
#define DIV_DIL()        do { ADD_ASM("div %%dil"); ADD_CODE(0x40, 0xf6, 0xf7); } while (0)
#define DIV_DI()         do { ADD_ASM("div %%di"); ADD_CODE(0x66, 0xf7, 0xf7); } while (0)
#define DIV_EDI()        do { ADD_ASM("div %%edi"); ADD_CODE(0xf7, 0xf7); } while (0)
#define DIV_RDI()        do { ADD_ASM("div %%rdi"); ADD_CODE(0x48, 0xf7, 0xf7); } while (0)
#define CMP_AL_DIL()     do { ADD_ASM("cmp %%al, %%dil"); ADD_CODE(0x40, 0x38, 0xc7); } while (0)
#define CMP_EAX_EDI()    do { ADD_ASM("cmp %%eax, %%edi"); ADD_CODE(0x39, 0xc7); } while (0)
#define CMP_RAX_RDI()    do { ADD_ASM("cmp %%rax, %%rdi"); ADD_CODE(0x48, 0x39, 0xc7); } while (0)
#define CMP_RDI_RAX()    do { ADD_ASM("cmp %%rdi, %%rax"); ADD_CODE(0x48, 0x39, 0xf8); } while (0)
#define CMP_IM8_AL(x)    do { ADD_ASM("cmp $%d, %%al", (int)(x)); ADD_CODE(0x3c, x); } while (0)
#define CMP_IM8_DIL(x)   do { ADD_ASM("cmp $%d, %%dil", (int)(x)); ADD_CODE(0x40, 0x80, 0xff, x); } while (0)
#define CMP_IM8_AX(x)    do { ADD_ASM("cmp $%d, %%ax", (int)(x)); ADD_CODE(0x66, 0x83, 0xf8, x); } while (0)
#define CMP_IM8_EAX(x)   do { ADD_ASM("cmp $%d, %%eax", (int)(x)); ADD_CODE(0x83, 0xf8, x); } while (0)
#define CMP_IM8_EDI(x)   do { ADD_ASM("cmp $%d, %%edi", (int)(x)); ADD_CODE(0x83, 0xff, x); } while (0)
#define CMP_IM8_RAX(x)   do { ADD_ASM("cmp $%d, %rax", (int)(x)); ADD_CODE(0x48, 0x83, 0xf8, x); } while (0)
#define CMP_IM8_RDI(x)   do { ADD_ASM("cmp $%d, %%rdi", (int)(x)); ADD_CODE(0x48, 0x83, 0xff, x); } while (0)
#define CMP_IM32_EAX(x)  do { ADD_ASM("cmp $%d, %%eax", (int)(x)); ADD_CODE(0x3d, IM32(x)); } while (0)
#define INCB_IND_RAX()   do { ADD_ASM("incb (%%rax)"); ADD_CODE(0xfe, 0x00); } while (0)
#define INCW_IND_RAX()   do { ADD_ASM("incw (%%rax)"); ADD_CODE(0x66, 0xff, 0x00); } while (0)
#define INCL_IND_RAX()   do { ADD_ASM("incl (%%rax)"); ADD_CODE(0xff, 0x00); } while (0)
#define INCQ_IND_RAX()   do { ADD_ASM("incq (%%rax)"); ADD_CODE(0x48, 0xff, 0x00); } while (0)
#define DECB_IND_RAX()   do { ADD_ASM("decb (%%rax)"); ADD_CODE(0xfe, 0x08); } while (0)
#define DECW_IND_RAX()   do { ADD_ASM("decb (%%rax)"); ADD_CODE(0x66, 0xfe, 0x08); } while (0)
#define DECL_IND_RAX()   do { ADD_ASM("decl (%%rax)"); ADD_CODE(0xff, 0x08); } while (0)
#define DECQ_IND_RAX()   do { ADD_ASM("decq (%%rax)"); ADD_CODE(0x48, 0xff, 0x08); } while (0)
#define AND_DIL_AL()     do { ADD_ASM("and %%dil, %%al"); ADD_CODE(0x40, 0x20, 0xf8); } while (0)
#define AND_DI_AX()      do { ADD_ASM("and %%di, %%ax"); ADD_CODE(0x66, 0x21, 0xf8); } while (0)
#define AND_EDI_EAX()    do { ADD_ASM("and %%edi, %%eax"); ADD_CODE(0x21, 0xf8); } while (0)
#define AND_RDI_RAX()    do { ADD_ASM("and %%rdi, %%rax"); ADD_CODE(0x48, 0x21, 0xf8); } while (0)
#define OR_DIL_AL()      do { ADD_ASM("or %%dil, %%al"); ADD_CODE(0x40, 0x08, 0xf8); } while (0)
#define OR_DI_AX()       do { ADD_ASM("or %%di, %%ax"); ADD_CODE(0x66, 0x09, 0xf8); } while (0)
#define OR_EDI_EAX()     do { ADD_ASM("or %%edi, %%eax"); ADD_CODE(0x09, 0xf8); } while (0)
#define OR_RDI_RAX()     do { ADD_ASM("or %%rdi, %%rax"); ADD_CODE(0x48, 0x09, 0xf8); } while (0)
#define XOR_DIL_AL()     do { ADD_ASM("xor %%dil, %%al"); ADD_CODE(0x40, 0x30, 0xf8); } while (0)
#define XOR_DI_AX()      do { ADD_ASM("xor %%di, %%ax"); ADD_CODE(0x66, 0x31, 0xf8); } while (0)
#define XOR_EDI_EAX()    do { ADD_ASM("xor %%edi, %%eax"); ADD_CODE(0x31, 0xf8); } while (0)
#define XOR_RDI_RAX()    do { ADD_ASM("xor %%rdi, %%rax"); ADD_CODE(0x48, 0x31, 0xf8); } while (0)
#define SHL_CL_AL()      do { ADD_ASM("shl %%cl, %%al"); ADD_CODE(0xd2, 0xe0); } while (0)
#define SHL_CL_AX()      do { ADD_ASM("shl %%cl, %%ax"); ADD_CODE(0x66, 0xd3, 0xe0); } while (0)
#define SHL_CL_EAX()     do { ADD_ASM("shl %%cl, %%eax"); ADD_CODE(0xd3, 0xe0); } while (0)
#define SHL_CL_RAX()     do { ADD_ASM("shl %%cl, %%rax"); ADD_CODE(0x48, 0xd3, 0xe0); } while (0)
#define SHR_CL_AL()      do { ADD_ASM("shr %%cl, %%al"); ADD_CODE(0xd2, 0xe8); } while (0)
#define SHR_CL_AX()      do { ADD_ASM("shr %%cl, %%ax"); ADD_CODE(0x66, 0xd3, 0xe8); } while (0)
#define SHR_CL_EAX()     do { ADD_ASM("shr %%cl, %%eax"); ADD_CODE(0xd3, 0xe8); } while (0)
#define SHR_CL_RAX()     do { ADD_ASM("shr %%cl, %%rax"); ADD_CODE(0x48, 0xd3, 0xe8); } while (0)
#define NEG_AL()         do { ADD_ASM("neg %%al"); ADD_CODE(0xf6, 0xd8); } while (0)
#define NEG_EAX()        do { ADD_ASM("neg %%eax"); ADD_CODE(0xf7, 0xd8); } while (0)
#define NEG_RAX()        do { ADD_ASM("neg %%rax"); ADD_CODE(0x48, 0xf7, 0xd8); } while (0)
#define SETE_AL()        do { ADD_ASM("sete %%al"); ADD_CODE(0x0f, 0x94, 0xc0); } while (0)
#define SETNE_AL()       do { ADD_ASM("setne %%al"); ADD_CODE(0x0f, 0x95, 0xc0); } while (0)
#define SETS_AL()        do { ADD_ASM("sets %%al"); ADD_CODE(0x0f, 0x98, 0xc0); } while (0)
#define SETNS_AL()       do { ADD_ASM("setns %%al"); ADD_CODE(0x0f, 0x99, 0xc0); } while (0)
#define SAR_RAX(x)       do { ADD_ASM("sar %%rax"); ADD_CODE(0x48, 0xd1, 0xf8); } while (0)
#define SAR_IM8_RAX(x)   do { ADD_ASM("sar $%d, %%rax", (int)(x)); ADD_CODE(0x48, 0xc1, 0xf8, x)
#define PUSH_RAX()       do { ADD_ASM("push %%rax"); ADD_CODE(0x50); } while (0)
#define PUSH_RBP()       do { ADD_ASM("push %%rbp"); ADD_CODE(0x55); } while (0)
#define PUSH_RDI()       do { ADD_ASM("push %%rdi"); ADD_CODE(0x57); } while (0)
#define POP_RAX()        do { ADD_ASM("pop %%rax"); ADD_CODE(0x58); } while (0)
#define POP_RCX()        do { ADD_ASM("pop %%rcx"); ADD_CODE(0x59); } while (0)
#define POP_RDX()        do { ADD_ASM("pop %%rdx"); ADD_CODE(0x5a); } while (0)
#define POP_RBP()        do { ADD_ASM("pop %%rbp"); ADD_CODE(0x5d); } while (0)
#define POP_RSI()        do { ADD_ASM("pop %%rsi"); ADD_CODE(0x5e); } while (0)
#define POP_RDI()        do { ADD_ASM("pop %%rdi"); ADD_CODE(0x5f); } while (0)
#define POP_R8()         do { ADD_ASM("pop %%r8"); ADD_CODE(0x41, 0x58); } while (0)
#define POP_R9()         do { ADD_ASM("pop %%r9"); ADD_CODE(0x41, 0x59); } while (0)
#define JE32(label)      do { ADD_ASM("je %s", label); ADD_LOC_REL32(label, 2, 6); ADD_CODE(0x0f, 0x84, IM32(0)); } while(0)
#define JNE32(label)     do { ADD_ASM("jne %s", label); ADD_LOC_REL32(label, 2, 6); ADD_CODE(0x0f, 0x85, IM32(0)); } while(0)
#define JA8(label)       do { ADD_ASM("ja %s", label); ADD_LOC_REL8(label, 1, 2); ADD_CODE(0x77, IM8(0)); } while(0)
#define JMP8(label)      do { ADD_ASM("jmp %s", label); ADD_LOC_REL8(label, 1, 2); ADD_CODE(0xeb, IM8(0)); } while(0)
#define JMP32(label)     do { ADD_ASM("jmp %s", label); ADD_LOC_REL32(label, 1, 5); ADD_CODE(0xe9, IM32(0)); } while(0)
#define CALL(label)      do { ADD_ASM("call %s", label); ADD_LOC_REL32(label, 1, 5); ADD_CODE(0xe8, IM32(0)); } while(0)
#define CALL_IND_RAX()   do { ADD_ASM("call *%%rax"); ADD_CODE(0xff, 0xd0); } while (0)
#define RET()            do { ADD_ASM("ret"); ADD_CODE(0xc3); } while (0)
#define INT(x)           do { ADD_ASM("int $%d", x); ADD_CODE(0xcd, x); } while (0)
#define SYSCALL()        do { ADD_ASM("syscall"); ADD_CODE(0x0f, 0x05); } while (0)
