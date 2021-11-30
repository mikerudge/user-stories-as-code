import uniqid from 'uniqid';
import Meta from './Meta';

type Params = {
  id?: string;
  name: string;
  role?: string;
  avatar?: string;
  description?: string;
};

export type TeamMemberOutput = {
  id: string;
} & Params;

/**
 * A team member is a member of the team (funny that!), that can be assigned to a
 * - {@link Task},
 * - {@link UserStory} or a
 * - {@link Task}
 *
 * @example
 *```ts
 * const james = new TeamMember({ id: '123', name: 'James Brown', role: 'Developer' });
 *
 * // Setting the owner of a project
 *
 * new Project().setOwner(james);
 *
 * // Setting the assignee of a task
 *
 * new Task().addAssignee(james);
 *
 * // Setting the assignee of a story
 * new Story().addAssignee(james);
 * // Or set many
 * new Story().addAssignee([james, lisa]);
 *```
 * @author Mike Rudge
 * @date 27/11/2021
 * @class TeamMember
 */
export default class TeamMember implements Meta {
  public id: string;
  name: string;
  role: string | undefined;
  avatar: string | undefined;
  description: string;
  constructor(params: Params) {
    this.id = params.id ?? uniqid();
    this.name = params.name;
    this.role = params.role;
    this.avatar = params.avatar;
    this.description = params.description ?? '';
  }

  public setName(name: string): TeamMember {
    this.name = name;
    return this;
  }

  public setDescription(description: string): TeamMember {
    this.description = description;
    return this;
  }

  public setRole(role: string): TeamMember {
    this.role = role;
    return this;
  }

  /**
   * @description a url of an avatar
   * @author Mike Rudge
   * @date 27/11/2021
   * @param {string} avatarUrl
   * @returns   {TeamMember}
   * @memberof TeamMember
   */
  public setAvatar(avatarUrl: string): TeamMember {
    this.avatar = avatarUrl;
    return this;
  }

  public setId(id: string): TeamMember {
    this.id = id;
    return this;
  }

  private toJSON(): TeamMemberOutput {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      role: this.role,
      avatar: this.avatar,
    };
  }

  /**
   * @description
   * @author Mike Rudge
   * @date 27/11/2021
   * @returns {*}  {TeamMemberOutput}
   * @memberof TeamMember
   */
  public output(): TeamMemberOutput {
    return this.toJSON();
  }
}
