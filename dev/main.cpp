// Author: Daan van den Bergh
// Copyright: © 2022 Daan van den Bergh.

#include "../include/vweb/vweb.h"
int main() {}

// #include "../files/hello_world/start.cpp"
// #include "../main/vweb.cpp"

// #include "/Volumes/persistance/private/vinc/vlib/include/vlib/types.h"
// void* read_thread(void*) {
//     while (true) {
//         vlib::String data = vlib::String::load("/tmp/test");
//         if (data == "Hello World!") {
//             print("[", data, ']');
//         }
//     }
// }
// void* write_thread(void*) {
//     while (true) {
//         vlib::Path::save("/tmp/test", "Hello World!");
//     }
// }
// int main() {
//     vlib::Thread t1, t2;
//     t1.start(read_thread);
//     t2.start(write_thread);
//     t1.join();
//     t2.join();
//     return 0;
// }
