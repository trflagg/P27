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
            ]
        },
        elements: [
            {
                type: 'goal',
                positionRelative: {
                    x: 220,
                    y: 216,
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
                    x: 220,
                    y: 420,
                },
                size: 4,
                onPickup: function(scene) {
                    scene.P().sprite.animate({'fill': '#fff'}, 500);
                    scene.background.animate({'fill': '#000'}, 500);
                }
            },

        ]
    }
    ]
});