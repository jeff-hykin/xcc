#include "unistd.h"
#include "_syscall.h"
#include "errno.h"

#if defined(__NR_pipe2)

#if defined(__GNUC__)
#pragma GCC diagnostic ignored "-Wunused-parameter"
#endif
int pipe2(int *pipefd, int flag) {
  int ret;
  SYSCALL_RET(__NR_pipe2, ret);
  if (ret < 0) {
    errno = -ret;
    ret = -1;
  }
  return ret;
}
#endif
