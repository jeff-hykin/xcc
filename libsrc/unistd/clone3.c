#include "unistd.h"
#include "_syscall.h"
#include "signal.h"

#if defined(__NR_clone3)
#include "stdint.h"

#if defined(__GNUC__)
#pragma GCC diagnostic ignored "-Wunused-parameter"
#endif

long clone3(struct clone_args *cl_args, size_t size) {
  long ret;
  SYSCALL_RET(__NR_clone3, ret);
  return ret;
}
#endif
