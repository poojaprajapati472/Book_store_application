import { ReviewModel } from "../model/rating.model";

class bookrating_service {
    async rate(userData: any) {
        try {
            const newUser = new ReviewModel({
               ...userData
            });
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            throw error
        }
    }
}
export const rating_service= new bookrating_service();