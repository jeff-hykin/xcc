#pragma once

#define IMM(imm, t, b)  (((imm) >> (b)) & ((1 << (t - b + 1)) - 1))

#define W_MOVK(sz, rd, imm, sft)                   MAKE_CODE32(inst, code, 0x72800000U | ((sz) << 31) | ((sft) << 21) | (((imm) & ((1U << 16) - 1)) << 5) | (rd))
#define W_MOVZ(sz, rd, imm, sft)                   MAKE_CODE32(inst, code, 0x52800000U | ((sz) << 31) | ((sft) << 21) | (((imm) & ((1U << 16) - 1)) << 5) | (rd))
#define W_MOVN(sz, rd, imm, sft)                   MAKE_CODE32(inst, code, 0x12800000U | ((sz) << 31) | ((sft) << 21) | (((imm) & ((1U << 16) - 1)) << 5) | (rd))

#define W_ADD_I(sz, rd, rn, imm)                   MAKE_CODE32(inst, code, 0x11000000U | ((sz) << 31) | (((imm) & ((1U << 12) - 1)) << 10) | ((rn) << 5) | (rd))
#define W_ADD_S(sz, rd, rn, rm, imm)               MAKE_CODE32(inst, code, 0x0b000000U | ((sz) << 31) | ((rm) << 16) | (((imm) & ((1U << 6) - 1)) << 10) | ((rn) << 5) | (rd))
#define W_SUB_I(sz, rd, rn, imm)                   MAKE_CODE32(inst, code, 0x51000000U | ((sz) << 31) | (((imm) & ((1U << 12) - 1)) << 10) | ((rn) << 5) | (rd))
#define W_SUB_S(sz, rd, rn, rm, imm)               MAKE_CODE32(inst, code, 0x4b000000U | ((sz) << 31) | ((rm) << 16) | (((imm) & ((1U << 6) - 1)) << 10) | ((rn) << 5) | (rd))
#define W_SUBS_I(sz, rd, rn, imm)                  MAKE_CODE32(inst, code, 0x71000000U | ((sz) << 31) | (((imm) & ((1U << 12) - 1)) << 10) | ((rn) << 5) | (rd))
#define W_ORR_S(sz, rd, rn, rm, imm)               MAKE_CODE32(inst, code, 0x2a000000U | ((sz) << 31) | ((rm) << 16) | (((imm) & ((1U << 6) - 1)) << 10) | ((rn) << 5) | (rd))

#define W_LDUR(b, s, rt, ofs, base)                MAKE_CODE32(inst, code, 0x38400000U | ((b) << 30) | ((s) << 23) | ((((ofs) & ((1U << 9) - 1))) << 12) | ((base) << 5) | (rt))
#define W_LDR_UIMM(b, s, rt, ofs, base)            MAKE_CODE32(inst, code, 0x39400000U | ((b) << 30) | ((s) << 23) | ((((ofs) & ((1U << 12) - 1))) << 10) | ((base) << 5) | (rt))
#define W_LDR(b, s, rt, ofs, base, prepost)        MAKE_CODE32(inst, code, 0x38400000U | ((b) << 30) | ((s) << 23) | ((((ofs) & ((1U << 9) - 1))) << 12) | ((prepost) << 10) | ((base) << 5) | (rt))
#define W_STUR(b, rt, ofs, base)                   MAKE_CODE32(inst, code, 0x38000000U | ((b) << 30) | ((((ofs) & ((1U << 9) - 1))) << 12) | ((base) << 5) | (rt))
#define W_STR_UIMM(b, rt, ofs, base)               MAKE_CODE32(inst, code, 0x39000000U | ((b) << 30) | ((((ofs) & ((1U << 12) - 1))) << 10) | ((base) << 5) | (rt))
#define W_STR(b, rt, ofs, base, prepost)           MAKE_CODE32(inst, code, 0x38000000U | ((b) << 30) | ((((ofs) & ((1U << 9) - 1))) << 12) | ((prepost) << 10) | ((base) << 5) | (rt))
#define W_LDP(sz, rs1, rs2, ofs, base, prepost)    MAKE_CODE32(inst, code, 0x28400000U | ((sz) << 31) | ((prepost) << 23) | (((((ofs) >> 3) & ((1U << 7) - 1))) << 15) | ((rs2) << 10) | ((base) << 5) | (rs1))
#define W_STP(sz, rs1, rs2, ofs, base, prepost)    MAKE_CODE32(inst, code, 0x28000000U | ((sz) << 31) | ((prepost) << 23) | (((((ofs) >> 3) & ((1U << 7) - 1))) << 15) | ((rs2) << 10) | ((base) << 5) | (rs1))

#define W_LDR_R(sz, rt, base, rm, sz2, s, option)  MAKE_CODE32(inst, code, 0xb8600800U | ((sz) << 30) | ((rm) << 16) | ((option) << 13) | ((s) << 12) | ((base) << 5) | (rt))
#define W_LDRB_R(rt, base, rm, option)             MAKE_CODE32(inst, code, 0x38400000U | ((((ofs) & ((1U << 9) - 1))) << 12) | ((option) << 10) | ((base) << 5) | (rt))
#define W_LDRSB_R(rt, base, rm, option)            MAKE_CODE32(inst, code, 0x38c00000U | ((((ofs) & ((1U << 9) - 1))) << 12) | ((option) << 10) | ((base) << 5) | (rt))
#define W_LDRH_R(rt, base, rm, option)             MAKE_CODE32(inst, code, 0x78400000U | ((((ofs) & ((1U << 9) - 1))) << 12) | ((option) << 10) | ((base) << 5) | (rt))
#define W_LDRSH_R(rt, base, rm, option)            MAKE_CODE32(inst, code, 0x78c00000U | ((((ofs) & ((1U << 9) - 1))) << 12) | ((option) << 10) | ((base) << 5) | (rt))
#define W_STR_R(sz, rt, base, rm, option)          MAKE_CODE32(inst, code, 0xb8200800U | ((sz) << 30) | ((rm) << 16) | ((option) << 13) | ((base) << 5) | (rt))
#define W_STRB_R(rt, base, rm, option)             MAKE_CODE32(inst, code, 0x38000000U | ((((ofs) & ((1U << 9) - 1))) << 12) | ((option) << 10) | ((base) << 5) | (rt))
#define W_STRH_R(rt, base, rm, option)             MAKE_CODE32(inst, code, 0x78000000U | ((((ofs) & ((1U << 9) - 1))) << 12) | ((option) << 10) | ((base) << 5) | (rt))

#define W_ADRP(rd, imm)                            MAKE_CODE32(inst, code, 0x90000000U | (IMM(imm, 31, 30) << 29) | (IMM(imm, 29, 12) << 5) | (rd))

#define W_B()                                      MAKE_CODE32(inst, code, 0x14000000U)
#define W_BR(rn)                                   MAKE_CODE32(inst, code, 0xd61f0000U | ((rn) << 5))
#define W_BCC(cond)                                MAKE_CODE32(inst, code, 0x54000000U | (cond))

#define W_BL(offset)                               MAKE_CODE32(inst, code, 0x94000000U | ((offset) & ((1U << 26) - 1)))
#define W_BLR(rn)                                  MAKE_CODE32(inst, code, 0xd63f0000U | ((rn) << 5))
#define W_RET(rn)                                  MAKE_CODE32(inst, code, 0xd65f0000U | ((rn) << 5))

#define P_MOV(sz, rd, rs)                          W_ORR_S(sz, rd, ZERO, rs, 0)
#define P_CMP_I(sz, rd, imm)                       W_SUBS_I(sz, ZERO, rd, imm)
