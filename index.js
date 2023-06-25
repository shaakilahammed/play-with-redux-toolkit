const store = require('./rtk/app/store');
const {
  fetchRelatedVideos,
} = require('./rtk/features/videos/relatedVideosSlice');
const { fetchVideo } = require('./rtk/features/videos/videoSlice');

store.subscribe(() => {});

(async () => {
  try {
    const { payload } = await store.dispatch(fetchVideo());
    const searchString = payload?.tags
      ?.map((tag) => `tags_like=${tag}`)
      .join('&');
    const { payload: relatedVideos } = await store.dispatch(
      fetchRelatedVideos(searchString)
    );
  } catch (error) {
    console.log(error);
  }
})();
// store.dispatch(fetchVideo()).then((action) => {
//   const data = action.payload;
//   const searchString = data?.tags?.map((tag) => `tags_like=${tag}`)?.join('&');
//   store.dispatch(fetchRelatedVideos(searchString));
// });

// (async () => {
//     try {
//     const action = await store.dispatch(fetchVideo());
//     const data = action.payload;
//     const searchString = data?.tags?.map((tag) => tags_like=${tag})?.join('&');
//     await store.dispatch(fetchRelatedVideos(searchString));
//     } catch (error) {
//     // Handle error
//     console.error(error);
//     }
//     })();
