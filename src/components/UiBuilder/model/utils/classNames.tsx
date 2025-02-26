export type Mods = Record<string, boolean | string | undefined>

export function classNames(
	cls: string,
	additional: Array<string | undefined> = [],
	mods: Mods = {}
): string {
	const filteredAdditional = additional.filter(Boolean)
	const filteredMods = Object.entries(mods)
		.filter(([className, value]) => Boolean(value))
		.map(([className]) => className)

	return [cls, ...filteredAdditional, ...filteredMods].join(' ')
}
