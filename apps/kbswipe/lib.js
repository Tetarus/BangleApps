exports.INPUT_MODE_ALPHA = 0;
exports.INPUT_MODE_NUM = 1;
exports.INPUT_MODE_SYM = 2;

/* To make your own strokes, type:

Bangle.on('stroke',print)

on the left of the IDE, then do a stroke and copy out the Uint8Array line
*/
exports.getStrokes = function(mode, cb) {
  if (mode === exports.INPUT_MODE_ALPHA) {
    cb("a", new Uint8Array([58, 159, 58, 155, 62, 144, 69, 127, 77, 106, 86, 90, 94, 77, 101, 68, 108, 62, 114, 59, 121, 59, 133, 61, 146, 70, 158, 88, 169, 107, 176, 124, 180, 135, 183, 144, 185, 152]));
    cb("b", new Uint8Array([51, 47, 51, 77, 56, 123, 60, 151, 65, 163, 68, 164, 68, 144, 67, 108, 67, 76, 72, 43, 104, 51, 121, 74, 110, 87, 109, 95, 131, 117, 131, 140, 109, 152, 88, 157]));
    cb("c", new Uint8Array([153, 62, 150, 62, 145, 62, 136, 62, 123, 62, 106, 65, 85, 70, 65, 75, 50, 82, 42, 93, 37, 106, 36, 119, 36, 130, 40, 140, 49, 147, 61, 153, 72, 156, 85, 157, 106, 158, 116, 158]));
    cb("d", new Uint8Array([57, 178, 57, 176, 55, 171, 52, 163, 50, 154, 49, 146, 47, 135, 45, 121, 44, 108, 44, 97, 44, 85, 44, 75, 44, 66, 44, 58, 44, 48, 44, 38, 46, 31, 48, 26, 58, 21, 75, 20, 99, 26, 120, 35, 136, 51, 144, 70, 144, 88, 137, 110, 124, 131, 106, 145, 88, 153]));
    cb("e", new Uint8Array([150, 72, 141, 69, 114, 68, 79, 69, 48, 77, 32, 81, 31, 85, 46, 91, 73, 95, 107, 100, 114, 103, 83, 117, 58, 134, 66, 143, 105, 148, 133, 148, 144, 148]));
    cb("f", new Uint8Array([157, 52, 155, 52, 148, 52, 137, 52, 124, 52, 110, 52, 96, 52, 83, 52, 74, 52, 67, 52, 61, 52, 57, 52, 55, 52, 52, 52, 52, 54, 52, 58, 52, 64, 54, 75, 58, 97, 59, 117, 60, 130]));
    cb("g", new Uint8Array([160, 66, 153, 62, 129, 58, 90, 56, 58, 57, 38, 65, 31, 86, 43, 125, 69, 152, 116, 166, 145, 154, 146, 134, 112, 116, 85, 108, 97, 106, 140, 106, 164, 106]));
    cb("h", new Uint8Array([58, 50, 58, 55, 58, 64, 58, 80, 58, 102, 58, 122, 58, 139, 58, 153, 58, 164, 58, 171, 58, 177, 58, 179, 58, 181, 58, 180, 58, 173, 58, 163, 59, 154, 61, 138, 64, 114, 68, 95, 72, 84, 80, 79, 91, 79, 107, 82, 123, 93, 137, 111, 145, 130, 149, 147, 150, 154, 150, 159]));
    cb("i", new Uint8Array([89, 48, 89, 49, 89, 51, 89, 55, 89, 60, 89, 68, 89, 78, 89, 91, 89, 103, 89, 114, 89, 124, 89, 132, 89, 138, 89, 144, 89, 148, 89, 151, 89, 154, 89, 156, 89, 157, 89, 158]));
    cb("j", new Uint8Array([130, 57, 130, 61, 130, 73, 130, 91, 130, 113, 130, 133, 130, 147, 130, 156, 130, 161, 130, 164, 130, 166, 129, 168, 127, 168, 120, 168, 110, 168, 91, 167, 81, 167, 68, 167]));
    cb("k", new Uint8Array([149, 63, 147, 68, 143, 76, 136, 89, 126, 106, 114, 123, 100, 136, 86, 147, 72, 153, 57, 155, 45, 152, 36, 145, 29, 131, 26, 117, 26, 104, 27, 93, 30, 86, 35, 80, 45, 77, 62, 80, 88, 96, 113, 116, 130, 131, 140, 142, 145, 149, 148, 153]));
    cb("l", new Uint8Array([42, 55, 42, 59, 42, 69, 44, 87, 44, 107, 44, 128, 44, 143, 44, 156, 44, 163, 44, 167, 44, 169, 45, 170, 49, 170, 59, 169, 76, 167, 100, 164, 119, 162, 139, 160, 163, 159]));
    cb("m", new Uint8Array([49, 165, 48, 162, 46, 156, 44, 148, 42, 138, 42, 126, 42, 113, 43, 101, 45, 91, 47, 82, 49, 75, 51, 71, 54, 70, 57, 70, 61, 74, 69, 81, 75, 91, 84, 104, 94, 121, 101, 132, 103, 137, 106, 130, 110, 114, 116, 92, 125, 75, 134, 65, 139, 62, 144, 66, 148, 83, 151, 108, 155, 132, 157, 149]));
    cb("n", new Uint8Array([50, 165, 50, 160, 50, 153, 50, 140, 50, 122, 50, 103, 50, 83, 50, 65, 50, 52, 50, 45, 50, 43, 52, 52, 57, 67, 66, 90, 78, 112, 93, 131, 104, 143, 116, 152, 127, 159, 135, 160, 141, 150, 148, 125, 154, 96, 158, 71, 161, 56, 162, 49]));
    cb("o", new Uint8Array([107, 58, 104, 58, 97, 61, 87, 68, 75, 77, 65, 88, 58, 103, 54, 116, 53, 126, 55, 135, 61, 143, 75, 149, 91, 150, 106, 148, 119, 141, 137, 125, 143, 115, 146, 104, 146, 89, 142, 78, 130, 70, 116, 65, 104, 62]));
    cb("p", new Uint8Array([29, 47, 29, 55, 29, 75, 29, 110, 29, 145, 29, 165, 29, 172, 29, 164, 30, 149, 37, 120, 50, 91, 61, 74, 72, 65, 85, 61, 103, 61, 118, 63, 126, 69, 129, 76, 130, 87, 126, 98, 112, 108, 97, 114, 87, 116]));
    cb("q", new Uint8Array([95, 59, 93, 59, 88, 59, 79, 59, 68, 61, 57, 67, 50, 77, 48, 89, 48, 103, 50, 117, 55, 130, 65, 140, 76, 145, 85, 146, 94, 144, 101, 140, 105, 136, 106, 127, 106, 113, 100, 98, 92, 86, 86, 79, 84, 75, 84, 72, 91, 69, 106, 67, 126, 67, 144, 67, 158, 67, 168, 67, 173, 67, 177, 67]));
    cb("r", new Uint8Array([53, 49, 53, 62, 53, 91, 53, 127, 53, 146, 53, 147, 53, 128, 53, 94, 53, 69, 62, 44, 82, 42, 94, 50, 92, 68, 82, 85, 77, 93, 80, 102, 95, 119, 114, 134, 129, 145, 137, 150]));
    cb("s", new Uint8Array([159, 72, 157, 70, 155, 68, 151, 66, 145, 63, 134, 60, 121, 58, 108, 56, 96, 55, 83, 55, 73, 55, 64, 56, 57, 60, 52, 65, 49, 71, 49, 76, 50, 81, 55, 87, 71, 94, 94, 100, 116, 104, 131, 108, 141, 114, 145, 124, 142, 135, 124, 146, 97, 153, 70, 157, 52, 158]));
    cb("t", new Uint8Array([45, 55, 48, 55, 55, 55, 72, 55, 96, 55, 120, 55, 136, 55, 147, 55, 152, 55, 155, 55, 157, 55, 158, 56, 158, 60, 156, 70, 154, 86, 151, 102, 150, 114, 148, 125, 148, 138, 148, 146]));
    cb("u", new Uint8Array([35, 52, 35, 59, 35, 73, 35, 90, 36, 114, 38, 133, 42, 146, 49, 153, 60, 157, 73, 158, 86, 156, 100, 152, 112, 144, 121, 131, 127, 114, 132, 97, 134, 85, 135, 73, 136, 61, 136, 56]));
    cb("v", new Uint8Array([36, 55, 37, 59, 40, 68, 45, 83, 51, 100, 58, 118, 64, 132, 69, 142, 71, 149, 73, 156, 76, 158, 77, 160, 77, 159, 80, 151, 82, 137, 84, 122, 86, 111, 90, 91, 91, 78, 91, 68, 91, 63, 92, 61, 97, 61, 111, 61, 132, 61, 150, 61, 162, 61]));
    cb("w", new Uint8Array([25, 46, 25, 82, 25, 119, 33, 143, 43, 153, 60, 147, 73, 118, 75, 91, 76, 88, 85, 109, 96, 134, 107, 143, 118, 137, 129, 112, 134, 81, 134, 64, 134, 55]));
    cb("x", new Uint8Array([56, 63, 56, 67, 57, 74, 60, 89, 66, 109, 74, 129, 85, 145, 96, 158, 107, 164, 117, 167, 128, 164, 141, 155, 151, 140, 159, 122, 166, 105, 168, 89, 170, 81, 170, 73, 169, 66, 161, 63, 141, 68, 110, 83, 77, 110, 55, 134, 47, 145]));
    cb("y", new Uint8Array([30, 41, 30, 46, 30, 52, 30, 63, 30, 79, 33, 92, 38, 100, 47, 104, 54, 107, 66, 105, 79, 94, 88, 82, 92, 74, 94, 77, 96, 98, 96, 131, 94, 151, 91, 164, 85, 171, 75, 171, 71, 162, 74, 146, 84, 130, 95, 119, 106, 113]));
    cb("z", new Uint8Array([29, 62, 35, 62, 43, 62, 63, 62, 87, 62, 110, 62, 125, 62, 134, 62, 138, 62, 136, 63, 122, 68, 103, 77, 85, 91, 70, 107, 59, 120, 50, 132, 47, 138, 43, 143, 41, 148, 42, 151, 53, 155, 80, 157, 116, 158, 146, 158, 163, 158]));
    cb("SHIFT", new Uint8Array([100, 160, 100, 50]));
  } else if (mode === exports.INPUT_MODE_NUM) {
    cb("0", new Uint8Array([82, 50, 76, 50, 67, 50, 59, 50, 50, 51, 43, 57, 38, 68, 34, 83, 33, 95, 33, 108, 34, 121, 42, 136, 57, 148, 72, 155, 85, 157, 98, 155, 110, 149, 120, 139, 128, 127, 134, 119, 137, 114, 138, 107, 138, 98, 138, 88, 138, 77, 137, 71, 134, 65, 128, 60, 123, 58]));
    cb("1", new Uint8Array([100, 50, 100, 160]));
    cb("2", new Uint8Array([40, 79, 46, 74, 56, 66, 68, 58, 77, 49, 87, 45, 100, 45, 111, 46, 119, 50, 128, 58, 133, 71, 130, 88, 120, 106, 98, 128, 69, 150, 50, 162, 42, 167, 43, 168, 58, 169, 78, 170, 93, 170, 103, 170, 109, 170]));
    cb("3", new Uint8Array([47, 65, 51, 60, 57, 56, 65, 51, 74, 47, 84, 45, 93, 45, 102, 45, 109, 46, 122, 51, 129, 58, 130, 65, 127, 74, 120, 85, 112, 92, 107, 96, 112, 101, 117, 105, 125, 113, 128, 123, 127, 134, 122, 145, 108, 156, 91, 161, 70, 163, 55, 163]));
    cb("4", new Uint8Array([37, 58, 37, 60, 37, 64, 37, 69, 37, 75, 37, 86, 37, 96, 37, 105, 37, 112, 37, 117, 37, 122, 37, 126, 37, 128, 38, 129, 40, 129, 45, 129, 48, 129, 53, 129, 67, 129, 85, 129, 104, 129, 119, 129, 129, 129, 136, 129]));
    cb("5", new Uint8Array([142, 60, 119, 60, 79, 60, 45, 60, 37, 64, 37, 86, 37, 103, 47, 107, 66, 106, 81, 103, 97, 103, 116, 103, 129, 108, 131, 130, 122, 152, 101, 168, 85, 172, 70, 172, 59, 172]));
    cb("6", new Uint8Array([136, 54, 135, 49, 129, 47, 114, 47, 89, 54, 66, 66, 50, 81, 39, 95, 35, 109, 34, 128, 38, 145, 52, 158, 81, 164, 114, 157, 133, 139, 136, 125, 132, 118, 120, 115, 102, 117, 85, 123]));
    cb("7", new Uint8Array([47, 38, 48, 38, 53, 38, 66, 38, 85, 38, 103, 38, 117, 38, 125, 38, 129, 38, 134, 41, 135, 47, 135, 54, 135, 66, 131, 93, 124, 126, 116, 149, 109, 161, 105, 168]));
    cb("8", new Uint8Array([122, 61, 102, 61, 83, 61, 60, 61, 47, 62, 45, 78, 58, 99, 84, 112, 105, 122, 118, 134, 121, 149, 113, 165, 86, 171, 59, 171, 47, 164, 45, 144, 50, 132, 57, 125, 67, 117, 78, 109, 87, 102, 96, 94, 105, 86, 113, 85]));
    cb("9", new Uint8Array([122, 58, 117, 55, 112, 51, 104, 51, 95, 51, 86, 51, 77, 51, 68, 51, 60, 51, 54, 56, 47, 64, 46, 77, 46, 89, 46, 96, 51, 103, 64, 109, 74, 110, 83, 110, 94, 107, 106, 102, 116, 94, 124, 84, 127, 79, 128, 78, 128, 94, 128, 123, 128, 161, 128, 175]));
  } else if (mode === exports.INPUT_MODE_SYM) {
    cb("?", new Uint8Array([36, 69, 39, 68, 44, 65, 52, 60, 61, 56, 70, 51, 78, 47, 87, 46, 96, 46, 108, 46, 121, 49, 128, 56, 129, 63, 126, 76, 119, 91, 108, 105, 103, 114, 98, 118, 93, 124, 91, 131, 91, 143, 91, 155, 91, 163]));
    cb(".", new Uint8Array([105, 158, 97, 157, 80, 150, 60, 140, 44, 127, 34, 110, 31, 97, 31, 84, 35, 74, 48, 59, 78, 55, 115, 57, 145, 70, 159, 89, 162, 112, 160, 138, 153, 153, 144, 164, 125, 170, 103, 171]));
    cb(",", new Uint8Array([140, 44, 139, 45, 138, 46, 137, 47, 135, 49, 132, 51, 127, 55, 123, 58, 117, 62, 112, 67, 105, 71, 100, 77, 93, 82, 86, 86, 80, 91, 74, 96, 69, 101, 64, 105, 60, 108, 57, 112, 53, 115, 51, 117, 49, 119, 48, 121, 47, 122, 46, 122, 46, 123]));
    cb("'", new Uint8Array([100, 50, 100, 160]));
    cb("`", new Uint8Array([111, 170, 110, 168, 107, 163, 105, 154, 100, 145, 93, 133, 82, 120, 72, 107, 63, 96, 55, 86, 49, 79, 45, 74, 40, 70, 38, 67, 36, 65, 35, 63, 37, 64, 42, 68, 55, 78, 71, 90, 89, 106, 107, 122, 121, 136, 130, 145, 137, 151, 141, 156]));
    cb("-", new Uint8Array([34, 63, 36, 63, 40, 63, 46, 63, 54, 63, 63, 63, 72, 63, 82, 63, 92, 63, 103, 63, 113, 63, 124, 63, 132, 63, 139, 63, 143, 63, 145, 63, 147, 63, 149, 63, 152, 63]));
    cb("_", new Uint8Array([34, 84, 36, 84, 40, 84, 47, 84, 56, 84, 67, 84, 81, 84, 95, 84, 108, 84, 120, 84, 131, 84, 139, 84, 146, 84, 149, 84, 151, 84, 154, 84, 155, 83, 154, 81, 150, 78, 143, 74, 130, 71, 111, 68, 90, 65, 73, 64, 60, 64, 51, 64, 46, 64]));
    cb("\"", new Uint8Array([24, 168, 24, 158, 28, 132, 33, 102, 37, 82, 41, 66, 46, 54, 50, 47, 54, 46, 60, 49, 67, 64, 73, 88, 80, 114, 87, 138, 95, 149, 109, 145, 123, 128, 130, 108, 135, 87, 136, 70, 136, 57, 136, 50]));
    cb(":", new Uint8Array([24, 62, 24, 63, 24, 68, 26, 73, 27, 80, 29, 88, 31, 94, 33, 101, 35, 108, 37, 114, 39, 121, 39, 127, 39, 131, 39, 134, 39, 135, 39, 133, 39, 130, 41, 125, 45, 114, 48, 100, 51, 89, 52, 81, 52, 74, 52, 70, 52, 67, 52, 63, 52, 60, 52, 57]));
    cb(";", new Uint8Array([142, 58, 139, 59, 136, 61, 131, 65, 124, 71, 116, 79, 105, 87, 94, 98, 82, 109, 70, 121, 58, 132, 49, 141, 40, 149, 33, 156, 28, 160, 24, 164, 23, 166, 22, 164, 25, 156, 33, 138, 47, 111, 66, 81, 82, 58, 95, 41, 103, 30]));
    cb("(", new Uint8Array([72, 51, 70, 51, 68, 51, 66, 54, 63, 56, 61, 59, 58, 61, 56, 65, 54, 70, 51, 74, 49, 79, 47, 83, 45, 87, 44, 92, 44, 94, 44, 96, 44, 99, 44, 101, 44, 104, 44, 107, 44, 114, 44, 120, 46, 127, 49, 135, 52, 141, 56, 145]));
    cb(")", new Uint8Array([18, 42, 21, 43, 24, 45, 28, 47, 32, 50, 37, 53, 40, 58, 44, 62, 46, 69, 48, 76, 50, 81, 52, 85, 53, 90, 53, 94, 53, 98, 53, 103, 53, 106, 53, 111, 53, 119, 53, 129, 52, 137, 50, 142, 47, 146]));
    cb("[", new Uint8Array([121, 138, 118, 143, 114, 146, 110, 149, 105, 152, 98, 152, 91, 152, 83, 152, 77, 152, 67, 151, 59, 146, 52, 138, 47, 131, 47, 124, 48, 118, 57, 115, 64, 115, 67, 113, 64, 106, 59, 95, 53, 85, 48, 80, 47, 74, 47, 64, 53, 57, 65, 56, 83, 56, 99, 61]));
    cb("]", new Uint8Array([36, 136, 42, 140, 54, 145, 70, 149, 84, 151, 98, 149, 109, 143, 113, 135, 113, 127, 104, 115, 87, 105, 75, 103, 76, 98, 87, 84, 96, 67, 100, 54, 97, 48, 90, 45, 76, 45, 60, 47, 44, 52]));
    cb("<", new Uint8Array([154, 122, 151, 122, 149, 121, 147, 118, 144, 116, 139, 114, 133, 112, 126, 110, 118, 107, 108, 105, 97, 102, 86, 97, 75, 93, 64, 90, 56, 88, 49, 85, 46, 84, 41, 82, 40, 80, 47, 76, 63, 69, 86, 59, 106, 50, 121, 44, 128, 40]));
    cb(">", new Uint8Array([28, 115, 31, 115, 38, 113, 48, 110, 57, 107, 68, 103, 79, 98, 90, 94, 98, 92, 104, 90, 111, 88, 117, 85, 122, 83, 125, 81, 127, 80, 129, 80, 132, 80, 130, 78, 126, 75, 120, 72, 110, 69, 98, 66, 85, 63, 72, 60, 59, 57, 45, 53, 36, 49, 30, 46]));
    cb("@", new Uint8Array([82, 50, 76, 50, 67, 50, 59, 50, 50, 51, 43, 57, 38, 68, 34, 83, 33, 95, 33, 108, 34, 121, 42, 136, 57, 148, 72, 155, 85, 157, 98, 155, 110, 149, 120, 139, 128, 127, 134, 119, 137, 114, 138, 107, 138, 98, 138, 88, 138, 77, 137, 71, 134, 65, 128, 60, 123, 58]));
    cb("#", new Uint8Array([23, 70, 23, 76, 26, 85, 30, 97, 36, 112, 40, 129, 45, 142, 49, 152, 53, 158, 59, 161, 67, 155, 78, 130, 84, 98, 88, 76, 90, 68, 96, 62, 102, 61, 108, 61, 119, 67, 126, 80, 131, 101, 135, 129, 136, 152]));
    cb("$", new Uint8Array([159, 72, 157, 70, 155, 68, 151, 66, 145, 63, 134, 60, 121, 58, 108, 56, 96, 55, 83, 55, 73, 55, 64, 56, 57, 60, 52, 65, 49, 71, 49, 76, 50, 81, 55, 87, 71, 94, 94, 100, 116, 104, 131, 108, 141, 114, 145, 124, 142, 135, 124, 146, 97, 153, 70, 157, 52, 158]));
    cb("%", new Uint8Array([31, 39, 39, 54, 51, 78, 60, 97, 62, 107, 59, 118, 47, 118, 44, 109, 46, 92, 56, 73, 69, 62, 92, 61, 115, 70, 125, 90, 126, 110, 125, 122, 118, 127, 111, 127, 105, 124, 105, 115, 105, 97, 109, 75, 117, 56, 124, 45]));
    cb("^", new Uint8Array([28, 175, 28, 168, 33, 156, 37, 142, 41, 128, 46, 111, 51, 95, 58, 82, 62, 75, 68, 68, 74, 57, 81, 49, 88, 44, 93, 44, 102, 56, 113, 79, 118, 95, 123, 110, 131, 130, 135, 146, 136, 158]));
    cb("&", new Uint8Array([122, 61, 102, 61, 83, 61, 60, 61, 47, 62, 45, 78, 58, 99, 84, 112, 105, 122, 118, 134, 121, 149, 113, 165, 86, 171, 59, 171, 47, 164, 45, 144, 50, 132, 57, 125, 67, 117, 78, 109, 87, 102, 96, 94, 105, 86, 113, 85]));
    cb("*", new Uint8Array([35, 61, 41, 62, 53, 68, 72, 78, 91, 91, 103, 99, 113, 103, 119, 106, 124, 107, 131, 107, 139, 107, 150, 107, 161, 104, 166, 97, 166, 89, 165, 78, 162, 70, 158, 61, 151, 54, 144, 51, 132, 51, 115, 57, 98, 66, 82, 78, 65, 89, 52, 100, 44, 109]));
    cb("!", new Uint8Array([100, 160, 100, 50]));
    cb("~", new Uint8Array([133, 40, 133, 48, 133, 65, 133, 87, 133, 105, 132, 116, 128, 125, 124, 133, 120, 140, 114, 146, 107, 148, 101, 147, 91, 139, 82, 126, 74, 108, 70, 91, 70, 82, 70, 75, 70, 65, 68, 57, 62, 51, 57, 50, 49, 57, 41, 76, 36, 96, 33, 114, 33, 132]));
    cb("+", new Uint8Array([151, 41, 146, 46, 133, 55, 116, 71, 101, 87, 87, 98, 74, 105, 63, 109, 54, 110, 43, 106, 36, 94, 36, 80, 36, 68, 42, 60, 60, 58, 91, 64, 115, 77, 129, 88, 139, 99, 144, 106]));
    cb("=", new Uint8Array([34, 46, 47, 46, 70, 46, 87, 46, 96, 46, 101, 46, 104, 46, 102, 50, 96, 58, 80, 78, 62, 100, 49, 117, 40, 127, 43, 132, 61, 132, 84, 132, 99, 132]));
    cb("\\", new Uint8Array([25, 38, 26, 40, 30, 43, 35, 48, 43, 54, 54, 63, 65, 74, 76, 85, 87, 96, 98, 108, 108, 121, 116, 131, 123, 138, 127, 144, 131, 148, 134, 152, 136, 155]));
    cb("|", new Uint8Array([66, 146, 66, 144, 66, 140, 66, 134, 66, 125, 66, 114, 66, 102, 66, 92, 66, 83, 66, 77, 66, 71, 66, 67, 66, 62, 66, 58, 66, 53, 66, 49, 66, 48, 66, 46, 64, 42, 61, 41, 58, 42, 54, 47, 51, 55, 46, 67, 40, 81, 37, 93, 34, 102, 30, 109, 28, 116]));
    cb("/", new Uint8Array([24, 173, 26, 171, 30, 166, 36, 158, 44, 148, 53, 137, 63, 126, 73, 115, 82, 104, 91, 95, 99, 87, 105, 80, 112, 74, 117, 70, 122, 65, 125, 61, 127, 60, 129, 57, 133, 53, 136, 50, 137, 47]));
  }
  if (mode === exports.INPUT_MODE_ALPHA || mode === exports.INPUT_MODE_NUM) {
    cb("\b", new Uint8Array([183, 103, 182, 103, 180, 103, 176, 103, 169, 103, 159, 103, 147, 103, 133, 103, 116, 103, 101, 103, 85, 103, 73, 103, 61, 103, 52, 103, 38, 103, 34, 103, 29, 103, 27, 103, 26, 103, 25, 103, 24, 103]));
    cb(" ", new Uint8Array([39, 118, 40, 118, 41, 118, 44, 118, 47, 118, 52, 118, 58, 118, 66, 118, 74, 118, 84, 118, 94, 118, 104, 117, 114, 116, 123, 116, 130, 116, 144, 116, 149, 116, 154, 116, 158, 116, 161, 116, 163, 116]));
  }
};

