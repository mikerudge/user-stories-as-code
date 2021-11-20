import { Model } from './model';
import Permission from './permission';

import Task from './task';
import UserStory from './userStory';

type CRUDStoriesParams = {
  canFilterList?: boolean;
  canSortList?: boolean;
  canPaginateList?: boolean;
  shouldSoftDelete?: boolean;
  models?: Model[];
};

export default class ProjectWithCRUDStories {
  canFilterList: boolean;
  canSortList: boolean;
  canPaginateList: boolean;
  shouldSoftDelete: boolean;
  models: Set<Model>;
  stories: Set<UserStory> = new Set();

  constructor(params?: CRUDStoriesParams) {
    this.canFilterList = params?.canFilterList ?? true;
    this.canSortList = params?.canSortList ?? true;
    this.canPaginateList = params?.canPaginateList ?? true;
    this.shouldSoftDelete = params?.shouldSoftDelete ?? false;
    this.models = new Set(params?.models ?? []);
  }

  private _addModel(model: Model) {
    // If there is no userType on model.permissions throw an error
    model.permissions.forEach((permission) => {
      if (!permission.userType) {
        throw new Error(`Permission for model ${model.name} has no userType`);
      }
    });

    this.models.add(model);
  }

  /**
   * @description Add model to the project
   * @author Mike Rudge
   * @date 06/11/2021
   * @param {Model} model
   * @memberof Project
   */
  addModel = (model: Model | Model[]): ProjectWithCRUDStories => {
    if (Array.isArray(model)) {
      model.forEach((m) => this._addModel(m));
    } else {
      this._addModel(model);
    }
    return this;
  };

  private readonly _addStory = (story: UserStory): ProjectWithCRUDStories => {
    this.stories.add(story);
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
  private readonly _createCreateUserStories = (permission: Permission, model: Model): ProjectWithCRUDStories => {
    if (permission.actions.has('create')) {
      /* -------------------------- Create Users stories -------------------------- */

      if (permission.can) {
        if (typeof permission.belongsTo !== 'string' && permission.belongsTo?.name) {
          const modelName = permission.belongsTo?.name;

          const story = new UserStory({
            asA: permission.userType,
            iWant: `create ${model.name}s on ${modelName}s that I can access`,
            soICan: 'create a new record',
          });
          this._addStory(story);
        } else {
          const story = new UserStory({
            asA: permission.userType,
            iWant: `Create ${model.name}s`,
            soICan: 'create a new record',
          });
          this._addStory(story);
        }
      }

      if (!permission.can) {
        if (typeof permission.belongsTo !== 'string' && permission.belongsTo?.name) {
          const modelName = permission.belongsTo?.name;

          const story = new UserStory({
            asA: permission.userType,
            iWant: `to be blocked from creating ${model.name}s on ${modelName}`,
          });
          this._addStory(story);
        } else {
          const story = new UserStory({
            asA: permission.userType,
            iWant: `to be denied access to creating ${model.name}`,
            soICan: '',
          });
          this._addStory(story);
        }
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
  private readonly _createReadStories = (permission: Permission, model: Model): ProjectWithCRUDStories => {
    if (permission.can) {
      if (typeof permission.belongsTo !== 'string') {
        // Belongs to a  model.
        const modelName = permission.belongsTo?.name;
        const belongToTask = new Task({
          title: `Reject requests for ${model.name} if the user is not part of ${modelName}`,
        });

        this._addStory(
          new UserStory({
            asA: permission.userType,
            iWant: `to only access ${model.name}s that are in my ${modelName}`,
          }).addTask(belongToTask),
        );
      }

      if (permission.belongsTo === 'owner') {
        const ownerTask = new Task({ title: `Reject requests for ${model.name} if the user is not the owner` });
        this._addStory(
          new UserStory({
            asA: permission.userType,
            iWant: `to be able to view ${model.name}s that belong to me`,
            soICan: 'view all records',
          }).addTask(ownerTask),
        );

        this._addStory(
          new UserStory({
            asA: permission.userType,
            iWant: `See a single ${model.name} if I am the owner`,
            soICan: 'see more in depth information',
          }),
        );

        this._addStory(
          new UserStory({
            asA: permission.userType,
            iWant: `See a permission denied message for ${model.name} if I am not owner`,
            soICan: 'know I dont have access',
          }),
        );
      } else {
        this._addStory(
          new UserStory({ asA: permission.userType, iWant: `List all ${model.name}s`, soICan: 'easily navigate' }),
        );

        if (this.canFilterList) {
          this._addStory(
            new UserStory({
              asA: permission.userType,
              iWant: `to be able to filter ${model.name}s`,
              soICan: 'filter the list',
            }),
          );
        }

        if (this.canSortList) {
          this._addStory(
            new UserStory({
              asA: permission.userType,
              iWant: `to be able to sort ${model.name}s`,
              soICan: 'sort the list',
            }),
          );
        }

        if (this.canPaginateList) {
          this._addStory(
            new UserStory({
              asA: permission.userType,
              iWant: `to be able to paginate ${model.name}s`,
              soICan: 'paginate the list',
            }),
          );
        }

        this._addStory(
          new UserStory({
            asA: permission.userType,
            iWant: `See a single ${model.name?.toLocaleLowerCase()}`,
            soICan: 'see more in depth information',
          }),
        );
      }
    } else if (!permission.can) {
      this._addStory(
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
  private readonly _createUpdateStories = (permission: Permission, model: Model): ProjectWithCRUDStories => {
    if (permission.actions.has('update')) {
      if (permission.can) {
        this._addStory(
          new UserStory({ asA: permission.userType, iWant: `update ${model.name}s`, soICan: 'change information' }),
        );
      }

      if (!permission.can) {
        this._addStory(
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
  private readonly _createDeleteStories = (permission: Permission, model: Model): ProjectWithCRUDStories => {
    if (permission.can) {
      if (permission.belongsTo === 'owner') {
        this._addStory(
          new UserStory({
            asA: permission.userType,
            iWant: `to be able to delete ${model.name}s that belong to me`,
            soICan: 'delete records',
          }),
        );
      } else if (typeof permission.belongsTo !== 'string') {
        const modelName = permission.belongsTo?.name;
        const story = new UserStory({
          asA: permission.userType,
          iWant: `to delete ${model.name}s that are belong to my ${modelName}`,
          soICan: `remove unwanted ${model.name}s`,
        });
        this._addStory(story);
      } else {
        const story = new UserStory({
          asA: permission.userType,
          iWant: `to delete ${model.name}s`,
          soICan: `remove unwanted ${model.name}s`,
        });

        if (this.shouldSoftDelete) {
          story.setIWant(`to be able to soft delete ${model.name}s`);
        }

        this._addStory(story);
      }
    } else if (!permission.can) {
      this._addStory(
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
  private readonly _createModelStories = (permission: Permission, model: Model): ProjectWithCRUDStories => {
    this._addStory(
      new UserStory({
        asA: permission.userType,
        iWant: `to be able to link others directly to ${model.name}`,
        soICan: 'share links on other platforms',
      }),
    );
    return this;
  };

  generate = (): UserStory[] => {
    if (this.models.size === 0) {
      throw new Error('You need to provide at least one model to generate stories');
    }

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

    return Array.from(this.stories);
  };
}
