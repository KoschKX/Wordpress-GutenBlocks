(function (blocks, element, editor, components) {
    var el = element.createElement;
    var RichText = editor.RichText;
    var InspectorControls = editor.InspectorControls;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var RangeControl = components.RangeControl;

    blocks.registerBlockType('mgb/marquee', {
        title: 'Marquee',
        icon: 'editor-alignleft',
        category: 'widgets',
        attributes: {
            text: {
                type: 'string',
                default: 'Scrolling text...'
            },
            speed: {
                type: 'number',
                default: 50
            }
        },
        edit: function (props) {
            var attributes = props.attributes;
            return [
                el(InspectorControls, {},
                    el(PanelBody, { title: 'Settings' },
                        el(TextControl, {
                            label: 'Text',
                            value: attributes.text,
                            onChange: function (val) {
                                props.setAttributes({ text: val });
                            }
                        }),
                        el(RangeControl, {
                            label: 'Speed',
                            value: attributes.speed,
                            min: 10,
                            max: 200,
                            onChange: function (val) {
                                props.setAttributes({ speed: val });
                            }
                        })
                    )
                ),
                el('div', { className: 'mgb-marquee-wrapper', style: { overflow: 'hidden', border: '1px solid #ccc', padding: '4px' } },
                    el('div', {
                        className: 'mgb-marquee-text',
                        style: { whiteSpace: 'nowrap', display: 'inline-block', animation: 'none' }
                    }, attributes.text)
                )
            ];
        },
        save: function () {
            return null; // Rendered in PHP
        }
    });
})(window.wp.blocks, window.wp.element, window.wp.editor, window.wp.components);
