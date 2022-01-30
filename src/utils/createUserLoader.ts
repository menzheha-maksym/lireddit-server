import DataLoader from "dataloader";
import { User } from "../entities/User";

// gets aaray of ids [1, 2, 3]
// returns array of user Objects [{id: 1, user: "tim"}, {}, {}]
export const createUserLoader = () => new DataLoader<number, User>(async userIds => {
    const users = await User.findByIds(userIds as number[]);
    const userIdToUser: Record<number, User> = {};
    users.forEach(u => {
        userIdToUser[u.id] = u;
    })

    return userIds.map(userId => userIdToUser[userId]);
});