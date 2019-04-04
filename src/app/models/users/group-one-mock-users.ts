import { MOCK_GROUPS } from './../groups/group-mockup';
import { User } from './user';



export const GROUP_ONE_MOCK_USERS = [
    new User(
        "Mouhammed",
        [MOCK_GROUPS[0].name],
        "user",
        ["user"]
    ),
    new User(
        "Ahmed",
        [MOCK_GROUPS[0].name],
        "user",
        ["user"]
    ),
    new User(
        "Hassan",
        [MOCK_GROUPS[0].name],
        "user",
        ["user"]
    ),
    new User(
        "Mahmoud",
        [MOCK_GROUPS[0].name],
        "user",
        ["user"]
    )
];