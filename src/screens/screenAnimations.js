import { Platform } from 'react-native';

const animationDuration = 250

export const AnimationType = {
    FADEROOT: Platform.OS === 'ios' ? {
        enabled: true,
        waitForRender: true,
        content: {
            y: {
                from: 1000,
                to: 0,
                duration: animationDuration,
                interpolation: 'accelerate',
            },
            alpha: {
                from: 0,
                to: 1,
                duration: animationDuration,
                interpolation: 'accelerate',
            }
        }
    } : {
            enabled: true,
            y: {
                from: 1000,
                to: 0,
                duration: animationDuration,
                interpolation: 'accelerate',
            },
            alpha: {
                from: 0,
                to: 1,
                duration: animationDuration,
                interpolation: 'accelerate',
            }
        },
    SLIDEUP: {
        enabled: true,
        waitForRender: true,
        content: {
            y: {
                from: 1000,
                to: 0,
                duration: animationDuration,
                interpolation: 'accelerate',
            }
        }
    },
    SLIDEDOWN: {
        enabled: true,
        waitForRender: true,
        content: {
            y: {
                from: 0,
                to: 1000,
                duration: animationDuration,
                interpolation: 'decelerate',
            }
        }
    },
    SLIDERIGHTTOLEFT: {
        enabled: true,
        waitForRender: true,
        content: {
            x: {
                from: 1000,
                to: 0,
                duration: animationDuration,
                interpolation: 'decelerate',
            }
        }
    },
    SLIDELEFTTORIGHT: {
        enabled: true,
        waitForRender: true,
        content: {
            x: {
                from: 0,
                to: 1000,
                duration: animationDuration,
                interpolation: 'decelerate',
            }
        },
    },
    MODALSLIDERIGHTTOLEFT: Platform.OS === 'ios' ? {
        enabled: true,
        waitForRender: true,
        content: {
            x: {
                from: 1000,
                to: 0,
                duration: animationDuration,
                interpolation: 'decelerate',
            }
        }
    } : {
            enabled: true,
            x: {
                from: 1000,
                to: 0,
                duration: animationDuration,
                interpolation: 'accelerate',
            }
        },
    MODALSLIDELEFTTORIGHT: Platform.OS === 'ios' ? {
        enabled: true,
        waitForRender: true,
        content: {
            x: {
                from: 0,
                to: 1000,
                duration: animationDuration,
                interpolation: 'decelerate',
            }
        }
    } : {
            enabled: true,
            x: {
                from: 0,
                to: 1000,
                duration: animationDuration,
                interpolation: 'decelerate',
            }
        },
    MODALSLIDEUP: Platform.OS === 'ios' ? {
        enabled: true,
        waitForRender: true,
        content: {
            y: {
                from: 1000,
                to: 0,
                duration: animationDuration,
                interpolation: 'accelerate',
            }
        }
    } : {
            enabled: true,
            y: {
                from: 1000,
                to: 0,
                duration: animationDuration,
                interpolation: 'accelerate',
            }
        },
    MODALSLIDEDOWN: Platform.OS === 'ios' ? {
        enabled: true,
        waitForRender: true,
        content: {
            y: {
                from: 0,
                to: 1000,
                duration: animationDuration,
                interpolation: 'decelerate',
            }
        }
    } : {
            enabled: true,
            y: {
                from: 0,
                to: 1000,
                duration: animationDuration,
                interpolation: 'decelerate',
            }
        },
    OPENMENU: {
        enabled: true,
        waitForRender: true,
        content: {
            x: {
                from: -1000,
                to: 0,
                duration: animationDuration,
                interpolation: 'accelerate',
            }
        }
    },
    CLOSEMENU: {
        enabled: true,
        waitForRender: true,
        content: {
            x: {
                from: 0,
                to: -1000,
                duration: animationDuration,
                interpolation: 'decelerate',
            }
        }
    },
    OPENHOMEWALLET: Platform.OS === 'ios' ? {
        enabled: true,
        waitForRender: true,
        content: {
            alpha: {
                from: 0,
                to: 1,
                duration: animationDuration,
                interpolation: 'accelerate',
            }
        }
    } : {
            enabled: true,
            alpha: {
                from: 0,
                to: 1,
                duration: animationDuration,
                interpolation: 'accelerate',
            }
        },
    CLOSEHOMEWALLET: Platform.OS === 'ios' ? {
        enabled: true,
        waitForRender: true,
        content: {
            alpha: {
                from: 1,
                to: 0,
                duration: animationDuration,
                interpolation: 'decelerate',
            }
        }
    } : {
            enabled: true,
            alpha: {
                from: 1,
                to: 0,
                duration: animationDuration,
                interpolation: 'decelerate',
            }
        },
}

export function GetPopAnimationType(animationType) {
    switch (animationType) {
        case AnimationType.SLIDEUP:
            return AnimationType.SLIDEDOWN
        case AnimationType.OPENMENU:
            return AnimationType.CLOSEMENU
        case AnimationType.OPENHOMEWALLET:
            return AnimationType.CLOSEHOMEWALLET
        case AnimationType.MODALSLIDERIGHTTOLEFT:
            return AnimationType.MODALSLIDELEFTTORIGHT
        case AnimationType.MODALSLIDEUP:
            return AnimationType.MODALSLIDEDOWN
        default:
            return AnimationType.SLIDELEFTTORIGHT
    }
};