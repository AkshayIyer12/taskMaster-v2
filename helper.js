const sanitize = (form) => {
	let keys = Object.keys(form)
	let value = keys.filter((k) => form[k] !== '')
	return keys.length === value.length ? true : false
}

module.exports = {
	sanitize
}