define(['ButtonMods'], function(ButtonMods) {
    return [
    /**
     * Level 0
     */
    {
        p: {
            positionRelative: {
                x: 200,
                y: 516
            },
            angle: 0,
            attrs: [
                {
                    attr: 'r',
                    value: 1,
                    relative: true,
                }
            ]
        },
        elements: [
            {
                type: 'text',
                positionPercent: {
                    x: 0.13,
                    y: 0.7
                },
                text: 'P27',
                attrs: [
                    {
                        attr: 'font-size',
                        value: 72,
                        relative: true,
                    }
                ]
            },
            {
                type: 'goal',
                positionRelative: {
                    x: 1000,
                    y: 516,
                },
                size: 1,
                onPickup: function(scene) {
                    scene.P().sprite.animate({'fill': '#fff'}, 500);
                    scene.background.animate({'fill': '#000'}, 500);
                },
            },
        ]
    },

    /**
     * Level 1
     */
    {
        p: {
            positionRelative: {
                x: 0,
                y: 516
            },
            angle: 0,
            attrs: [
                {
                    attr: 'r',
                    value: 1,
                    relative: true,
                }
            ]
        },
        sound: {
            sound: 'bass',
        },
        elements: [
            {
                type: 'sizeMod',
                positionRelative: {
                    x: 620,
                    y: 516,
                },
                modSize: 60,
            },
            {
                type: 'sizeMod',
                positionRelative: {
                    x: 1000,
                    y: 516,
                },
                modSize: 5,
            },
            {
                type: 'goal',
                positionRelative: {
                    x: 800,
                    y: 470,
                },
                size: 4,
                onPickup: function(scene) {
                    scene.P().sprite.animate({'fill': '#fff'}, 500);
                    scene.background.animate({'fill': '#000'}, 500);
                },
            },
        ]
    },

    /**
     * Level 2
     */
    {
        p: {
            positionRelative: {
                x: 0,
                y: 516
            },
            angle: 0,
            attrs: [
                {
                    attr: 'r',
                    value: 5,
                    relative: true,
                }
            ]
        },
        sound: {
            sound: 'bass',
        },
        elements: [
            {
                type: 'ccw90Mod',
                positionRelative: {
                    x: 350,
                    y: 516,
                },
                buttonType: ButtonMods.BUTTON_DOWN,
            },
            {
                type: 'goal',
                positionRelative: {
                    x: 790,
                    y: 216,
                },
                size: 4,
                onPickup: function(scene) {
                    scene.P().sprite.animate({'fill': '#fff'}, 500);
                    scene.background.animate({'fill': '#000'}, 500);
                },
            },
        ]

    },

    /**
     * Level 3
     */
    {
        p: {
            positionRelative: {
                x: 790,
                y: 709
            },
            angle: -90,
            attrs: [
                {
                    attr: 'r',
                    value: 5,
                    relative: true,
                }
            ],
            buttonDown: ButtonMods.CCW90
        },
        sound: {
            sound: 'bassMovement',
        },
        elements: [
            {
                type: 'goal',
                positionRelative: {
                    x: 220,
                    y: 600,
                },
                size: 4,
                onPickup: function(scene) {
                    scene.P().sprite.animate({'fill': '#fff'}, 500);
                    scene.background.animate({'fill': '#000'}, 500);
                }
            },
            {
                type: 'goal',
                positionRelative: {
                    x: 1024,
                    y: 600,
                },
                size: 4,
                onPickup: function(scene) {
                    scene.P().sprite.animate({'fill': '#fff'}, 500);
                    scene.background.animate({'fill': '#000'}, 500);
                }
            },

        ]
    },

    /**
     * Level 4
     */
    {
        p: {
            positionRelative: {
                x: 0,
                y: 600,
            },
            angle: 0,
            attrs: [
                {
                    attr: 'r',
                    value: 5,
                    relative: true,
                }
            ],
            buttonDown: ButtonMods.CCW90,
        },
        sound: {
            sound: 'bassMovement',
        },
        elements: [
            {
                type: 'ccw90Mod',
                positionRelative: {
                    x: 115,
                    y: 600
                },
                buttonType: ButtonMods.BUTTON_UP,

            },
            {
                type: 'goal',
                positionRelative: {
                    x: 615,
                    y: 503,
                },
                size: 4,
            },
            {
                type: 'goal',
                positionRelative: {
                    x: 980,
                    y: 100,
                },
                size: 4,
            },
        ]
    },

    /**
     * Level 5
     */
    {
        p: {
            positionRelative: {
                x: 0,
                y: 100,
            },
            angle: 0,
            attrs: [
                {
                    attr: 'r',
                    value: 5,
                    relative: true,
                }
            ],
            buttonDown: ButtonMods.CCW90,
            buttonUp: ButtonMods.CCW90,
        },
        sound: {
            sound: 'bassMovement',
        },
        elements: [
            {
                type: 'randomGoals',
                count: 5
            }
        ]
    },

    /**
     * Level 6
     */
    {
        p: {
            positionRelative: {
                x: 0,
                y: 516,
            },
            angle: 0,
            attrs: [
                {
                    attr: 'r',
                    value: 5,
                    relative: true,
                }
            ],
            buttonDown: ButtonMods.CCW90,
            buttonUp: ButtonMods.CCW90,
        },
        sound: {
            sound: 'bass',
        },
        elements: [
            {
                type: 'cw90Mod',
                positionRelative: {
                    x: 115,
                    y: 516
                },
                buttonType: ButtonMods.BUTTON_UP,

            },
            {
                type: 'goal',
                positionRelative: {
                    x: 210,
                    y: 460,
                },
                size: 4,
            },
            {
                type: 'goal',
                positionRelative: {
                    x: 910,
                    y: 75,
                },
                size: 4,
            },
            {
                type: 'cw90Mod',
                positionRelative: {
                    x: 1000,
                    y: 75,
                },
                buttonType: ButtonMods.BUTTON_DOWN,
            },
            {
                type: 'goal',
                positionRelative: {
                    x: 974,
                    y: 646,
                },
                size: 4,
            },
            {
                type: 'goal',
                positionRelative: {
                    x: 1033,
                    y: 612,
                },
                size: 2,
            },
            {
                type: 'goal',
                positionRelative: {
                    x: 836,
                    y: 599,
                },
                size: 6,
            },
        ]
    },
    /**
     * Level 7
     */
    {
        p: {
            positionRelative: {
                x: 0,
                y: 60,
            },
            angle: 0,
            attrs: [
                {
                    attr: 'r',
                    value: 5,
                    relative: true,
                }
            ],
            buttonDown: ButtonMods.CCW90,
            buttonUp: ButtonMods.CCW90,
        },
        sound: {
            sound: 'bellArp',
        },
        elements: [
            {
                type: 'cw90Mod',
                positionRelative: {
                    x: 115,
                    y: 60
                },
                buttonType: ButtonMods.BUTTON_UP,

            },
            {
                type: 'sizeMod',
                positionRelative: {
                    x: 150,
                    y: 60
                },
                modSize: 120,
                buttonType: ButtonMods.BUTTON_UP,

            },
            {
                type: 'goal',
                positionRelative: {
                    x: 210,
                    y: 460,
                },
                size: 4,
            },
            {
                type: 'goal',
                positionRelative: {
                    x: 310,
                    y: 556,
                },
                size: 3,
            },
            {
                type: 'cw90Mod',
                positionRelative: {
                    x: 169,
                    y: 578
                },
                buttonType: ButtonMods.BUTTON_UP,

            },
            {
                type: 'cw90Mod',
                positionRelative: {
                    x: 169,
                    y: 578
                },
                buttonType: ButtonMods.BUTTON_DOWN,

            },
            {
                type: 'cw90Mod',
                positionRelative: {
                    x: 175,
                    y: 481
                },
                buttonType: ButtonMods.BUTTON_UP,

            },
            {
                type: 'goal',
                positionRelative: {
                    x: 909,
                    y: 606
                },
                size: 7,

            },
            {
                type: 'goal',
                positionRelative: {
                    x: 1007,
                    y: 101
                },
                size: 5,

            },
        ]
    },
    /**
     * Thanks for playing!
     */
    {
        p: {
            positionRelative: {
                x: 0,
                y: 516,
            },
            angle: 0,
            attrs: [
                {
                    attr: 'r',
                    value: 1,
                    relative: true,
                }
            ],
            buttonDown: ButtonMods.NONE,
            buttonUp: ButtonMods.NONE,
        },
        sound: {
            sound: 'bass',
            endBellArp: true,
        },
        elements:
        [
            {
                type: 'text',
                positionRelative: {
                    x: 200,
                    y: 480,
                },
                text: 'P27',
                attrs: [
                    {
                        attr: 'font-size',
                        value: 72,
                        relative: true,
                    }
                ]
            },
            {
                type: 'text',
                positionRelative: {
                    x: 312,
                    y: 530,
                },
                text: 'by hi-scor.es',
                attrs: [
                    {
                        attr: 'font-size',
                        value: 25,
                        relative: true,
                    }
                ]
            },
            {
                type: 'text',
                positionRelative: {
                    x: 927,
                    y: 500,
                },
                text: 'Thanks',
                attrs: [
                    {
                        attr: 'font-size',
                        value: 30,
                        relative: true,
                    }
                ]
            },
            {
                type: 'text',
                positionRelative: {
                    x: 960,
                    y: 531,
                },
                text: 'for playing!',
                attrs: [
                    {
                        attr: 'font-size',
                        value: 30,
                        relative: true,
                    }
                ]
            },
        ]
    }
    ]
});