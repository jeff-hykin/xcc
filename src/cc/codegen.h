// Code generation

#pragma once

#include <stdbool.h>
#include <stddef.h>  // size_t

typedef struct BB BB;
typedef struct Expr Expr;
typedef struct StructInfo StructInfo;
typedef struct Type Type;
typedef struct VReg VReg;
typedef struct VRegType VRegType;
typedef struct Vector Vector;

// Public

void gen(Vector *toplevel);

// Private

VReg *gen_expr(Expr *expr);
size_t type_size(const Type *type);
int align_size(const Type *type);
void calc_struct_size(StructInfo *sinfo);

void gen_cond_jmp(Expr *cond, bool tf, BB *bb);

void set_curbb(BB *bb);
VReg *add_new_reg(const Type *type, int flag);
VRegType *to_vtype(const Type *type);

bool is_stack_param(const Type *type);
