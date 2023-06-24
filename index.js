const store = require('./rtk/app/store');
const { fetchVideo } = require('./rtk/features/videos/videoSlice');

store.subscribe(() => {});
store.dispatch(fetchVideo());
