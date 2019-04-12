import { Group } from './group';
import { GROUP_ONE_MOCK_USERS } from '../group-users/group-one-mock-users';
import { GROUP_TWO_MOCK_USERS } from '../group-users/group-two-mock-users';
import { MOCK_USERS } from '../group-users/mock-users';



export const MOCK_GROUPS = [
    new Group(
        "group 1",
        [MOCK_USERS[0], MOCK_USERS[1], MOCK_USERS[2], MOCK_USERS[3]]
    ),
    new Group(
        "group 2",
        [MOCK_USERS[4], MOCK_USERS[5], MOCK_USERS[6], MOCK_USERS[7]]
    ),
];