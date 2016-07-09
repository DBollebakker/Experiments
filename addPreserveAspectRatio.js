'use strict';

exports.type = 'full';

exports.active = false;

exports.description = 'adds preserveAspectRatio to an outer <svg> element';

var errorAttribute = 'Error in plugin "addPreserveAspectRatio": option for "aspectRatio" not correctly used';
var errorEmpty = 'Error in plugin "addPreserveAspectRatio": attribute "aspectRatio" has no value';

/**
 * Add classnames to an outer <svg> element. Example config:
 *
 * plugins:
 * - addPreserveAspectRatio:
 *     aspectRatio: 'xMidYMid meet'
 *
 * @author Dave Bollebakker
 */
exports.fn = function(data, params) {
    if (!(params.aspectRatio)) {
        console.error(errorAttribute);
        return data;
    } else if ((params.aspectRatio == "") || (params.aspectRatio == " ")) {
        console.error(errorEmpty);
        return data;
    }
    
    
    var aspectRatio = params.aspectRatio,
        svg = data.content[0];

        
    if (svg.isElem('svg')) {
        if (svg.hasAttr('preserveAspectRatio')) {
            svg.attr('preserveAspectRatio').value =
                svg.attr('preserveAspectRatio').value
                    .split(' ')
                    .concat(aspectRatio)
                    .join(' ');
        } else {
            svg.addAttr({
                name: 'preserveAspectRatio',
                value: aspectRatio.join(' '),
                prefix: '',
                local: 'preserveAspectRatio'
            });
        }
    }

    return data;

};