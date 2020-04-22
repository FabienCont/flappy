import { configure } from '@storybook/vue';

import Vue from 'vue';

configure(require.context('../sources/debug/stories', true, /\.stories\.js$/), module);
