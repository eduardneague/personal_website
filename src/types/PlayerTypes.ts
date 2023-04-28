export type PlayerPositionObject = {
    X_Position: number,
    Y_Position: number;
}

export type PlayerVelocityObject = {
    X_Velocity: number,
    Y_Velocity: number;
}

export type PlayerSizeObject = {
    width: number,
    height: number;
}

export type PlayerKeysObject = {
    right: {
        pressed: boolean
    },
    left: {
        pressed: boolean
    },
    up: {
        pressed: boolean
    }
}

