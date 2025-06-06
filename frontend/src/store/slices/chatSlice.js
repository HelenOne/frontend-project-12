import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatData: (state, action) => {
      const { channels, messages, currentChannelId } = action.payload;
      state.channels = channels;
      state.messages = messages;
      state.currentChannelId = currentChannelId;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find((c) => c.id === id);
      if (channel) {
        channel.name = name;
      }
    }, 
    removeChannel: (state, action) => {
      const idToRemove = action.payload;
      state.channels = state.channels.filter((c) => c.id !== idToRemove);
      state.messages = state.messages.filter((m) => m.channelId !== idToRemove);
      if (state.currentChannelId === idToRemove) {
        state.currentChannelId = state.channels[0]?.id || null;
      }
    },  
  },
});

export const {
  setChatData,
  addMessage,
  setCurrentChannelId,
  addChannel,
  renameChannel,
  removeChannel,
} = chatSlice.actions;

export default chatSlice.reducer;
