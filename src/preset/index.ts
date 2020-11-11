export function config(entry: any[] = []) {
	return [...entry, require.resolve('./addDecorator')];
}

export function managerEntries(entry: any[] = []) {
	return [...entry, require.resolve('../register')];
}
