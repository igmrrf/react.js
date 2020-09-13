export const updateAlbumDetails = (albums, albumToUpdate) => {
  const album = albums.find((albums) => albums.id === albumToUpdate.id);
  albums[albums.indexOf(album)] = albumToUpdate;
  return albums;
};

export const addNewAlbum = (albums, albumToAdd) => {
  albums.push(albumToAdd);
  return albums;
};

export const deleteAlbum = (albums, id) => {
  return albums.filter((album) => album.id !== id);
};
