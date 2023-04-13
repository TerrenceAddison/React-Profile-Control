import BaseRouter from './base/BaseRouter';
import ProfileController from '../controller/ProfileController';
import validate from '../helper/validate';
import { createProfileSchema, updateProfileSchema } from '../schema/ProfileSchema';

class ProfileRouter extends BaseRouter {
    public routes(): void {
        this.router.post("",validate(createProfileSchema), ProfileController.create);
        this.router.patch("/:id", validate(updateProfileSchema), ProfileController.update);
        this.router.delete(":id", ProfileController.delete);
        this.router.get("", ProfileController.findAll);
        this.router.get("/:id", ProfileController.findById);
    }
}

export default new ProfileRouter().router;