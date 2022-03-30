export const LOAD_STONE_LIST = "LOAD_STONE_LIST";
export const RESET_STONE_LIST = "RESET_STONE_LIST";
export const LOAD_MUSICIAN_LIST = "LOAD_MUSICIAN_LIST"
export const RESET_MUSICIAN_LIST = "RESET_STONE_LIST";

// action functions
export const loadMusicianList = (musicians) => {
    return {
        type: LOAD_MUSICIAN_LIST,
        payload: musicians
    }
}

export const resetMusicianList = () => {
    return {
        type: RESET_MUSICIAN_LIST
    }
}
export const loadStoneList = (stones) => {
    return {
        type: LOAD_STONE_LIST,
        payload: stones

    }
}
export const resetStoneList = () => {
    return {
        type: RESET_STONE_LIST
    }
}