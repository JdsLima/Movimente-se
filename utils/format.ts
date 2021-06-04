interface array {
    _id: string;
    userName: string;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    friendsName: string[];
}

export function formatListUsers(array: array[], limit: number) {
    let newArray = [];
    if (array.length <= limit) {
        limit = array.length;
    }

    for (let i = 0; i < limit; i++) {
        newArray.push(array[i]);
    }

    newArray.sort((a, b) => b.challengesCompleted - a.challengesCompleted);
    newArray.sort((a, b) => b.currentExperience - a.currentExperience);

    const data = newArray;
    return data;
}