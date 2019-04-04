import { MOCK_GROUPS } from './../groups/group-mockup';
import { User } from './user';



export const GROUP_TWO_MOCK_USERS = [
    new User(
        "Salah",
        [MOCK_GROUPS[1].name],
        "user",
        ["user"]
    ),
    new User(
        "Saad",
        [MOCK_GROUPS[1].name],
        "user",
        ["user"]
    ),
    new User(
        "Abdo",
        [MOCK_GROUPS[1].name],
        "user",
        ["user"]
    ),
    new User(
        "Sayed",
        [MOCK_GROUPS[1].name],
        "user",
        ["user"]
    ),
];