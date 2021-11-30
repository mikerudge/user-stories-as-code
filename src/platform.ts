import uniqid from 'uniqid';
import Meta from './Meta';
import UserStory from './userStory';

export type PlatformParams = {
  name: string;
  description?: string;
};

export type PlatformOut = {
  id: string;
} & PlatformParams;

/**
 * Platform allows you to define the platforms that are going to be developed in this project.
 * For example you may have web application, mobile app and chat bot.
 *
 * @example
 *```ts
 * const web = new Platform({name: "Web", description: "The web application"});
 *```
 *
 * @author Mike Rudge
 * @date 28/11/2021
 * @class Platform
 */
export default class Platform implements Meta {
  name: string;
  description: string;
  userStories = new Set<UserStory>();
  id: string;

  constructor(params?: PlatformParams) {
    this.name = params?.name ?? '';
    this.description = params?.description ?? '';
    this.id = uniqid();
  }

  public setName(name: string): Platform {
    this.name = name;
    return this;
  }

  public setDescription(description: string): Platform {
    this.description = description;
    return this;
  }

  private _addStory(story: UserStory): void {
    story.setPlatform(this);
    this.userStories.add(story);
  }

  public addStory(story: UserStory | UserStory[]): Platform {
    if (Array.isArray(story)) {
      story.forEach((s) => this._addStory(s));
    } else {
      this._addStory(story);
    }
    return this;
  }

  private toJSON(): PlatformOut {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }

  public output(): PlatformOut {
    return this.toJSON();
  }
}