exports.input = function(options) {
  options = options||{};
  let input_mode = exports.INPUT_MODE_ALPHA;
  var text = options.text;
  if ("string"!=typeof text) text="";

  function setupStrokes() {
    Bangle.strokes = {};
    exports.getStrokes(input_mode, (id,s) => Bangle.strokes[id] = Unistroke.new(s) );
  }
  setupStrokes();

  var flashToggle = false;
  const R = Bangle.appRect;
  var Rx1;
  var Rx2;
  var Ry1;
  var Ry2;
  let flashInterval;
  let shift = false;
  let lastDrag;

  function findMarker(strArr) {
    if (strArr.length == 0) {
      Rx1 = 4;
      Rx2 = 6*4;
      Ry1 = 8*4 + R.y;
      Ry2 = 8*4 + 3 + R.y;
    } else if (strArr.length <= 4) {
      Rx1 = (strArr[strArr.length-1].length)%7*6*4 + 4 ;
      Rx2 = (strArr[strArr.length-1].length)%7*6*4 + 6*4;
      Ry1 = (strArr.length)*(8*4) + Math.floor((strArr[strArr.length-1].length)/7)*(8*4) + R.y;
      Ry2 = (strArr.length)*(8*4) + Math.floor((strArr[strArr.length-1].length)/7)*(8*4) + 3 + R.y;
    } else {
      Rx1 = (strArr[strArr.length-1].length)%7*6*4 + 4 ;
      Rx2 = (strArr[strArr.length-1].length)%7*6*4 + 6*4;
      Ry1 = (4)*(8*4) + Math.floor((strArr[strArr.length-1].length)/7)*(8*4) + R.y;
      Ry2 = (4)*(8*4) + Math.floor((strArr[strArr.length-1].length)/7)*(8*4) + 3 + R.y;
    }
    //print(Rx1,Rx2,Ry1, Ry2);
    return {x:Rx1,y:Ry1,x2:Rx2,y2:Ry2};
  }

  function draw(noclear) {
    g.reset();
    var l = g.setFont("6x8:4").wrapString(text+' ', R.w-8);
    if (!l) l = [];
    //print(text+':');
    //print(l);
    if (!noclear) (flashToggle?(g.fillRect(findMarker(l))):(g.clearRect(findMarker(l))));
    if (l.length>4) l=l.slice(-4);
    g.drawString(l.join("\n"),R.x+4,R.y+4);
  }

  /*
  // This draws a big image to use in the README
  (function() {
    E.defrag();
    var b = Graphics.createArrayBuffer(500,420,1,{msb:true});
    var n=0;
    exports.getStrokes((id,s) => {
      var x = n%6;
      var y = (n-x)/6;
      s = b.transformVertices(s, {scale:0.55, x:x*85-20, y:y*85-20});
      b.fillCircle(s[0],s[1],3);
      b.drawPoly(s);
      n++;
    });
    b.dump();
  })()
  */

  function show() {
    if (flashInterval) clearInterval(flashInterval);
    flashInterval = undefined;

    g.reset();
    g.setFont("6x8");
    g.clearRect(R);
    let n=0;
    exports.getStrokes(input_mode, (id,s) => {
      let x = n%6;
      let y = (n-x)/6;
      s = g.transformVertices(s, {scale:0.16, x:R.x+x*30-4, y:R.y+y*30-4});
      g.fillRect(s[0]-1,s[1]-2,s[0]+1,s[1]+1);
      g.setColor("#f00").drawPoly(s);
      switch(id) {
        case 'SHIFT':
          g.setBgColor(0).setColor("#00f").drawImage(atob("CgqBAfP4fh8D4fh+H4fh+HA="), R.x+x*30+20, R.y+y*30+20);
          break;
        case '\b':
        case ' ':
          break;
        default:
          g.setColor("#00f").drawString(shift ? id.toUpperCase() : id, R.x+x*30+20, R.y+y*30+20);
      }
      n++;
    });
  }

  function isInside(rect, e) {
    return e.x>=rect.x && e.x<rect.x+rect.w
          && e.y>=rect.y && e.y<=rect.y+rect.h;
  }

  function isStrokeInside(rect, stroke) {
    for(let i=0; i < stroke.length; i+=2) {
      if (!isInside(rect, {x: stroke[i], y: stroke[i+1]})) {
        return false;
      }
    }
    return true;
  }

  function strokeHandler(o) {
    //print(o);
    if (!flashInterval)
      flashInterval = setInterval(() => {
        flashToggle = !flashToggle;
        draw(false);
      }, 1000);
    if (o.stroke!==undefined && o.xy.length >= 6 && isStrokeInside(R, o.xy)) {
      var ch = o.stroke;
      if (ch=="\b") text = text.slice(0,-1);
      else if (ch==="SHIFT") { shift=!shift; Bangle.drawWidgets(); }
      else text += shift ? ch.toUpperCase() : ch;
    }
    lastDrag = undefined;
    g.clearRect(R);
    flashToggle = true;
    draw(false);
  }

  // Switches between alphabetic and numeric input
  function cycleInput() {
    input_mode++;
    if (input_mode > exports.INPUT_MODE_SYM) input_mode = 0;
    shift = false;
    setupStrokes();
    show();
    Bangle.drawWidgets();
  }

  Bangle.on('stroke',strokeHandler);
  g.reset().clearRect(R);
  show();
  draw(false);

  // Create Widget to switch between alphabetic and numeric input
  WIDGETS.kbswipe={
    area:"tl",
    width: 36, // 3 chars, 6*2 px/char
    draw: function() {
      g.reset();
      g.setFont("6x8:2x3");
      g.setColor("#f00");
      if (input_mode === exports.INPUT_MODE_ALPHA) {
        g.drawString(shift ? "ABC" : "abc", this.x, this.y);
      } else if (input_mode === exports.INPUT_MODE_NUM) {
        g.drawString("123", this.x, this.y);
      } else if (input_mode === exports.INPUT_MODE_SYM) {
        g.drawString("?:$", this.x, this.y);
      }
    }
  };

  return new Promise((resolve,reject) => {
    Bangle.setUI({mode:"custom", drag:e=>{
      "ram";
      if (isInside(R, e)) {
        if (lastDrag) g.reset().setColor("#f00").drawLine(lastDrag.x,lastDrag.y,e.x,e.y);
        lastDrag = e.b ? e : 0;
      }
    },touch:(n,e) => {
      if (WIDGETS.kbswipe && isInside({x: WIDGETS.kbswipe.x, y: WIDGETS.kbswipe.y, w: WIDGETS.kbswipe.width, h: 24}, e)) {
        // touch inside widget
        cycleInput();
      } else if (isInside(R, e)) {
        // touch inside app area
        show();
      }
    }, back:()=>{
      delete WIDGETS.kbswipe;
      Bangle.removeListener("stroke", strokeHandler);
      if (flashInterval) clearInterval(flashInterval);
      Bangle.setUI();
      g.clearRect(Bangle.appRect);
      resolve(text);
    }});
  });
};
