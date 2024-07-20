const supportLanguages = ["zh-CN", "en-US"];

let languageChapters = {
    "zh-CN": [], "en-US": []
};

let currentLanguage;

for (let language of supportLanguages) {
    if (document.baseURI.includes(`/${language}/`)) {
        currentLanguage = language;
        break;
    }
}

let hideEmptyChapterItems = () => {
    let chapterItems = Array.from(document.getElementsByClassName("chapter-item expanded"));

    chapterItems.findIndex(item => {
        if (item.classList.contains("affix")) { return; }

        let child = item.firstElementChild;

        if (child.nextSibling == null) {
            if (item.previousElementSibling.classList.contains("part-title")) {
                languageChapters[child.getAttribute("href").slice(3, 8)].push(item.previousElementSibling);
                item.previousElementSibling.style.display = "none";
            }
            languageChapters[child.getAttribute("href").slice(3, 8)].push(item);
            item.style.display = "none";
        }
    });
}

let getCurrentLanguageChapter = () => {
    let chapterItems = Array.from(document.getElementsByClassName("chapter-item expanded affix"));
    for (let item of chapterItems) {
        if (item.textContent == currentLanguage) {
            return item;
        }
    }
}

hideEmptyChapterItems();

let displayChapterItemsOfCurrentLanguage = () => {
    let items = languageChapters[currentLanguage];
    let first = items[0];
    if (first) {
       getCurrentLanguageChapter().insertAdjacentElement('afterend', first);
    }
    for (let item of items) {
        first = first.insertAdjacentElement('afterend', item);
        item.style.display = "inherit";
    }
}

document.addEventListener('DOMContentLoaded', hideEmptyChapterItems);
document.addEventListener("DOMContentLoaded", displayChapterItemsOfCurrentLanguage);