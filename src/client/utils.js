export const sortByDesc = (a, b, orderBy) => {
    let aValue = a[orderBy];
    let bValue = b[orderBy];

    if (!isNaN(aValue)) {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
    }

    if (bValue < aValue) {
        return -1;
    }
    if (bValue > aValue) {
        return 1;
    }
    return 0;
}

export const sortStable = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

export const getSorting = (order, orderBy) => {
    const prefix = order === 'desc' ? 1 : -1;
    return (a, b) => prefix * sortByDesc(a, b, orderBy);
}
