import {StoryContext, StoryFn as StoryFunction} from '@storybook/addons';

export const withThemepack = (StoryFn: StoryFunction, context: StoryContext) => {
	return StoryFn(context);
}
