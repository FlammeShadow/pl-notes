const supportLanguages = ["zh-CN", "en-US"];

const langTranslation = {
    "zh-CN": "简体中文",
    "en-US": "English"
}

let languageChapters = {
    "zh-CN": [], "en-US": []
};

let currentLang;

for (let language of supportLanguages) {
    if (document.baseURI.includes(`/${language}/`)) {
        currentLang = language;
        break;
    }
}

let getLanguageCodeFromPath = (path) => {
    for (let language of supportLanguages) {
        if (path.includes(`/${language}/`)) {
            return language;
        }
    }
}

let tryPush = (child, item) => {
    if (!child?.getAttribute("href")) return;
    let code = getLanguageCodeFromPath(child?.getAttribute("href"));
    languageChapters[code].push(item);
}

let hideEmptyChapterItems = () => {
    let chapterItems = Array.from(document.getElementsByClassName("chapter-item expanded"));

    chapterItems.findIndex(item => {
        if (item.classList.contains("affix")) { return; }

        let child = item.firstElementChild;

        if (child?.nextSibling == null) {
            if (item.previousElementSibling?.classList.contains("part-title")) {
                tryPush(child, item.previousElementSibling);
                item.previousElementSibling.style.display = "none";
            }
            tryPush(child, item);
            item.style.display = "none";
        }
    });
}

let getLanguageChapter = (lang) => {
    let chapterItems = Array.from(document.getElementsByClassName("chapter-item expanded affix"));
    for (let item of chapterItems) {
        if (item.textContent == lang) {
            return item;
        }
    }
    return cur;
}

let cur = getLanguageChapter(currentLang)

let displayChapterItemsOfcurrentLang = () => {
    let items = languageChapters[currentLang];
    let first = items[0];
    if (first) {
       cur.insertAdjacentElement('afterend', first);
    }
    for (let item of items) {
        first = first.insertAdjacentElement('afterend', item);
        if (!item.innerHTML?.includes("index.html")) {
            item.style.display = "block";
        }
    }
    cur.style.fontWeight = "bold";
    // console.log(langTranslation[cur.textContent]);
    cur.innerHTML = cur.innerHTML.replace(cur.textContent + "</a>", `${langTranslation[cur.textContent]} (Current)</a>`);
}

let enableNoOrder = () => {
    let items = languageChapters[currentLang];
    for (let item of items) {
        if (item.classList.value.includes("chapter-item expanded")) {
           let i = item.textContent.search(' ');
           let order = item.textContent.slice(0, i);
           item.firstElementChild.firstElementChild.remove();
           // console.log(order.length);
           item.firstElementChild.textContent = ' '.repeat((order.length - 2) * 2) + item.textContent;
           item.firstElementChild.style.whiteSpace = "pre-wrap";
        }
    }
}

let displayTranslationOfLangCode = () => {
    for (let lang of supportLanguages) {
        if (lang == currentLang) continue;
        let item = getLanguageChapter(lang);
        item.innerHTML = item.innerHTML.replace(item.textContent + "</a>", `${langTranslation[item.textContent]}</a>`);
    }
}

document.addEventListener('DOMContentLoaded', hideEmptyChapterItems);
document.addEventListener("DOMContentLoaded", displayChapterItemsOfcurrentLang);
document.addEventListener("DOMContentLoaded", enableNoOrder);
document.addEventListener("DOMContentLoaded", displayTranslationOfLangCode);
