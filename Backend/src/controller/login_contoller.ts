import express, { Express, Request, Response } from 'express';
import { UserDomain } from '../domain/user_domain';
var router = express.Router();

class LoginContoller {
    static async login(req: Request, res: Response) {
        const userDomain = new UserDomain();
        await userDomain.login(req, res);
    }

    static async signup(req: Request, res: Response) {
        const userDomain = new UserDomain();
        await userDomain.signUp(req, res);
    }
}
router.post('/login', LoginContoller.login);
router.post('/signup', LoginContoller.signup);
export { router };