import BaseRouter from './base/BaseRouter';
import WorkExperienceController from '../controller/WorkExperienceController';
import validate from '../helper/validate';
import { createWorkExperienceSchema, updateWorkExperienceSchema } from '../schema/WorkExperienceSchema';

class WorkExperienceRouter extends BaseRouter {
    public routes(): void {
        this.router.post("",validate(createWorkExperienceSchema), WorkExperienceController.create);
        this.router.patch("/:id", validate(updateWorkExperienceSchema), WorkExperienceController.update);
        this.router.delete(":id", WorkExperienceController.delete);
        this.router.get("", WorkExperienceController.findAll);
        this.router.get("/:id", WorkExperienceController.findById);
        this.router.get("/:user_id", WorkExperienceController.findByUserId);

    }
}

export default new WorkExperienceRouter().router;