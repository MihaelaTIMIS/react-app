
// https://html-online.com/articles/get-url-parameters-javascript/
export const getUrlVars = () => {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}


