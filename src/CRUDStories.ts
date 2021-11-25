import Model from './model';
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

export default class CRUDStories {
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
  addModel = (model: Model | Model[]): CRUDStories => {
    if (Array.isArray(model)) {
      model.forEach((m) => this._addModel(m));
    } else {
      this._addModel(model);
    }
    return this;
  };

  private readonly _addStory = (story: UserStory): CRUDStories => {
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
  private readonly _addCreateUserStories = (permission: Permission, model: Model): CRUDStories => {
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
  private readonly _addReadStories = (permission: Permission, model: Model): CRUDStories => {
    if (permission.can) {
      if (typeof permission.belongsTo !== 'string' && permission.belongsTo?.name) {
        /* -------------------------------------------------------------------------- */
        /*                            Belongs to a model.                             */
        /* -------------------------------------------------------------------------- */
        const modelName = permission.belongsTo.name?.toLocaleLowerCase();

        const belongToTask = new Task({
          title: `Reject requests for ${model.name} if the user is not part of ${modelName}`,
        });

        // As a Author, I want to only read comments that are connected to my book
        // As a Business Owner, I want to only read reviews that are connected to my Business
        const story1 = new UserStory({
          asA: permission.userType,
          iWant: `to only read ${model.name}s that are connected to my ${modelName}`,
        }).addTask(belongToTask);

        this._addStory(story1);
      } else if (permission.belongsTo === 'owner') {
        /* -------------------------------------------------------------------------- */
        /*                           Only the owner can read                          */
        /* -------------------------------------------------------------------------- */
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
        /* -------------------------------------------------------------------------- */
        /*                               No Permissions                               */
        /* -------------------------------------------------------------------------- */
        this._addStory(
          new UserStory({
            asA: permission.userType,
            iWant: `to see a list of all ${model.name}s`,
            soICan: `see an overview of all ${model.name}s`,
          }),
        );
      }

      if (this.canFilterList) {
        this._addStory(
          new UserStory({
            asA: permission.userType,
            iWant: `to be able to filter ${model.name}s`,
            soICan: `easily find the ${model.name} I am looking for`,
          }),
        );
      }

      if (this.canSortList) {
        this._addStory(
          new UserStory({
            asA: permission.userType,
            iWant: `to be able to sort ${model.name}s`,
            soICan: '',
          }),
        );
      }

      if (this.canPaginateList) {
        this._addStory(
          new UserStory({
            asA: permission.userType,
            iWant: `to be able to paginate ${model.name}s`,
            soICan: '',
          }),
        );
      }

      this._addStory(
        new UserStory({
          asA: permission.userType,
          iWant: `to see a single ${model.name?.toLocaleLowerCase()}`,
          soICan: 'see more in depth information',
        }),
      );
    }
    if (!permission.can) {
      this._addStory(
        new UserStory({
          asA: permission.userType,
          iWant: `to NOT see any ${model.name}`,
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
  private readonly _addUpdateStories = (permission: Permission, model: Model): CRUDStories => {
    if (permission.actions.has('update')) {
      if (permission.can) {
        if (permission.belongsTo === 'owner') {
          this._addStory(
            new UserStory({
              asA: permission.userType,
              iWant: `update ${model.name}s that I own`,
              soICan: `make changes to my ${model.name}`,
            }),
          );
        } else if (permission.belongsTo?.name) {
          this._addStory(
            new UserStory({
              asA: permission.userType,
              iWant: `update ${model.name}s that belong to ${permission.belongsTo.name}`,
              soICan: `make changes to ${model.name}`,
            }).addTask([
              new Task({
                title: `Make sure an error is shown to the ${permission.userType} when attempting to update ${model.name} that does not belong to ${permission.belongsTo.name}`,
              }),
              new Task({
                title: `Reject requests to update ${model.name}s that don't belong to the users ${permission.belongsTo.name}`,
              }),
            ]),
          );
        } else {
          this._addStory(
            new UserStory({
              asA: permission.userType,
              iWant: `update all ${model.name}s on the system`,
              soICan: `make changes on any ${model.name}`,
            }),
          );
        }
      }

      if (!permission.can) {
        this._addStory(
          new UserStory({
            asA: permission.userType,
            iWant: `to denied from updating ${model.name}s`,
            soICan: '',
          }).addTask(
            new Task({
              title: `Make sure an error is shown to the ${permission.userType} when attempting to update ${model.name}`,
            }),
          ),
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
  private readonly _addDeleteStories = (permission: Permission, model: Model): CRUDStories => {
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
  private readonly _addModelStories = (permission: Permission, model: Model): CRUDStories => {
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
          this._addReadStories(permission, model);
          this._addUpdateStories(permission, model);
          this._addDeleteStories(permission, model);
          this._addCreateUserStories(permission, model);
          this._addModelStories(permission, model);
          return this;
        }

        if (permission.actions.has('create')) {
          this._addCreateUserStories(permission, model);
        }
        if (permission.actions.has('read')) {
          this._addReadStories(permission, model);
        }
        if (permission.actions.has('update')) {
          this._addUpdateStories(permission, model);
        }
        if (permission.actions.has('delete')) {
          this._addDeleteStories(permission, model);
        }
        this._addModelStories(permission, model);
      });
    });

    return Array.from(this.stories);
  };
}
