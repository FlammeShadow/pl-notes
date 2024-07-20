let hideEmptyChapterItems = () => {
    let chapterItems = document.getElementsByClassName("chapter-item expanded");

    Array.from(chapterItems).forEach(item => {
        let text = item.firstChild.textContent;
        if (text.match(/[1-9]*\./)) {
            item.style.display = "none";
        }
    });
}

hideEmptyChapterItems();

document.addEventListener('DOMContentLoaded', hideEmptyChapterItems);
