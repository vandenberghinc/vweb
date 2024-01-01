const vweb = require("../js/backend/vweb.js");
const {vlib} = require("../js/backend/vinc.js");
const {Text, Image, VStack, HStack, Page, CodeBlock} = vweb.PDF;

const pdf = vweb.PDF.PDF()
    .margin(25, 0, 0, 0)

const ipsum = (count = 1) => {
    let str = "";
    for (let i = 0; i < count; i++) {
        str += i + " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n";
    }
    return str + "<END>";
}   

const code_data = (count = 1) => {
    let str = "";
    for (let i = 0; i < count; i++) {
        str += "PDF.CodeBlock = function CodeBlock(...args) { return new PDF.CodeBlockElement(...args); };\n";
    }
    return str;
}   

// Array of words.
// const hstack = HStack();
// pdf.append(hstack);
// console.log(ipsum(2).split(" "))
// ipsum(2).split(" ").iterate((item) => {
//     item.split("\n").iterate((sub_item) => {
//         hstack.append(
//             Text(sub_item).margin_right(3)
//         )
//     })
// })

pdf.append(

    // Center/trailing vertical.
    // HStack(
    //     Text("Hello")
    //         .font_size(20)
    //         .background("red"),
    //     Text("Hello")
    //         .font_size(10)
    //         .background("blue"),
    //     Text("Hello")
    //         .font_size(15)
    //         .background("blue"),
    // )
    // .center_vertical()

    // Codeblock.
    // CodeBlock("js", code_data(120*2)),
    // Text(ipsum())

    // Special chars that will cause wrong height calcs when found in last line.
    // HStack(Text(ipsum()))
    //     .background("blue")

    // String with newlines.
    // Text("Hello\nWorld!"),

    // Very long string without spaces.
    // Text(String.random(400))

    // Text("Hello")
    //     .background("blue"),
    // Text("World")
    //     .background("green"),

    // Auto wrap test on hstack and correct resume y.
    // HStack(
    //     Text(ipsum())
    //         // .color("green")
    //         // .width("50%")
    //         // .background("green"),
    //     ,
    //     Text(ipsum())
    //         // .width("50%")
    //         // .background("red"),
    // ),

    // Backgroud opacity + borders.
    // Text(ipsum())
    //     .font_size(12)
    //     .background("#20925830")
    //     .border_radius(10)
    //     .border_color("#209258")
    //     .color("#209258")
    //     .border_width(5)
    //     ,
    // Text(ipsum())
    //     // .margin_top(20)
    //     .font_size(11)
    //     .background("red")
    //     ,

    // Multi page texts with styling and background.
    // Text("FIRST: " + ipsum(20))
    //     .color("blue")
    //     .background("green"),
    // Text("SECOND: " + ipsum(20))
    //     .background("blue")
    //     .color("red"),


    // Text("FIRST: " + ipsum(20))
    //     .font_size(10)
    //     .color("blue")
    //     .background("green"),
    // VStack(
    //     Text("FIRST: " + ipsum(20))
    //     .color("blue")
    //     .background("green"),
    //     Text("SECOND: " + ipsum(20))
    //         .background("blue")
    //         .color("red"),
    // ),
    // VStack(
    //     Text("THIRD: " + ipsum(20))
    //         .color("blue")
    //         .background("yellow"),
    //     Text("FOURTH: " + ipsum(20))
    //         .color("green")
    //         .background("purple"),
    // ),

    // Image y wrap.
    // Text(ipsum(9))
    //     .color("blue")
    //     .background("green"),
    // Image("/Users/administrator/persistance/private/dev/libris/libris/web/static/home/image.1.png")
    //     .width(400)
    //     .height(400)

    // Multiple wrapping vstacks.
    // VStack(
    //     Text(ipsum(9))
    //     .color("blue")
    //     .background("green"),
    //     Image("/Users/administrator/persistance/private/dev/libris/libris/web/static/home/image.1.png")
    //     .width(400)
    //     .height(400)
    //     .background("blue")
    // ),
    // VStack(
    //     Text(ipsum(9))
    //     .color("blue")
    //     .background("green"),
    //     Image("/Users/administrator/persistance/private/dev/libris/libris/web/static/home/image.1.png")
    //     .width(400)
    //     .height(400)
    //     .background("blue")
    // ),
);
pdf.save("/Users/administrator/Desktop/pdf.pdf");

