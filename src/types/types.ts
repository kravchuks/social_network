export type PostsType = {
  id?: number;
  message: string;
  like_count: number;
  image: string;
};

export type ContactsType = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
};

export type PhotosType = {
  small: string | null;
  large: string | null;
};

export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
};

export type UsersType = {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
  followed: boolean;
};

export type DialogType = {
  id: number;
  name: string;
  image: string;
};

export type MessageType = {
  id: number;
  text: string;
};

export type FilterType = {
  term: string;
  friend: null | boolean;
};
