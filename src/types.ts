export type CssOperationArgs = {
	iframeContent: Document;
	dataAttribute?: string;
	style?: string;
}

export type PackOptionItem = {
	label: string;
	css: string;
};

export type PackOptionObject = {
	[name: string]: string;
};
export type PackOptions = PackOptionItem[] | PackOptionObject;

export type Condition<S extends string> = (state: {[name in S]: string}) => boolean;

export type PackedThemePart<S extends string> = {
	options: PackOptionItem[];
	condition?: Condition<S>;
}

export type ThemePackItem<S extends string> = PackedThemePart<S> | string | undefined;
export type ThemePack<S extends string> = {
	[property in S]: ThemePackItem<S>[];
}

export type Config<S extends string> = {
	pack: ThemePack<S>;
	icon: string;
	usePreview?: boolean;
	labelForClear?: string;
	sortFunction?: (a: string, b: string) => number;
	styles: {
		preview: string;
		iframe: string;
	};
}

export type Link = {
	id: string;
	title: string;
	active?: boolean;
	right?: any;
	onClick?: () => void;
}
export type LinksContent = Link[];

export type CSSManipulationData = Record<string, Partial<PackOptionItem> | undefined>;
export type AddonState = Promise<CSSManipulationData> | CSSManipulationData;
