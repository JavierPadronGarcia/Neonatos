function getAveragePunctuation(items) {
    const allPunctuations = items.map(item => parseFloat(item.gradeValue));
    const sum = allPunctuations.reduce((acc, value) => acc + value, 0);
    const average = sum / items.length;

    return average.toFixed(2);
}

function getPageNumber(pageIndex) {
    if (pageIndex == null) {
        return ''
    }

    const pageNumber = pageIndex + 1

    return pageNumber
}

function getTotalPages(pages) {
    if (!pages) {
        return ''
    }

    return pages.length
}