// Author: Daan van den Bergh
// Copyright: © 2022 Daan van den Bergh.

// Vars.
let body = document.getElementById("body");

// Resize event.
body.onresize = (event) => {
    vweb_rebuild();
}

// console.log("T:", vweb_get_cookie("T"));
// console.log("UserID:", vweb_get_cookie("UserID"));
// console.log("UserActivated:", vweb_get_cookie("UserActivated"));
// console.log("UserName:", vweb_get_cookie("UserName"));
// console.log("UserFirstName:", vweb_get_cookie("UserFirstName"));
// console.log("UserLastName:", vweb_get_cookie("UserLastName"));
// console.log("UserEmail:", vweb_get_cookie("UserEmail"));
//
