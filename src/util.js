


const getMapFromArray = data => data.reduce((acc, item) => {
    acc[item.kidId] = {name: item.name, nickname: item.nickname};
    return acc;
}, {})

export { kidInfo2Csv, getMapFromArray };