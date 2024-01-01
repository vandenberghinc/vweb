// Author: Daan van den Bergh
// Copyright: © 2022 Daan van den Bergh.

// Vars.
let body = document.getElementById("body");

// Resize event.
body.onresize = (event) => {
    vweb_rebuild();
}

// console.log("T:", vweb_cookie("T"));
// console.log("UserID:", vweb_cookie("UserID"));
// console.log("UserActivated:", vweb_cookie("UserActivated"));
// console.log("UserName:", vweb_cookie("UserName"));
// console.log("UserFirstName:", vweb_cookie("UserFirstName"));
// console.log("UserLastName:", vweb_cookie("UserLastName"));
// console.log("UserEmail:", vweb_cookie("UserEmail"));
//
