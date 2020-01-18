import UserEffects from './user/effects';
import GlobalEffects from './global/effects';
import CreatePostEffects from './createPost/effects';

export default [
    ...UserEffects,
    ...GlobalEffects,
    ...CreatePostEffects
];