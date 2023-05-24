export interface IAlbum {
  id?: string;
  userId: number;
  title: string;
}

export interface IComment {
  id?: string;
  postId: number;
  email: string;
  name: string;
  body: string;
}

export interface IPhoto {
  id?: string;
  title: string;
  thumbnailUrl: string;
}

export interface IPost {
  id?: string;
  userId: number;
  title: string;
  body: string;
}

export interface ITodo {
  id?: string;
  userId: number;
  title: string;
  completed?: boolean;
}

export interface IUser {
  id?: string;
  email: string;
  username: string;
  name: string;
  phone: string;
  website: string;
}
