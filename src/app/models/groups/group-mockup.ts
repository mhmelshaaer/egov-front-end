import { Group } from './group';
import { GROUP_ONE_MOCK_USERS } from '../users/group-one-mock-users';
import { GROUP_TWO_MOCK_USERS } from '../users/group-two-mock-users';



export const MOCK_GROUPS = [
    new Group(
        "group 1",
        GROUP_ONE_MOCK_USERS
    ),
    new Group(
        "group 2",
        GROUP_TWO_MOCK_USERS
    ),
];