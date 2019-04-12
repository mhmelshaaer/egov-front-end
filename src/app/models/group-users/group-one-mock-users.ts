import { MOCK_GROUPS } from './../groups/group-mockup';
import { GroupUser } from './group-user';



export const GROUP_ONE_MOCK_USERS = [
    new GroupUser(
        "Mouhammed",
        [MOCK_GROUPS[0].name],
        "user",
        ["user"]
    ),
    new GroupUser(
        "Ahmed",
        [MOCK_GROUPS[0].name],
        "user",
        ["user"]
    ),
    new GroupUser(
        "Hassan",
        [MOCK_GROUPS[0].name],
        "user",
        ["user"]
    ),
    new GroupUser(
        "Mahmoud",
        [MOCK_GROUPS[0].name],
        "user",
        ["user"]
    )
];