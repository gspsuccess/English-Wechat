function arrayColumn(arr, column) {
	return arr.map(x => x[column])
}

export default ({
	arrayColumn: arrayColumn
})