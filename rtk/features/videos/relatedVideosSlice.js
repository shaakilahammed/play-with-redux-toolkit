const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const fetch = require('node-fetch');
const initialState = {
  loading: false,
  relatedVideos: [],
  error: '',
};

const fetchRelatedVideos = createAsyncThunk(
  'relatedVideos/fetchRelatedVideos',
  async (searchString) => {
    const response = await fetch(
      `http://localhost:9000/videos?${searchString}`
    );
    const relatedVideos = await response.json();

    const sortedRelatedVideos = relatedVideos?.sort((a, b) =>
      parseFloat(a.views) > parseFloat(b.views) ? -1 : 1
    );

    return sortedRelatedVideos;
  }
);

const relatedVideosSlice = createSlice({
  name: 'relatedVideos',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRelatedVideos.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchRelatedVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.relatedVideos = action.payload;
      state.error = '';
      //   console.log(action.state);
    });
    builder.addCase(fetchRelatedVideos.rejected, (state, action) => {
      state.loading = false;
      state.relatedVideos = [];
      state.error = action.error.message;
    });
  },
});

module.exports = relatedVideosSlice.reducer;
module.exports.relatedVideosActions = relatedVideosSlice.actions;
module.exports.fetchRelatedVideos = fetchRelatedVideos;
