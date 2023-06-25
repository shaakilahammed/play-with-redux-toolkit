const { configureStore } = require('@reduxjs/toolkit');
const videoReducer = require('../features/videos/videoSlice');
const relatedVideosReducer = require('../features/videos/relatedVideosSlice');
const { createLogger } = require('redux-logger');

const logger = createLogger();

const store = configureStore({
  reducer: {
    video: videoReducer,
    relatedVideos: relatedVideosReducer,
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
});

module.exports = store;
