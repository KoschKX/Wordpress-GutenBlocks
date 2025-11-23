(function(blocks, element, editor) {
    var el = element.createElement;
    var RichText = editor.RichText;
    blocks.registerBlockType('mgb/countdown', {
        title: 'Countdown',
        icon: 'clock',
        category: 'widgets',
        attributes: {
            date: { type: 'string', default: '' },
            label: { type: 'string', default: '' },
            showDays: { type: 'boolean', default: true },
            showMinutes: { type: 'boolean', default: true },
            showSeconds: { type: 'boolean', default: true },
            fancy: { type: 'boolean', default: true },
        },
        edit: function(props) {
            // Split date/time for native pickers
            var dateVal = '';
            var timeVal = '';
            if (props.attributes.date) {
                var dt = props.attributes.date.split(' ');
                dateVal = dt[0] || '';
                timeVal = dt[1] || '';
            }
            return el('div', { className: 'mgb-countdown-block' },
                el('label', {}, 'Countdown Date'),
                el('input', {
                    type: 'date',
                    value: dateVal,
                    onChange: function(e) {
                        props.setAttributes({ date: e.target.value + (timeVal ? (' ' + timeVal) : '') });
                    },
                    style: { width: '100%' }
                }),
                el('label', { style: { marginTop: '8px', display: 'block' } }, 'Time (24h)'),
                el('input', {
                    type: 'time',
                    value: timeVal,
                    step: 1,
                    onChange: function(e) {
                        props.setAttributes({ date: (dateVal ? dateVal : '') + ' ' + e.target.value });
                    },
                    style: { width: '100%' }
                }),
                el('div', { style: { marginTop: '8px', marginBottom: '8px' } },
                    el('label', {}, [
                        el('input', {
                            type: 'checkbox',
                            checked: !!props.attributes.showDays,
                            onChange: function(e) { props.setAttributes({ showDays: e.target.checked }); }
                        }),
                        ' Days '
                    ]),
                    el('label', {}, [
                        el('input', {
                            type: 'checkbox',
                            checked: !!props.attributes.showHours,
                            onChange: function(e) { props.setAttributes({ showHours: e.target.checked }); }
                        }),
                        ' Hours '
                    ]),
                    el('label', {}, [
                        el('input', {
                            type: 'checkbox',
                            checked: !!props.attributes.showMinutes,
                            onChange: function(e) { props.setAttributes({ showMinutes: e.target.checked }); }
                        }),
                        ' Minutes '
                    ]),
                    el('label', {}, [
                        el('input', {
                            type: 'checkbox',
                            checked: !!props.attributes.showSeconds,
                            onChange: function(e) { props.setAttributes({ showSeconds: e.target.checked }); }
                        }),
                        ' Seconds '
                    ])
                ),
                el('label', { style: { marginTop: '8px', display: 'block' } }, 'Countdown Style'),
                el('select', {
                    value: props.attributes.fancy ? 'fancy' : 'plain',
                    onChange: function(e) {
                        props.setAttributes({ fancy: e.target.value === 'fancy' });
                    }
                },
                    el('option', { value: 'fancy' }, 'Fancy Boxes'),
                    el('option', { value: 'plain' }, 'Plain Text')
                ),
                el('label', { style: { marginTop: '8px', display: 'block' } }, 'Label (optional)'),
                el(RichText, {
                    tagName: 'div',
                    value: props.attributes.label,
                    onChange: function(val) { props.setAttributes({ label: val }); },
                    placeholder: 'Countdown label...'
                })
            );
        },
        save: function() { return null; } // Rendered in PHP
    });
})(window.wp.blocks, window.wp.element, window.wp.editor);
