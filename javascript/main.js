function renderItems(items, processType, elementID, processFunction) {
    let itemsMeta = [];
    let placeholder = "<div>";

    for (let i = 0; i < items.length; i++) {
        let title = items[i]["title"];
        let placeholderId = processType + "-" + title.replaceAll(" ", "-");
        placeholder += '<div class="itemContainer">' + '<p>' + title + '</p>' + 
        '<div class="actionButton" ' + '"id="' + placeholderId + '">'
        + processType + "</div>" + "</div>";
        console.log("placeholderId=", placeholderId);
        console.log("title=", title);
        itemsMeta.push({"id": placeholderId, "title": title});
    }
    // console.log("###################################################");
    // console.log("itemsMeta=", itemsMeta);
    // console.log("###################################################");
 
    //placeholder += "</div>";
    console.log("placeholder =", placeholder);
    document.getElementById(elementID).innerHTML = placeholder;

    for (let i=0; i < itemsMeta.length; i++) {
        console.log("itemsMeta[i][id]=", itemsMeta[i]["id"]);
        document.getElementById(itemsMeta[i]["id"]).addEventListener("click",
            processFunction);
    };

}

function apiCall(url, method) {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === this.DONE) {
        //console.log("###################################################");
        //console.log("this.responseText=",this.responseText);
        //console.log("###################################################");
            renderItems(JSON.parse(this.responseText)["pending_items"],
                "edit", "pendingItems", editItem);

            renderItems(JSON.parse(this.responseText)["done_items"],
                "delete", "doneItems", deleteItem);
        }
    });

    xhr.open(method, url);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('user-token', 'token');
    return xhr
};

function editItem() {
    let title = this.id.replaceAll("-"," ")
      .replace("edit ","");
    console.log("title=", title);
    let call = apiCall("/v1/item/edit", "POST");

    let json = {
        "title" : title,
        "status": "DONE"
    };
    call.send(JSON.stringify(json));
}

function deleteItem() {
    let title = this.id.replaceAll("-"," ")
      .replace("delete ","");
    let call = apiCall("/v1/item/delete", "POST");

    let json = {
        "title" : title,
        "status": "DONE"
    };
    call.send(JSON.stringify(json));
}

function getItems() {
    let call = apiCall("/v1/item/get", "GET");
    call.send();
}

getItems();

document.getElementById("create-button")
    .addEventListener("click", createItem);

function createItem() {
    let title = document.getElementById("name");
    let call = apiCall("/v1/item/create/" + title.value, "POST");
    call.send();
    document.getElementById("name").value = null;
}