interface Favorites {
  artists: { id: string }[]; // favorite artists ids
  albums: { id: string }[]; // favorite albums ids
  tracks: { id: string }[]; // favorite tracks ids
}

export { Favorites };
