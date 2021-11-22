import { Artboard, Page, Rect, Sketch, Text } from 'sketch-constructor';

import Model from '../model';
import Permission, { Action } from '../permission';
import UserType from '../userType';

type UserTypesObject = {
  userType: UserType;
  permission: Permission;
};
export class ModelsToSketch {
  models: Model[];
  constructor(models: Model[]) {
    this.models = models;
  }

  public readonly createSketch = (): Sketch => {
    const newSketch = new Sketch();

    const page = new Page({ name: 'Generated Models' });
    const PADDING = 90;
    const WIDTH = 1440;
    const HEIGHT = 1024;

    const size = new Rect({ width: WIDTH, height: HEIGHT, x: 0, y: 0 });
    this.models.forEach((model: Model) => {
      model.actions.forEach((action: Action) => {
        // Get all user types that have this action as a permission from the model

        const artBoards = new Set<Artboard>();

        const webArtboard = new Artboard({
          frame: size,
          name: `${model.name} / ${action}`.toUpperCase(),
          backgroundColor: '#282930',
          hasBackgroundColor: true,
        });

        if (action === 'read') {
          webArtboard.name = `${model.name} / List (read)`.toUpperCase();
          size.x = size.x + WIDTH + PADDING;
          const webArtboard2 = new Artboard({
            frame: size,
            name: `${model.name} / Detail (read)`.toUpperCase(),
            backgroundColor: '#282930',
            hasBackgroundColor: true,
          });
          artBoards.add(webArtboard2);
        }

        artBoards.add(webArtboard);
        let index = 1;

        /* -------------------------------------------------------------------------- */
        /*                          Add text to the artboard                          */
        /* -------------------------------------------------------------------------- */
        const userTypesObject = new Set<UserTypesObject>();

        model.permissions.forEach((permission) => {
          if (permission?.actions.has(action)) {
            if (permission.userType) {
              userTypesObject.add({ userType: permission.userType, permission: permission });
            }
          }
        });

        userTypesObject.forEach((obj) => {
          let text = `${obj.userType.name} can ${action} on ${model.name}`;

          if (obj.permission.belongsTo) {
            if (obj.permission.belongsTo === 'owner') {
              text += ` if they are the owner`;
            } else {
              text += ` if they belong to the same ${obj.permission?.belongsTo?.name}`;
            }
          }
          const USER_ACTION_TEXT = new Text({
            string: text,
            name: obj.userType.name,
            fontSize: 8 * 4,
            fontWeight: 'Bold',
            color: '#ccc',
            textAlignment: 'Center',
            frame: {
              width: 1024 - PADDING,
              height: 70,
              x: 0 + PADDING,
              y: PADDING + 70 * index,
            },
          });

          let relatedModels = '';
          if (model.relations.size > 0) {
            relatedModels += `Related Models:  `;
            // for each related model
            model.relations.forEach((relatedModel) => {
              relatedModels += `${relatedModel.name}, `;
            });
          }

          const RELATED_MODELS_TEXT = new Text({
            string: relatedModels,
            name: `related Models: obj.userType.name`,
            fontSize: 8 * 4,
            fontWeight: 'Bold',
            color: '#ccc',
            textAlignment: 'Center',
            frame: {
              width: 1024 - PADDING,
              height: 70,
              x: 0 + PADDING,
              y: HEIGHT - PADDING,
            },
          });

          artBoards.forEach((artboard) => {
            artboard.addLayer(USER_ACTION_TEXT);
            artboard.addLayer(RELATED_MODELS_TEXT);

            page.addArtboard(artboard);
          });
          index++;
        });
        size.x += WIDTH + PADDING;
      });
      size.x = 0;
      size.y += HEIGHT + PADDING * 4;
    });

    newSketch.addPage(page);
    newSketch.build('models.sketch', 0);

    return newSketch;
  };
}
