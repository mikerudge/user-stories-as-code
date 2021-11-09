import { Model } from './models';
import Permission from './permissions';
import Project from './project';
import Task from './task';
import UserStory from './userStory';

type CRUDStoriesParams = {
  name: string;
  canFilterList?: boolean;
  canSortList?: boolean;
  canPaginateList?: boolean;
  shouldSoftDelete?: boolean;
};

export default class CRUDStories extends Project {
  canFilterList: boolean;
  canSortList: boolean;
  canPaginateList: boolean;
  shouldSoftDelete: boolean;
  models: Set<Model> = new Set();

  constructor(params?: CRUDStoriesParams) {
    super(params ?? { name: 'CRUDStories' });
    this.canFilterList = params?.canFilterList ?? true;
    this.canSortList = params?.canSortList ?? true;
    this.canPaginateList = params?.canPaginateList ?? true;
    this.shouldSoftDelete = params?.shouldSoftDelete ?? false;
  }

  /**
   * @description Add model to the project
   * @author Mike Rudge
   * @date 06/11/2021
   * @param {Model} model
   * @memberof Project
   */
  addModel = (model: Model): CRUDStories => {
    this.models.add(model);
    return this;
  };

  /**
   * @description
   * @author Mike Rudge
   * @date 06/11/2021
   * @param {Model[]} models
   * @memberof Project
   */
  addManyModels = (models: Model[]): CRUDStories => {
    models.forEach((model) => this.addModel(model));
    return this;
  };

  /**
   * @description The Create User Stories
   * @author Mike Rudge
   * @date 08/11/2021
   * @private
   * @param {Permission} permission
   * @param {Model} model
   * @memberof GenerateCRUDStories
   */
  private readonly _createCreateUserStories = (permission: Permission, model: Model): CRUDStories => {
    if (permission.actions.has('create')) {
      /* -------------------------- Create Users stories -------------------------- */

      if (permission.can) {
        const story = new UserStory({
          asA: permission.userType,
          iWant: `Create ${model.name}s`,
          soICan: 'create a new record',
        });
        this.addStory(story);

        if (this.departments.size > 0) {
          this.departments.forEach((department) => {
            const createTask = new Task({ name: `${department.name} to work on create for ${model.name}s` });
            story.addTask(createTask);
          });
        }
      }

      if (!permission.can) {
        const story = new UserStory({
          asA: permission.userType,
          iWant: `to be denied access to creating ${model.name}`,
          soICan: '',
        });
        this.addStory(story);
      }
    }
    return this;
  };

  /**
   * @description Creates a story for reading a model
   * @author Mike Rudge
   * @date 08/11/2021
   * @private
   * @param {Permission} permission
   * @param {Model} model
   * @memberof CRUDStories
   */
  private readonly _createReadStories = (permission: Permission, model: Model): CRUDStories => {
    if (permission.can) {
      if (permission.condition === 'owner') {
        const ownerTask = new Task({ name: `Reject requests for ${model.name} if the user is not the owner` });
        this.addStory(
          new UserStory({
            asA: permission.userType,
            iWant: `to be able to view ${model.name}s that belong to me`,
            soICan: 'view all records',
          }).addTask(ownerTask),
        );

        this.addStory(
          new UserStory({
            asA: permission.userType,
            iWant: `See a single ${model.name} if I am the owner`,
            soICan: 'see more in depth information',
          }),
        );

        this.addStory(
          new UserStory({
            asA: permission.userType,
            iWant: `See a permission denied message for ${model.name} if I am not owner`,
            soICan: 'know I dont have access',
          }),
        );
      } else {
        this.addStory(
          new UserStory({ asA: permission.userType, iWant: `List all ${model.name}s`, soICan: 'easily navigate' }),
        );

        if (this.canFilterList) {
          this.addStory(
            new UserStory({
              asA: permission.userType,
              iWant: `to be able to filter ${model.name}s`,
              soICan: 'filter the list',
            }),
          );
        }

        if (this.canSortList) {
          this.addStory(
            new UserStory({
              asA: permission.userType,
              iWant: `to be able to sort ${model.name}s`,
              soICan: 'sort the list',
            }),
          );
        }

        if (this.canPaginateList) {
          this.addStory(
            new UserStory({
              asA: permission.userType,
              iWant: `to be able to paginate ${model.name}s`,
              soICan: 'paginate the list',
            }),
          );
        }

        this.addStory(
          new UserStory({
            asA: permission.userType,
            iWant: `See a single ${model.name?.toLocaleLowerCase()}`,
            soICan: 'see more in depth information',
          }),
        );
      }
    } else if (!permission.can) {
      this.addStory(
        new UserStory({
          asA: permission.userType,
          iWant: `only see ${model}s that I have access to`,
          soICan: '',
        }),
      );
    }

    return this;
  };

  /**
   * @description The Update User Stories
   * @author Mike Rudge
   * @date 08/11/2021
   * @private
   * @param {Permission} permission
   * @param {Model} model
   * @memberof CRUDStories
   */
  private readonly _createUpdateStories = (permission: Permission, model: Model): CRUDStories => {
    if (permission.actions.has('update')) {
      if (permission.can) {
        this.addStory(
          new UserStory({ asA: permission.userType, iWant: `update ${model.name}s`, soICan: 'change information' }),
        );
      }

      if (!permission.can) {
        this.addStory(
          new UserStory({ asA: permission.userType, iWant: `to not be able to update ${model.name}s`, soICan: '' }),
        );
      }
    }
    return this;
  };

  /**
   * @description The Delete User Stories
   * @author Mike Rudge
   * @date 08/11/2021
   * @private
   * @param {Permission} permission
   * @param {Model} model
   * @memberof CRUDStories
   */
  private readonly _createDeleteStories = (permission: Permission, model: Model): CRUDStories => {
    if (permission.can) {
      const story = new UserStory({
        asA: permission.userType,
        iWant: `soft delete ${model.name}s`,
        soICan: `remove unwanted ${model.name}s`,
      });

      if (this.shouldSoftDelete) {
        story.setIWant(`to be able to soft delete ${model.name}s`);
      }

      this.addStory(story);
    } else if (!permission.can) {
      this.addStory(
        new UserStory({ asA: permission.userType, iWant: `to not be able to delete ${model.name}s`, soICan: '' }),
      );
    }

    return this;
  };

  /**
   * @description These stories are regardless of permission per model
   * @author Mike Rudge
   * @date 08/11/2021
   * @private
   * @param {Permission} permission
   * @param {Model} model
   * @memberof CRUDStories
   */
  private readonly _createModelStories = (permission: Permission, model: Model): CRUDStories => {
    this.addStory(
      new UserStory({
        asA: permission.userType,
        iWant: `to be able to link others directly to ${model.name}`,
        soICan: 'share links on other platforms',
      }),
    );
    return this;
  };

  generate(): CRUDStories {
    this.models.forEach((model) => {
      model.permissions.forEach((permission) => {
        if (permission.actions.has('all')) {
          this._createReadStories(permission, model);
          this._createUpdateStories(permission, model);
          this._createDeleteStories(permission, model);
          this._createCreateUserStories(permission, model);
          this._createModelStories(permission, model);
          return this;
        }

        if (permission.actions.has('create')) {
          this._createCreateUserStories(permission, model);
        }
        if (permission.actions.has('read')) {
          this._createReadStories(permission, model);
        }
        if (permission.actions.has('update')) {
          this._createUpdateStories(permission, model);
        }
        if (permission.actions.has('delete')) {
          this._createDeleteStories(permission, model);
        }
        this._createModelStories(permission, model);
      });
    });

    return this;
  }
}
