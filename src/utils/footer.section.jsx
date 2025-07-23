

export const footerSecction = (currentPage, pageCount) => {
    return {
        text: `${currentPage} De ${pageCount}`,
        margin: [0, 15],
        style: {
            bold: true,
            alignment: 'center',
            fontSize: 12
        }
    }
}