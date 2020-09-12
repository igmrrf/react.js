export const updateAlbumDetails = (albums, albumToUpdate) => {
  albums[albumToUpdate.id - 1] = albumToUpdate;
  // const cleanAlbum = albums.find((album) => album.id === albumToUpdate.id);
  // return [...albums, { ...cleanAlbum, title: albumToUpdate.title }];
  return albums;
};
