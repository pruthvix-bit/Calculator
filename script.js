const historyList = document.getElementById("historyList");

function addHistory(calculation) {
    if (historyList.querySelector("p")) {
        historyList.innerHTML = "";
    }

    const item = document.createElement("div");
    item.textContent = calculation;

    historyList.prepend(item);
}