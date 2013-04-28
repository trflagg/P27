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
                type: 'sizeMod',
                positionRelative: {
                    x: 600,
                    y: 516,
                },
                modSize: 20,
                onPickup: function(scene) {
                    scene.P().sprite.animate({'fill': '#fff'}, 500);
                    scene.background.animate({'fill': '#000'}, 500);
                },
            },
        ]
    }
    ]
});