import uniqid from 'uniqid';
import UserStory from './userStory';

export type TaskProps = {
  name: string;
  userStory?: UserStory | undefined;
};

export default class Task {
  id: string;
  name: string;
  userStory: UserStory | null | undefined;

  constructor(props?: TaskProps) {
    this.id = uniqid();
    this.name = props?.name ?? '';
    this.userStory = props?.userStory ?? null;
  }

  setName = (name: string): Task => {
    this.name = name;
    return this;
  };

  setUserStory = (userStory: UserStory): Task => {
    this.userStory = userStory;
    return this;
  };

  create = () => {
    return { id: this.id, name: this.name };
  };
}
