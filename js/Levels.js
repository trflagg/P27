define(function() {
    return [
    /**
     * Level 1
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
                    y: 505,
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
                modSize: 30,
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
                    x: 906,
                    y: 480,
                },
                size: 4,
                onPickup: function(scene) {
                    scene.P().sprite.animate({'fill': '#fff'}, 500);
                    scene.background.animate({'fill': '#000'}, 500);
                },
            },
        ]
    }
    ]
});